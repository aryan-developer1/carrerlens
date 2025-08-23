"use server"

import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export const saveResume = async (resumeData) => {
  
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }
    
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const existingResume = await db.resume.findUnique({
      where: { userId: user.id },
    });
    
    if (existingResume) {
     await db.resume.update({
      where: { id: existingResume.id },
      data: {
        content: JSON.stringify(resumeData),
      },
    });
    return {
      success: true,
      message: "Resume updated successfully",
      resumeId: existingResume.id,
    };
    }
    
    const resume = await db.resume.create({
      data: {
        userId: user.id,
       content: JSON.stringify(resumeData),
      },
    });
    
    return {
      success: true,
      message: "Resume saved successfully",
      resumeId: resume.id,
    };
  } catch (error) {
    console.error("Error saving resume:", error);
    throw error;
  }
};

export const fetchResume = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const resume = await db.resume.findUnique({
      where: { userId: user.id },
    });

    // Agar resume hi nahi mila
    if (!resume) {
      return {
        success: true,
        message: "No resume found",
        resume: null, // ya {} default
      };
    }

    // Content parse karna
    const parsedResumeInJson = JSON.parse(resume.content || "{}");

    return {
      success: true,
      message: "Resume fetched successfully",
      resume: parsedResumeInJson,
    };
  } catch (error) {
    console.error("Error fetching resume:", error);
    return {
      success: false,
      message: "Something went wrong",
      error: error.message,
    };
  }
};

export async function getImprovedProfessionalSummary (type,current) {
  try {

    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // 3. Otherwise generate fresh insights
    const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
      
    const cleanedResponse  = response.text

    console.log("response of ai",cleanedResponse)
    
    return {success:true,message:"Resume improved successfully",cleanedResponse};
  } catch (error) {
    console.error("Error fetching industry insights:", error);
    return { success: false, error: error.message };
  }
}

