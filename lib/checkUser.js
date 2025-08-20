import db from "./prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function checkUser(){
   
     const user = await currentUser();

     console.log("userObject",user)

     if(!user){
        return null;
     }

     const existingUser = await db.user.findUnique({
        where: {
            clerkId: user.id,
        },
     });

     console.log("existingUser",existingUser)

     if(existingUser){
        return existingUser;
     }

     const newUser = await db.user.create({
        data: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: user.firstName,
        },
     });

     console.log("newUser",newUser)

     return newUser;

}