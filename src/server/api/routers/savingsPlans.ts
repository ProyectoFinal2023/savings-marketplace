import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const savingsPlansRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.savingsPlan.findMany({
      include: {
        carModel: {
          include: {
            carPhotos: true,
          },
        },
      },
    });
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.savingsPlan.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          seller: true,
          usersInPlan: true,
          carModel: {
            include: {
              carPhotos: true,
            },
          },
          status: {
            select: {
              name: true,
              description: true,
            },
          },
          paymentMethod: {
            select: {
              description: true,
            },
          },
        },
      });
    }),
  getSavingsPlans: publicProcedure
    .input(
      z.object({
        search: z.object({
          title: z.string().optional(),
          size: z.number().min(1).max(50).optional().default(48),
          page: z.number().optional().default(1),
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      const where = {
        title: {
          contains: input.search.title /* Optional filter */,
        },
      };
      const [plans, total] = await ctx.prisma.$transaction([
        ctx.prisma.savingsPlan.findMany({
          take: input.search.size,
          skip: (input.search.page - 1) * input.search.size,
          where,
          include: {
            carModel: {
              include: {
                carPhotos: {
                  select: { id: true, url: true },
                  take: 1,
                },
              },
            },
          },
          orderBy: {
            id: "asc",
          },
        }),
        ctx.prisma.savingsPlan.count({ where }),
      ]);

      return { plans, total, size: input.search.size };
    }),
  pendingSavingsPlan: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input: { id } }) => {
      const user = await ctx.prisma.user.findFirstOrThrow({
        where: { clerkId: ctx.auth.userId },
      });
      return ctx.prisma.$transaction(async () => {
        await ctx.prisma.savingsPlan.update({
          where: {
            id,
          },
          data: {
            statusId: (await ctx.prisma.savingsPlanStatus.findFirstOrThrow({ where: { name: "pendiente" } })).id
          },
        });

        await ctx.prisma.userInSavingsPlan.create({
          data: {
            planId: id,
            userId: user.id,
          },
        });
      })
    })
});
