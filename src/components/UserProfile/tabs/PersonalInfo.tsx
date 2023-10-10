/* eslint-disable @typescript-eslint/no-misused-promises */
import { InputText } from "~/components/form/InputText";
import { type ErrorsT, type RegisterT } from "~/types/userInfo";

export const PersonalInfo = ({
  register,
  errors,
  isLoading,
}: {
  register: RegisterT;
  errors: ErrorsT;
  isLoading: boolean;
}) => (
  <>
    <div className="flex flex-wrap gap-4">
      <InputText
        register={register}
        placeholder="Jorge"
        name="name"
        label="Nombre"
        errors={errors}
        disabled={isLoading}
      />
      <InputText
        register={register}
        placeholder="Pérez"
        name="surname"
        label="Apellido"
        errors={errors}
        disabled={isLoading}
      />
    </div>
    <InputText
      register={register}
      name="cuit"
      label="CUIT"
      maxLength={11}
      placeholder="99999999999"
      errors={errors}
      disabled={isLoading}
    />
    <InputText
      register={register}
      name="phone"
      label="N. de Celular"
      placeholder="+54 9 11 1234-5678"
      errors={errors}
      disabled={isLoading}
    />
    <InputText
      register={register}
      name="email"
      label="Email"
      placeholder="ejemplo@gmail.com"
      errors={errors}
      disabled={isLoading}
    />
  </>
);
