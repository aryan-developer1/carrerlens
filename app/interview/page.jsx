
import { checkIfUserIsOnboarded } from "@/actions/user";
import MockInterview from "./components/MockInterview"
import { redirect } from "next/navigation";

const page = async () => {
   const isUserOnboarded = await checkIfUserIsOnboarded();
    if (!isUserOnboarded) {
      
      return redirect("/onboarding");
    }
  return (
    <div>
      <MockInterview/>
    </div>
  )
}

export default page
