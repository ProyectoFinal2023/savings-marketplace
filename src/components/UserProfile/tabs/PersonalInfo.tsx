/* eslint-disable @typescript-eslint/no-misused-promises */
import { InputText } from "~/components/form/InputText";
import { type ErrorsT, type RegisterT } from "~/types/userInfo";

export const PersonalInfo = ({
  register,
  errors,
}: {
  register: RegisterT;
  errors: ErrorsT;
}) => (
  <>
    <div className="flex gap-4 flex-wrap">
      <InputText
        register={register}
        placeholder="Jorge"
        name="name"
        label="Nombre"
        errors={errors}
      />
      <InputText
        register={register}
        placeholder="Pérez"
        name="surname"
        label="Apellido"
        errors={errors}
      />
    </div>
    <InputText
      register={register}
      name="cuit"
      label="CUIT"
      maxLength={11}
      placeholder="99999999999"
      errors={errors}
    />
    <InputText
      register={register}
      name="phone"
      label="N. de Celular"
      placeholder="+54 9 11 1234-5678"
      errors={errors}
    />
    <InputText
      register={register}
      name="email"
      label="Email"
      placeholder="ejemplo@gmail.com"
      errors={errors}
    />
  </>
);
