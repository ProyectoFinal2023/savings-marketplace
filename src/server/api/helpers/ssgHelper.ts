/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { appRouter } from "../root";
import { getAuth } from "@clerk/nextjs/server";
import type { RequestLike } from "@clerk/nextjs/dist/types/server/types";

export const generateSSGHelper = (request: RequestLike) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, auth: getAuth(request) },
    transformer: superjson,
  });
