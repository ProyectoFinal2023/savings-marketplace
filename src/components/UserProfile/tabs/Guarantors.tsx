/* eslint-disable @typescript-eslint/no-misused-promises */
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { type UseFormReturn } from "react-hook-form";
import { InputText } from "~/components/form/InputText";
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

  const onClickAddGuarantor = () =>
    guarantors.append({
      name: "",
      surname: "",
      dni: "",
      phone: "",
      email: "",
      address: {
        street: "",
        province: "",
        city: "",
        district: "",
        postalCode: 1234,
        streetNumber: undefined,
        additionalData: "",
      },
    });

  return (
    <>
      <Accordion>
        {guarantors.fields.map((g, index) => {
          const prefix = `guarantors.${index}`;
          return (
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
                    <InputText
                      register={register}
                      placeholder="Jorge"
                      name={`${prefix}.name` as "guarantors.0.name"}
                      label="Nombre"
                      errors={errors}
                    />
                    <InputText
                      register={register}
                      placeholder="Pérez"
                      name={`${prefix}.surname` as "guarantors.0.surname"}
                      label="Apellido"
                      errors={errors}
                    />
                  </div>
                  <InputText
                    register={register}
                    placeholder="99999999"
                    name={`${prefix}.dni` as "guarantors.0.dni"}
                    label="DNI"
                    errors={errors}
                  />
                  <InputText
                    register={register}
                    placeholder="+54 9 11 1234-5678"
                    name={`${prefix}.phone` as "guarantors.0.phone"}
                    label="N. de Celular"
                    errors={errors}
                  />
                  <InputText
                    register={register}
                    placeholder="ejemplo@gmail.com"
                    name={`${prefix}.email` as "guarantors.0.email"}
                    label="Email"
                    errors={errors}
                  />
                  <Address prefix={`guarantors.${index}`} form={form} />
                </div>
              </div>
            </AccordionTab>
          );
        })}
      </Accordion>
      <Button
        label="Agregar un garante"
        type="button"
        severity="success"
        className="mx-auto w-1/2"
        icon="pi pi-plus"
        onClick={onClickAddGuarantor}
      />
    </>
  );
};
