/* eslint-disable @typescript-eslint/no-misused-promises */
import { InputText } from "primereact/inputtext";
import { ErrorMessage } from "~/components/ErrorMessage";
import { type ErrorsT, type RegisterT } from "~/types/userInfo";

export const PersonalInfo = ({
  register,
  errors,
}: {
  register: RegisterT;
  errors: ErrorsT;
}) => (
  <>
    <div className="flex gap-4">
      <div className="flex grow flex-col items-stretch gap-2">
        <label htmlFor="name">Nombre</label>
        <InputText {...register("name")} placeholder="Jorge" />
        <ErrorMessage errors={errors} name="name" />
      </div>
      <div className="flex grow flex-col gap-2">
        <label htmlFor="surname">Apellido</label>
        <InputText {...register("surname")} placeholder="Pérez" />
        <ErrorMessage errors={errors} name="surname" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="dni">DNI</label>
      <InputText {...register("dni")} placeholder="99999999" />
      <ErrorMessage errors={errors} name="dni" />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="phone">N. de Celular</label>
      <InputText {...register("phone")} placeholder="+54 9 11 1234-5678" />
      <ErrorMessage errors={errors} name="phone" />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="email">Email</label>
      <InputText {...register("email")} placeholder="ejemplo@gmail.com" />
      <ErrorMessage errors={errors} name="email" />
    </div>
  </>
);
