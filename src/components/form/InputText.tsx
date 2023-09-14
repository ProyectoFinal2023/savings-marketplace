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
  maxLength?: number;
};

export const InputText = <T extends FieldValues>(props: InputTextProps<T>) => {
  const {
    register,
    name,
    placeholder,
    label,
    errors,
    required = true,
    maxLength,
  } = props;

  return (
    <div className="flex flex-col items-stretch gap-2 row-span-4 w-full">
      <label htmlFor={name}>
        {label}
        <span className="text-red-500">{required ? " *" : ""}</span>
      </label>
      <PrimeInputText
        {...register(name)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};
