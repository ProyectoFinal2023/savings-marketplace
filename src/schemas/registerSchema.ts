import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1, "La calle no puede estar vacia"),
  streetNumber: z.number().optional(),
  province: z.string().min(1, "La provincia no puede estar vacia"),
  city: z.string().min(1, "La ciudad no puede estar vacia"),
  district: z.string().min(1, "La localidad no puede estar vacia"),
  postalCode: z
    .number({ required_error: "El codigo postal no puede estar vacio" })
    .min(1, "El codigo postal no puede ser menor a 1"),
  additionalData: z.string().optional(),
});

export const registerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "El nombre no puede estar vacio"),
  surname: z.string().min(1, "El apellido no puede estar vacio"),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
  phone: z.string().min(1, "El telefono no puede estar vacio"),
  email: z.string().email("El mail no es valido"),
  address: addressSchema,
  guarantors: z.array(
    z.object({
      name: z.string().min(1, "El nombre no puede estar vacio"),
      surname: z.string().min(1, "El apellido no puede estar vacio"),
      dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
      phone: z.string().min(1, "El telefono no puede estar vacio"),
      email: z.string().email("El mail no es valido"),
      address: addressSchema,
    })
  ),
  carAsPayment: z.object({}),
});

export type RegisterSchemaT = z.infer<typeof registerSchema>;
