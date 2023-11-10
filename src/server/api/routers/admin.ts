import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";


// "https://getdebtbcratest.free.beeceptor.com/get_debt/20112997505";

const CustomerValidator = z.object({
  data: z.array(
    z.object({
      entidad: z.string(),
      periodo: z.string(),
      situacion: z.string(),
      monto: z.number(),
      dias_atraso: z.number(),
    })
  ),
  nombre: z.string(),
  cuit: z.string(),
  contactar: z.string(),
  estado: z.string(),
  riesgo: z.string(),
  cuotas_impagas: z.number().nullish(),
  usuario_registrado: z.number(),
  mail: z.string().nullish(),
  telefono: z.string().nullish(),
});

export type DebtDetail = {
  entidad: string;
  periodo: string;
  situacion: string;
  monto: string;
  dias_atraso: string;
};

export const adminRouter = createTRPCRouter({
  getByCuit: publicProcedure
    .use(isAdminMiddleware)
    .input(z.object({ cuit: z.string() }))
    .query(async ({ input: { cuit } }) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const response = await fetch(`${env.WAREHOUSE_URL}/get_debt/${cuit}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const body = await response.json();
      // perhaps some error handling
      if (!response.ok) {
        throw new TRPCError({
          message: "Warehouse is down!",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      console.log(body);
      // should prob validate the shape with Zod
      const validated = CustomerValidator.parse(body);
      return {
        ...validated,
        hasDebt: !!validated.data.length,
      };
    }),
  getPaymentMethods: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.paymentMethod.findMany();
  }),
});
