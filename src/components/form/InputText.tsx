import {
  type FieldName,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
import { ErrorMessage } from "~/components/ErrorMessage";
import { InputText as PrimeInputText } from "primereact/inputtext";
import { type FieldValuesFromFieldErrors } from "@hookform/error-message";

type InputTextProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  label: string;
  errors: FieldErrors<T>;
};

export const InputText = <T extends FieldValues>(props: InputTextProps<T>) => {
  const { register, name, placeholder, label, errors } = props;
  const errorName = name as unknown as FieldName<
    FieldValuesFromFieldErrors<FieldErrors<T>>
  >;
  return (
    <div className="flex grow flex-col items-stretch gap-2">
      <label htmlFor={name}>{label}</label>
      <PrimeInputText {...register(name)} placeholder={placeholder} />
      <ErrorMessage errors={errors} name={errorName} />
    </div>
  );
};
