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
    if (existingUser.industryId) {
      console.log("User is already onboarded");
      return true;
    }

    return false;
  };

  export const updateUser = async (data) => {
    const { userId } = await auth();
  
    if (!userId) {
      redirect("/sign-in");
    }
  
    const existingUser = await db.user.findUnique({
      where: { clerkId: userId },
    });
  
    if (!existingUser) {
      return { success: false, error: "User not found" };
    }
  
    // Agar user already onboarded hai → dashboard bhej do
    if (existingUser.industryId) {
      return redirect("/dashboard");
    }
  
    try {
      // 1. Check if industry exists in IndustryInsights table
      const industryKey = `${data.industry}-${data.specialization}`;
  
      let industry = await db.industryInsights.findUnique({
        where: { industry: industryKey },
      });
  
      // 2. Agar industry nahi mili → create karo
      if (!industry) {
        industry = await db.industryInsights.create({
          data: {
            industry: industryKey,
            salaryRanges: [],
            growthRate: 0,
            demandLevel: "MEDIUM",
            topSkills: [],
            marketOutlook: "NEUTRAL",
            keyTrends: [],
            recommendedSkills: [],
          },
        });
      }
  
      // 3. Ab user ko update karo with industryId
      const updatedUser = await db.user.update({
        where: { clerkId: userId },
        data: {
          industryId: industry.id, // Relation ke through connect kar rahe
          bio: data.bio,
          experience: data.experience,
          skills: data.skills,
        },
      });
  
      // 4. Insights generate karna ho to helper call karo
      await getIndustryInsights(industry.id);
  
      return { success: true, data: updatedUser };
    } catch (error) {
      console.error("Error updating user:", error);
      return { success: false, error: error.message };
    }
  };
  
