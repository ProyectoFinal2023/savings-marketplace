/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { appRouter } from "../root";
import { type SignedInAuthObject } from "@clerk/nextjs/dist/types/server";

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, auth: null as unknown as SignedInAuthObject },
    transformer: superjson,
  });
