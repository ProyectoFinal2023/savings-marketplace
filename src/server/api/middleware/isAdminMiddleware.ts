import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "../trpc";


export const isAdminMiddleware = middleware(async ({ ctx, next }) => {
  const user = await ctx.prisma.user.findFirstOrThrow({
    where: { clerkId: ctx.auth.userId },
    include: { userType: true },
  });

  if (user.userType.description !== "Admin") {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx,
  });
});

export const adminProcedure = publicProcedure.use(isAdminMiddleware);
