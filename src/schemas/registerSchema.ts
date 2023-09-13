import { z } from "zod";

export const registerSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
  phone: z.string(),
  email: z.string().email(),
  guarantors: z.array(
    z.object({
      name: z.string(),
      surname: z.string(),
      dni: z.string(),
      phone: z.string(),
      email: z.string().email(),
    })
  ),
  carAsPayment: z.object({}),
});

export type RegisterSchemaT = z.infer<typeof registerSchema>;
