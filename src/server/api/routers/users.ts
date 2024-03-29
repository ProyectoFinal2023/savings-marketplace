import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { registerSchema } from "~/schemas/registerSchema";

export const usersRouter = createTRPCRouter({
  getByClerkId: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { clerkId } = input;
      return ctx.prisma.user.findFirst({
        where: { clerkId },
        include: {
          address: true,
          guarantors: { include: { address: true } },
          userType: true,
        },
      });
    }),
  upsertUser: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { address, carAsPayment, guarantors, id, ...user } = input;

      return await ctx.prisma.$transaction(
        async () => {
          const res = await ctx.prisma.user.upsert({
            create: {
              ...user,
              userType: {
                connectOrCreate: {
                  create: { description: "Física" },
                  where: { description: "Física" },
                },
              },
            },
            update: {
              ...user,
            },
            where: {
              id: id ? id : "",
            },
          });
          await Promise.all([
            ctx.prisma.address.upsert({
              update: {
                ...address,
                users: {
                  connect: {
                    id: res.id,
                  },
                },
              },
              create: {
                ...address,
                users: {
                  connect: {
                    id: res.id,
                  },
                },
              },
              where: {
                id: address.id || "",
              },
            }),
            ...guarantors.map(({ address: _, ...g }) =>
              ctx.prisma.guarantor.upsert({
                create: { ...g, userId: res.id },
                update: { ...g, userId: res.id },
                where: { id: g.id ? g.id : 0 },
              })
            ),
          ]);
        },
        { maxWait: 20000 }
      );
    }),
});
