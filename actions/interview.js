"use server";

import { GoogleGenAI } from "@google/genai";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
export const createMockInterview = async () => {
  try {
    const { userId } = await auth();
    // find user in db
    const user = await db.user.findUnique({
      where: {
        clerkId: userId, // match clerkId
      },
      include: {
        assessments: true, // 👈 fetch related assessments also
      },
    });

    if (!user) {
      return { success: false, message: "user not found!" };
    }

    const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
      user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
    }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("response aa gaya bhai", response.text);

    const cleanedResponse = response.text
      .replace(/```(?:json)?\n?/g, "")
      .trim();
    const parsedResponse = JSON.parse(cleanedResponse);

    return {
      success: true,
      message: "user interview prepared successfully",
      parsedResponse,
    };
  } catch (error) {
    console.error("Error fetching industry insights:", error);
    return { success: false, error: error.message };
  }
};

export const saveAssessmentResults = async (resultsData) => {
  try {
    const { userId } = await auth();

    console.log("userId",userId)
    
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

    const assessment = await db.assessments.create({
      data: {
        userId: user.id,
        quizScore: resultsData.quizScore,
        questions: resultsData.questions,
        category: user.industry,
      },
    });

    return {
      success: true,
      message: "Assessment results saved successfully",
      assessmentId: assessment.id,
    };
  } catch (error) {
    console.error("Error saving assessment results:", error);
    return { success: false, error: error.message };
  }
};
