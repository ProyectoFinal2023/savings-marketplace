import { InputTextarea as PrimeInputTextarea } from "primereact/inputtextarea";
import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
import { ErrorMessage } from "~/components/ErrorMessage";
import { type ErrorsT } from "~/types/userInfo";

type InputTextAreaProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  label: string;
  errors: ErrorsT;
  required?: boolean;
  disabled?: boolean;
};

export const InputTextArea = <T extends FieldValues>(
  props: InputTextAreaProps<T>
) => {
  const {
    register,
    name,
    placeholder,
    label,
    errors,
    required = true,
    disabled,
  } = props;

  return (
    <div className="shink-0 flex grow flex-col items-stretch gap-2">
      <label htmlFor={name}>
        {label}
        <span className="text-red-500">{required ? " *" : ""}</span>
      </label>
      <PrimeInputTextarea
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
      />
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};
