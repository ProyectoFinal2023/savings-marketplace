import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { type RegisterSchemaT, registerSchema } from "~/schemas/registerSchema";

export const useRegister = () => {
  const form = useForm<RegisterSchemaT>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      id: "",
      name: "",
      surname: "",
      dni: "",
      phone: "",
      email: "",
      guarantors: [],
      carAsPayment: {},
    },
  });
  const guarantors = useFieldArray({
    control: form.control,
    name: "guarantors",
  });

  return { form, guarantors };
};
