import {  getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./component/DashboardView";
import { checkIfUserIsOnboarded } from "@/actions/user";
import { redirect } from "next/navigation";
const page = async () => {
        const isUserOnboarded = await checkIfUserIsOnboarded();
  if (!isUserOnboarded) {
    return redirect("/onboarding");
  }
  const insights = await getIndustryInsights();
  console.log("debug insights",insights)
    

  return (
    <div>
      
      <DashboardView insights={insights} />
    </div>
  )
}

export default page
