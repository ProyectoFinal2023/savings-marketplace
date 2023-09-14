/* eslint-disable @typescript-eslint/no-misused-promises */
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Controller, type UseFormReturn } from "react-hook-form";
import { ErrorMessage } from "~/components/ErrorMessage";
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
  const streetName = `${formPrefix}address.street` as "address.street";
  const streetNumberName =
    `${formPrefix}address.streetNumber` as "address.streetNumber";
  const provinceName = `${formPrefix}address.province` as "address.province";
  const cityName = `${formPrefix}address.city` as "address.city";
  const districtName = `${formPrefix}address.district` as "address.district";
  const postalCodeName =
    `${formPrefix}address.postalCode` as "address.postalCode";
  return (
    <div className="flex flex-col items-stretch gap-4">
      <div className="flex gap-4">
        <div className="flex grow flex-col items-stretch gap-2">
          <label htmlFor={streetName}>Calle</label>
          <InputText {...register(streetName)} placeholder="Av. Mitre" />
          <ErrorMessage errors={errors} name={streetName} />
        </div>
        <div className="flex grow flex-col gap-2">
          <label htmlFor={streetNumberName}>Altura</label>
          <Controller
            name={streetNumberName}
            control={control}
            render={({ field }) => (
              <InputNumber
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                onBlur={field.onBlur}
                useGrouping={false}
                placeholder="123"
              />
            )}
          />
          <ErrorMessage errors={errors} name={streetNumberName} />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex grow flex-col gap-2">
          <label htmlFor={provinceName}>Provincia</label>
          <InputText {...register(provinceName)} placeholder="Buenos Aires" />
          <ErrorMessage errors={errors} name={provinceName} />
        </div>
        <div className="flex grow flex-col gap-2">
          <label htmlFor={cityName}>Ciudad</label>
          <InputText {...register(cityName)} placeholder="Capital Federal" />
          <ErrorMessage errors={errors} name={cityName} />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex grow flex-col gap-2">
          <label htmlFor={districtName}>Localidad / Comuna</label>
          <InputText {...register(districtName)} placeholder="Haedo / 3" />
          <ErrorMessage errors={errors} name={districtName} />
        </div>
        <div className="flex grow flex-col gap-2">
          <label htmlFor={postalCodeName}>Codigo Postal</label>
          <Controller
            name={postalCodeName}
            control={control}
            render={({ field }) => (
              <InputNumber
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                onBlur={field.onBlur}
                useGrouping={false}
                placeholder="1234"
              />
            )}
          />
          <ErrorMessage errors={errors} name={postalCodeName} />
        </div>
      </div>
    </div>
  );
};
