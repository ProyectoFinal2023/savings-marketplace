/* eslint-disable @typescript-eslint/no-misused-promises */
import { type UseFormReturn } from "react-hook-form";
import { InputNumber } from "~/components/form/InputNumber";
import { InputText } from "~/components/form/InputText";
import { InputTextArea } from "~/components/form/InputTextArea";
import { type RegisterSchemaT } from "~/schemas/registerSchema";

export const Address = ({
  form,
  prefix,
}: {
  form: UseFormReturn<RegisterSchemaT>;
  prefix?: string;
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const formPrefix = prefix ? prefix + "." : "";

  return (
    <div className="flex flex-col items-stretch gap-4">
      <div className="flex gap-4">
        <InputText
          register={register}
          name={`${formPrefix}address.street` as "address.street"}
          label="Calle"
          placeholder="Av. Mitre"
          errors={errors}
        />
        <InputNumber
          control={control}
          name={`${formPrefix}address.streetNumber` as "address.streetNumber"}
          label="Altura"
          placeholder="123"
          errors={errors}
          required={true}
        />
      </div>
      <div className="flex gap-4">
        <InputText
          register={register}
          name={`${formPrefix}address.province` as "address.province"}
          label="Provincia"
          placeholder="Buenos Aires"
          errors={errors}
        />
        <InputText
          register={register}
          name={`${formPrefix}address.city` as "address.city"}
          label="Ciudad"
          placeholder="Capital Federal"
          errors={errors}
        />
      </div>
      <div className="flex gap-4">
        <InputText
          register={register}
          name={`${formPrefix}address.district` as "address.district"}
          label="Localidad / Comuna"
          placeholder="Haedo / 3"
          errors={errors}
        />
        <InputNumber
          control={control}
          name={`${formPrefix}address.postalCode` as "address.postalCode"}
          label="Codigo Postal"
          placeholder="1234"
          errors={errors}
        />
      </div>
      <InputTextArea
        register={register}
        name={`${formPrefix}address.additionalData` as "address.additionalData"}
        placeholder="Entre calles A y B"
        label="Datos Adicionales"
        required={false}
        errors={errors}
      />
    </div>
  );
};
