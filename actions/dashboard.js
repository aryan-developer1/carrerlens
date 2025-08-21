"use server";

import { GoogleGenAI } from "@google/genai";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/prisma";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function getIndustryInsights() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    // 1. Get the user along with their industry relation
    const existingUser = await db.user.findUnique({
      where: { clerkId: userId },
      include: { industry: true }, // get IndustryInsights object
    });

    if (!existingUser || !existingUser.industryId) {
      return { success: false, error: "User or industry not found" };
    }

    const industryId = existingUser.industryId;
    const industry = existingUser.industry;

    // 2. If insights already exist → return them
    if (industry.growthRate > 0) {
      return industry;
    }

    // 3. Otherwise generate fresh insights
    const prompt = `
      Analyze the current state of the ${industry.industry} industry and provide insights in ONLY the following JSON format:
      {
        "salaryRanges": [
          { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
        ],
        "growthRate": number,
        "demandLevel": "High" | "Medium" | "Low",
        "topSkills": ["skill1", "skill2"],
        "marketOutlook": "Positive" | "Neutral" | "Negative",
        "keyTrends": ["trend1", "trend2"],
        "recommendedSkills": ["skill1", "skill2"]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const cleanedResponse = response.text.replace(/```(?:json)?\n?/g, "").trim();
    const parsedResponse = JSON.parse(cleanedResponse);

    // 4. Update industry insights in DB
    const updatedIndustry = await db.industryInsights.update({
      where: { id: industryId },
      data: {
        growthRate: parsedResponse.growthRate,
        demandLevel: parsedResponse.demandLevel.toUpperCase(),
        marketOutlook: parsedResponse.marketOutlook.toUpperCase(),
        topSkills: parsedResponse.topSkills,
        recommendedSkills: parsedResponse.recommendedSkills,
        keyTrends: parsedResponse.keyTrends,
        salaryRanges: parsedResponse.salaryRanges,
      },
    });

    return updatedIndustry;
  } catch (error) {
    console.error("Error fetching industry insights:", error);
    return { success: false, error: error.message };
  }
}
