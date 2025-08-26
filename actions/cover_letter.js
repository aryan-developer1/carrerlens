"use server";

import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function getImprovedCoverLetter(
  companyName,
  jobTitle,
  jobDescription
) {
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
As an expert resume and cover letter writer, write a tailored cover letter for a ${user.industry} professional applying to the role of "${jobTitle}" at "${companyName}". 

Use the following details:
-Company name: ${companyName}
- Job title: ${jobTitle}
-user name: ${user.name}
- Candidate background: ${user.skillsAndExperience}
- Job description: ${jobDescription}

Requirements:
1. Use strong action verbs.
2. Quantify achievements with metrics/results where possible.
3. Highlight relevant technical skills and industry expertise.
4. Keep it concise (3 short paragraphs: introduction, key achievements, closing).
5. Use industry-specific keywords.
6. Maintain a professional but enthusiastic tone.
7. End with a clear call-to-action (e.g., looking forward to discussing further).

Format the response as a properly structured cover letter without extra commentary.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const cleanedResponse = response.text;

    console.log("response of ai", cleanedResponse);

    return {
      success: true,
      message: "Resume improved successfully",
      cleanedResponse,
    };
  } catch (error) {
    console.error("Error fetching industry insights:", error);
    return { success: false, error: error.message };
  }
}

export async function saveCoverLetter(coverLetterData) {
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

    const savedCoverLetter = await db.coverLetter.create({
      data: {
        userId: user.id,
        content: coverLetterData.content,
        jobDescription: coverLetterData.jobDescription,
        companyName: coverLetterData.companyName,
        jobTitle: coverLetterData.jobTitle,
      },
    });

    return {
      success: true,
      message: "Cover letter saved successfully",
      coverLetter: savedCoverLetter,
    };
  } catch (error) {
    console.error("Error saving cover letter:", error);
    return { success: false, error: error.message };
  }
}

export async function getAllCoverLetters() {
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

    const coverLetters = await db.coverLetter.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      coverLetters,
    };
  } catch (error) {
    console.error("Error fetching cover letters:", error);
    return { success: false, error: error.message };
  }
}
