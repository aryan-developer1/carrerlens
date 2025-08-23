import Resume from "./component/Resume"
import { checkIfUserIsOnboarded } from "@/actions/user";
import { redirect } from "next/navigation";


const page = async () => {
     const isUserOnboarded = await checkIfUserIsOnboarded();
    if (!isUserOnboarded) {
      
      return redirect("/onboarding");
    }
  return (
    <div>
     <Resume/>
    </div>
  )
}

export default page

