import { z } from "zod";

export const createPlanSchema = z.object({
  title: z.string().min(1, "El titulo no puede estar vacio"),
  carModel: z.string().min(1, "Seleccionar modelo"),
  photos: z.string().array(),
  priceARS: z.string().min(1, "Indicar precio"),
  priceUSD: z.string().min(1, "Indicar precio en USD"),
  plan_months: z.string().min(1, "Indicar meses pagados"),
  plan_total_months: z.string().min(1, "Indicar meses totales"),
  moving_value: z.string().min(1, "Indicar cuota mensual"),
  description: z.string().min(1, "Ingresa una breve descripcion"),
  paymentMethod: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  // sellerId: z.string(),
});
