import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";

// "https://getdebtbcratest.free.beeceptor.com/get_debt/20112997505";

const CustomerValidator = z.object({
  data: z.array(
    z.object({
      "Denominacion del deudor": z.string(),
      Entidad: z.string(),
      Periodo: z.string(),
      Situacion: z.string(),
      Monto: z.string(),
      "Dias de atraso": z.string(),
      Observaciones: z.string(),
    })
  ),
  contactar: z.string(),
  estado: z.string(),
  riesgo: z.string(),
  CUIT: z.number(),
  cuotas_impagas: z.number().nullish(),
  dev: z.number(),
});

export type DebtDetail = {
  "Denominacion del deudor": string;
  Entidad: string;
  Periodo: string;
  Situacion: string;
  Monto: string;
  "Dias de atraso": string;
  Observaciones: string;
};

export type Customer = Omit<z.infer<typeof CustomerValidator>, "data"> &
  {
    hasDebt: boolean;
    data: DebtDetail;
  }[];

export const adminRouter = createTRPCRouter({
  getByCuit: publicProcedure
    .input(z.object({ cuit: z.string() }))
    .query(async ({ input: { cuit } }) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const response = await fetch(`${env.WAREHOUSE_URL}/get_debt/${cuit}`);
      // perhaps some error handling
      if (!response.ok) {
        throw new TRPCError({
          message: "Warehouse is down!",
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      // should prob validate the shape with Zod
      const validated = CustomerValidator.parse(await response.json());
      return validated.dev
        ? {
            ...validated,
            hasDebt: true,
          }
        : { ...validated, data: [], hasDebt: false, cuotas_impagas: 0 };
    }),
});
