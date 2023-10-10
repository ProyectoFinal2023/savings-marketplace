import { InputNumber as PrimeInputNumber } from "primereact/inputnumber";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { type ErrorsT } from "~/types/userInfo";

type InputNumberProps<T extends FieldValues> = {
  name: Path<T>;
  errors: ErrorsT;
  control: Control<T>;
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
};

export const InputNumber = <T extends FieldValues>(
  props: InputNumberProps<T>
) => {
  const {
    name,
    control,
    errors,
    label,
    placeholder,
    required = true,
    disabled,
  } = props;

  return (
    <div className="flex grow flex-col gap-2">
      <label htmlFor={name}>
        {label}
        <span className="text-red-500">{required ? " *" : ""}</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PrimeInputNumber
            value={field.value}
            onChange={(e) => field.onChange(e.value)}
            onBlur={field.onBlur}
            useGrouping={false}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      />
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};
