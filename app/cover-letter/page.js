import CoverLetterForm from "./components/CoverLetterForm"
import { checkIfUserIsOnboarded } from "@/actions/user"
import { redirect } from "next/navigation"

const page = async () => {
 const isUserOnboarded = await checkIfUserIsOnboarded();
    if (!isUserOnboarded) {
      
      return redirect("/onboarding");
    }

  return (
    <div className="p-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-tight max-w-4xl">
          Cover Letter Builder
        </h1>
      <CoverLetterForm/>
    </div>
  )
}

export default page
