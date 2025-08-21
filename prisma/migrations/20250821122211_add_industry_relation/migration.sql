/*
  Warnings:

  - You are about to drop the column `industry` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_industry_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "industry",
ADD COLUMN     "industryId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "public"."IndustryInsights"("id") ON DELETE SET NULL ON UPDATE CASCADE;
