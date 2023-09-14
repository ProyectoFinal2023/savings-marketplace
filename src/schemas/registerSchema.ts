import { z } from "zod";

const addressSchema = z.object({
  id: z.string().optional(),
  street: z.string().min(1, "La calle no puede estar vacia"),
  streetNumber: z.number(),
  province: z.string().min(1, "La provincia no puede estar vacia"),
  city: z.string().min(1, "La ciudad no puede estar vacia"),
  district: z.string().min(1, "La localidad no puede estar vacia"),
  postalCode: z
    .number({ required_error: "El codigo postal no puede estar vacio" })
    .min(1, "El codigo postal no puede ser menor a 1"),
  additionalData: z.string().optional(),
});

export const registerSchema = z.object({
  id: z.string().optional(),
  clerkId: z.string(),
  name: z.string().min(1, "El nombre no puede estar vacio"),
  surname: z.string().min(1, "El apellido no puede estar vacio"),
  cuit: z.string().length(11, "El CUIT debe tener 11 dígitos"),
  phone: z.string().min(1, "El telefono no puede estar vacio"),
  email: z.string().email("El mail no es valido"),
  address: addressSchema,
  guarantors: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().min(1, "El nombre no puede estar vacio"),
      surname: z.string().min(1, "El apellido no puede estar vacio"),
      cuit: z.string().length(11, "El CUIT debe tener 11 dígitos"),
      phone: z.string().min(1, "El telefono no puede estar vacio"),
      email: z.string().email("El mail no es valido"),
      address: addressSchema,
    })
  ),
  carAsPayment: z.object({}),
});

export type RegisterSchemaT = z.infer<typeof registerSchema>;
