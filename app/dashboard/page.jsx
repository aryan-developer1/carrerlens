import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./component/DashboardView";
const page = async () => {

  const insights = await getIndustryInsights();
    

  return (
    <div>
      
      <DashboardView insights={insights} />
    </div>
  )
}

export default page
