import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LayoutDashboard,
  Pen,
  Sparkles,
} from "lucide-react";
import checkUser from "@/lib/checkUser";


const Header = () => {

  const user = checkUser();
  console.log("user",user)
  return (
    <header className="flex justify-between items-center px-6 h-20 border-b border-gray-800 bg-black/30">
      {/* Logo Left */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/careerlens.png"
          alt="CareerLens"
          width={120}
          height={40}
          className="object-contain"
        />
      </Link>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Industry Insights */}
        <Link href="/dashboard">
          <Button className="bg-white text-black font-medium hover:bg-gray-200">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Industry Insights
          </Button>
        </Link>

        {/* Growth Tools Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Growth Tools
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[220px] bg-black text-white border border-gray-700"
          >
            <DropdownMenuLabel className="px-2 py-1 text-gray-400">
              Tools
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/interview" className="flex items-center gap-2">
                <Pen className="h-4 w-4" />
                Mock Interview
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <Link href="/resume" className="flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                AI Resume Builder--working
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/cover-letter" className="flex items-center gap-2">
                <MailOpen className="h-4 w-4" />
                AI Cover Letter--working
              </Link>
            </DropdownMenuItem> */}
           
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Auth Buttons */}
        <SignedOut>
        <Button variant="outline" ><Link href="/sign-in">Sign In</Link></Button>
        <Button ><Link href="/sign-up">Sign Up</Link></Button>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
