import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.user.findFirst({ where: { id } });
    }),

  createUser: publicProcedure

    .input(
      z.object({
        data: z.object({
          birthday: z.string(),
          created_at: z.number(),
          email_addresses: z.array(
            z.object({
              email_address: z.string(),
              id: z.string(),
              // linked_to: [],
              object: z.string(),
              verification: z.object({
                status: z.string(),
                strategy: z.string(),
              }),
            })
          ),
          // external_accounts: [],
          external_id: z.string(),
          first_name: z.string(),
          gender: z.string(),
          id: z.string(),
          image_url: z.string(),
          last_name: z.string(),
          last_sign_in_at: z.number(),
          object: z.string(),
          password_enabled: z.boolean(),
          // phone_numbers: [],
          primary_email_address_id: z.string(),
          // primary_phone_number_id: null,
          // primary_web3_wallet_id: null,
          // private_metadata: {},
          profile_image_url: z.string(),
          // public_metadata: {},
          // two_factor_enabled: false,
          // unsafe_metadata: {},
          updated_at: z.number(),
          // username: null,
          // web3_wallets: [],
        }),
        object: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("coso", input);
      return input;
    }),
});
