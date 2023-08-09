import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const carModelsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.carModel.findMany();
  }),
});
