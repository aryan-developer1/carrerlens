import { PrismaClient } from "./generated/prisma/client"

// globalThis ka use karenge taaki production me multiple instances na bane
const globalForPrisma = globalThis

const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

export default db
