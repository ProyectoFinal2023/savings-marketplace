import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";

// "https://getdebtbcratest.free.beeceptor.com/get_debt/20112997505";

const WarehouseValidator = z.object({
  data:	z.any(),
  contactar:	z.string(),
  estado:	z.string(),
  riesgo:	z.string(),
  CUIT:	z.number(),
  cuotas_impagas:	z.number(),
  dev:	z.number(),
});

export type Warehouse = z.infer<typeof WarehouseValidator>;

const responseValidator = z.array(WarehouseValidator);

export const adminRouter = createTRPCRouter({
  getByCuit: publicProcedure
    .input(z.object({ cuit: z.number() }))
    .query(async ({ input: { cuit } }) => {
      const response = await fetch(`${env.WAREHOUSE_URL}/get_debt/${cuit}`);
      // perhaps some error handling
      if (!response.ok) {
        throw new TRPCError({ message: "Warehouse is down!", code: "INTERNAL_SERVER_ERROR" });
      }

      // should prob validate the shape with Zod
      // const validated = responseValidator.parse(response.json());
      const validated = response.json();
      return validated;
    }),
});
