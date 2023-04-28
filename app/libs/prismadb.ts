import { PrismaClient } from "@prisma/client";

// best practice to use with Next13 asign prisma client to a globalThis variable which is not affected by HMR

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV != "production") globalThis.prisma = client

export default client