import { InputText as PrimeInputText } from "primereact/inputtext";
import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
import { ErrorMessage } from "~/components/ErrorMessage";
import { type ErrorsT } from "~/types/userInfo";

type InputTextProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  label: string;
  errors: ErrorsT;
  required?: boolean;
};

export const InputText = <T extends FieldValues>(props: InputTextProps<T>) => {
  const { register, name, placeholder, label, errors, required = true } = props;

  return (
    <div className="flex grow flex-col items-stretch gap-2">
      <label htmlFor={name}>
        {label}
        <span className="text-red-500">{required ? " *" : ""}</span>
      </label>
      <PrimeInputText {...register(name)} placeholder={placeholder} />
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};
