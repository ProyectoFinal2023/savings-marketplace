import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

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
          carModel: {
            include: {
              carPhotos: true,
            },
          },
          status: {
            select: {
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
});
