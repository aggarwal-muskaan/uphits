import { PrismaClient } from "@prisma/client";

export default new PrismaClient();

/*  instantiate a single instance of PrismaClient 
    & using the same throughout the project, 
        preventing instantiating extra PrismaClient instances */
