import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";

// "https://getdebtbcratest.free.beeceptor.com/get_debt/20112997505";

const CustomerValidator = z.object({
  data: z.string(),
  contactar: z.string(),
  estado: z.string(),
  riesgo: z.string(),
  CUIT: z.number(),
  cuotas_impagas: z.number(),
  dev: z.number(),
});

export type DebtDetail = {
  'Denominacion del deudor': string,
  Entidad: string,
  Periodo: string,
  Situacion: string,
  Monto: string,
  'Dias de atraso': string,
  Observaciones: string,
}

export type Customer = Omit<z.infer<typeof CustomerValidator>, 'data'> & {
  hasDebt: boolean,
  data: DebtDetail
}[];

export const adminRouter = createTRPCRouter({
  getByCuit: publicProcedure
    .input(z.object({ cuit: z.string() }))
    .query(async ({ input: { cuit } }) => {
      const response = await fetch(`${env.WAREHOUSE_URL}/get_debt/${cuit}`);
      // perhaps some error handling
      if (!response.ok) {
        throw new TRPCError({ message: "Warehouse is down!", code: "INTERNAL_SERVER_ERROR" });
      }

      // should prob validate the shape with Zod
      const validated = CustomerValidator.parse(await response.json());
      return validated.dev ? { ...validated, data: (JSON.parse(validated.data) as Array<DebtDetail>), hasDebt: true } : { ...validated, data: [], hasDebt: false, cuotas_impagas: 0 };
    }),
});
