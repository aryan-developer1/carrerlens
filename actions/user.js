"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/prisma";
import { getIndustryInsights } from "./dashboard";

export const checkIfUserIsOnboarded = async () => {
  const { userId } = await auth(); // Clerk userId nikal liya

  console.log("debugging", userId);

  if (!userId) {
    redirect("/sign-in"); // Agar user logged in nahi hai
  }

  const existingUser = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!existingUser) {
    return { success: false, error: "User not found" };
  }

  //if user is already onboarde redirect him to dashboard
  if (existingUser.industry) {
    console.log("User is already onboarded");
    return true;
  }

  return false;
};

export const updateUser = async (data) => {
  const { userId } = await auth(); // Clerk userId nikal liya

  console.log("debugging", userId, data);

  if (!userId) {
    redirect("/sign-in"); // Agar user logged in nahi hai
  }

  const existingUser = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!existingUser) {
    return { success: false, error: "User not found" };
  }

  //if user is already onboarde redirect him to dashboard
  if (existingUser.industry) {
    console.log("User is already onboarded");
    return redirect("/dashboard");
  }
  try {
    //now check if industry insights exists for this user
    const industryInsights = await db.industryInsights.findUnique({
      where: {
        industry: `${data.industry}-${data.specialization}`,
      },
    });

    //if not than create industry insights
    if (!industryInsights) {
      const industryInsights = await db.industryInsights.create({
        data: {
          industry: `${data.industry}-${data.specialization}`,
          growthRate: 0,
          demandLevel: "MEDIUM",
          marketOutlook: "NEUTRAL",
          topSkills: [],
          recommendedSkills: [],
          keyTrends: [],
          salaryRanges: [],
          users: {
            connect: {
              clerkId: userId,
            },
          },
        },
      });
    }

    // Ab user ko update karna hai
    const updatedUser = await db.user.update({
      where: { clerkId: userId },
      data: {
        industry: `${data.industry}-${data.specialization}`,
        bio: data.bio,
        experience: data.experience,
        skills: data.skills,
      },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: error.message };
  }
};
