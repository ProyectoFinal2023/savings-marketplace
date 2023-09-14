import {
  type FieldValuesFromFieldErrors,
  ErrorMessage as RHFErrorMessage,
} from "@hookform/error-message";
import {
  type FieldErrors,
  type FieldName,
  type FieldValues,
} from "react-hook-form";

const renderErrorMessage = ({ message }: { message: string }) => (
  <p className="text-red-800">{message}</p>
);

type ErrorMessageProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>;
};

export const ErrorMessage = <T extends FieldValues>(
  props: ErrorMessageProps<T>
) => {
  const { errors, name } = props;
  return (
    <RHFErrorMessage errors={errors} name={name} render={renderErrorMessage} />
  );
};
