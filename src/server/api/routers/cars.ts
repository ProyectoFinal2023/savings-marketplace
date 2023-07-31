import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const carsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.car.findMany();
  }),
});
