"use server";

import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/prisma";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);


export async function getIndustryInsights() {

  try {
  const { userId } = await auth();
  
  if (!userId) {
    return { success: false, error: "User not found" };
  }
  
  const existingUser = await db.user.findUnique({
    where: { clerkId: userId },
  });

  if (!existingUser) {
    return { success: false, error: "User not found" };
  }
  
  const prompt = `
            Analyze the current state of the ${existingUser.industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
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
            
            IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
            Include at least 5 common roles for salary ranges.
            Growth rate should be a percentage.
            Include at least 5 skills and trends.
          `;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log("response aa gaya bhai", response.text);

  const cleanedResponse = response.text.replace(/```(?:json)?\n?/g, "").trim();
  const parsedResponse = JSON.parse(cleanedResponse)

  //now store this data in db
    const industryInsights = await db.industryInsights.update({
      where: {
        industry: `${existingUser.industry}`,
      },
      data: {
        industry: `${existingUser.industry}`,
        growthRate: parsedResponse.growthRate,
        demandLevel: parsedResponse.demandLevel.toUpperCase(),
        marketOutlook: parsedResponse.marketOutlook.toUpperCase(),
        topSkills: parsedResponse.topSkills,
        recommendedSkills: parsedResponse.recommendedSkills,
        keyTrends: parsedResponse.keyTrends,
        salaryRanges: parsedResponse.salaryRanges,
      },
    });

  return industryInsights ;
} catch (error) {
  console.error("Error fetching industry insights:", error);
  return { success: false, error: error.message };
}
}
