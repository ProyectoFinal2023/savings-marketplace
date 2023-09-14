/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { type RegisterSchemaT, registerSchema } from "~/schemas/registerSchema";
import { type UserInfoT } from "~/types/userInfo";
import { api } from "~/utils/api";

export const useRegister = (props: { user: UserInfoT; clerkId: string }) => {
  const form = useForm<RegisterSchemaT>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      id: props.user?.id || "",
      clerkId: props.user?.clerkId || props.clerkId,
      name: props.user?.name || "",
      surname: props.user?.surname || "",
      cuit: props.user?.cuit || "",
      phone: props.user?.phone || "",
      email: props.user?.email || "",
      address: {
        id: props.user?.address?.id || "",
        street: props.user?.address?.street || "",
        streetNumber: props.user?.address?.streetNumber || 1234,
        province: props.user?.address?.province || "",
        city: props.user?.address?.city || "",
        district: props.user?.address?.district || "",
        postalCode: props.user?.address?.postalCode || 1234,
        additionalData: props.user?.address?.additionalData || "",
      },
      guarantors: props.user?.guarantors.map((g) => ({
        ...g,
        address: {
          id: "",
          street: "",
          streetNumber: 1234,
          province: "",
          city: "",
          district: "",
          postalCode: 1234,
          additionalData: "",
        },
      })),
      carAsPayment: {},
    },
  });
  const guarantors = useFieldArray({
    control: form.control,
    name: "guarantors",
  });
  const { mutate: upsertUser } = api.users.upsertUser.useMutation({
    onSuccess: () => {
      toast.success("Datos actualizados con éxito.");
    },
    onError: () => {
      toast.error("Hubo un error. Intente nuevamente más tarde.");
    },
  });

  return { form, guarantors, upsertUser };
};
