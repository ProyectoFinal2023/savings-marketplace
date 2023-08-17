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
});
