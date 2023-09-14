import { z } from "zod";

const addressSchema = z.object({
  street: z.string(),
  streetNumber: z.number(),
  province: z.string(),
  city: z.string(),
  district: z.string(),
  postalCode: z.number(),
  additionalData: z.string().optional(),
});

export const registerSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
  phone: z.string(),
  email: z.string().email(),
  address: addressSchema.optional(),
  guarantors: z.array(
    z.object({
      name: z.string(),
      surname: z.string(),
      dni: z.string(),
      phone: z.string(),
      email: z.string().email(),
      address: addressSchema.optional(),
    })
  ),
  carAsPayment: z.object({}),
});

export type RegisterSchemaT = z.infer<typeof registerSchema>;
