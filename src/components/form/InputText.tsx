import { InputText as PrimeInputText } from "primereact/inputtext";
import { type KeyFilterType } from "primereact/keyfilter";
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
  disabled?: boolean;
  keyfilter?: KeyFilterType;
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
    disabled,
    keyfilter,
  } = props;

  return (
    <div className="row-span-4 flex w-full flex-col items-stretch gap-2">
      <label htmlFor={name}>
        {label}
        <span className="text-red-500">{required ? " *" : ""}</span>
      </label>
      <PrimeInputText
        {...register(name)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        keyfilter={keyfilter}
      />
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};
