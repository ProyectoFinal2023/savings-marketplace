/* eslint-disable @typescript-eslint/no-misused-promises */
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { type UseFormReturn } from "react-hook-form";
import { ErrorMessage } from "~/components/ErrorMessage";
import { type RegisterSchemaT } from "~/schemas/registerSchema";
import { type GuarantorT } from "~/types/userInfo";
import { Address } from "./Address";

export const Guarantors = ({
  guarantors,
  form,
}: {
  form: UseFormReturn<RegisterSchemaT>;
  guarantors: GuarantorT;
}) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <>
      <Accordion>
        {guarantors.fields.map((g, index) => (
          <AccordionTab
            key={g.id}
            header={
              g.name || g.surname
                ? `${g.name} ${g.surname}`
                : `Garante #${index + 1}`
            }
          >
            <div className="relative">
              <button
                className="absolute right-2"
                onClick={() => guarantors.remove(index)}
              >
                <i className="pi pi-times" />
              </button>
              <div className="flex flex-col gap-4 p-4">
                <div className="flex gap-4">
                  <div className="flex w-full flex-col items-stretch gap-2">
                    <label htmlFor={`guarantors.${index}.name`}>Nombre</label>
                    <InputText
                      {...register(`guarantors.${index}.name`)}
                      placeholder="Jorge"
                    />
                    <ErrorMessage
                      errors={errors}
                      name={`guarantors.${index}.name`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor={`guarantors.${index}.name`}>Apellido</label>
                    <InputText
                      {...register(`guarantors.${index}.surname`)}
                      placeholder="Pérez"
                    />
                    <ErrorMessage
                      errors={errors}
                      name={`guarantors.${index}.surname`}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor={`guarantors.${index}.dni`}>DNI</label>
                  <InputText
                    {...register(`guarantors.${index}.dni`)}
                    placeholder="99999999"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`guarantors.${index}.dni`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor={`guarantors.${index}.phone`}>
                    N. de Celular
                  </label>
                  <InputText
                    {...register(`guarantors.${index}.phone`)}
                    placeholder="+54 9 11 1234-5678"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`guarantors.${index}.phone`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor={`guarantors.${index}.email`}>Email</label>
                  <InputText
                    {...register(`guarantors.${index}.email`)}
                    placeholder="ejemplo@gmail.com"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`guarantors.${index}.email`}
                  />
                </div>
                <Address prefix={`guarantors.${index}`} form={form} />
              </div>
            </div>
          </AccordionTab>
        ))}
      </Accordion>
      <Button
        label="Agregar un garante"
        type="button"
        severity="success"
        className="mx-auto w-1/2"
        icon="pi pi-plus"
        onClick={() =>
          guarantors.append({
            name: "",
            surname: "",
            dni: "",
            phone: "",
            email: "",
          })
        }
      />
    </>
  );
};
