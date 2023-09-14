/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRegister } from "~/hooks/useRegister";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import {
  type UseFieldArrayReturn,
  type UseFormReturn,
  Controller,
} from "react-hook-form";
import { type RegisterSchemaT } from "~/schemas/registerSchema";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputNumber } from "primereact/inputnumber";
import { ErrorMessage } from "@hookform/error-message";

type RegisterT = UseFormReturn<RegisterSchemaT>["register"];
type ErrorsT = UseFormReturn<RegisterSchemaT>["formState"]["errors"];
type GuarantorT = UseFieldArrayReturn<RegisterSchemaT, "guarantors", "id">;

const renderErrorMessage = ({ message }: { message: string }) => (
  <p className="text-red-800">{message}</p>
);

const PersonalInfo = ({
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
        <ErrorMessage errors={errors} name="name" render={renderErrorMessage} />
      </div>
      <div className="flex grow flex-col gap-2">
        <label htmlFor="surname">Apellido</label>
        <InputText {...register("surname")} placeholder="Pérez" />
        <ErrorMessage
          errors={errors}
          name="surname"
          render={renderErrorMessage}
        />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="dni">DNI</label>
      <InputText {...register("dni")} placeholder="99999999" />
      <ErrorMessage errors={errors} name="dni" render={renderErrorMessage} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="phone">N. de Celular</label>
      <InputText {...register("phone")} placeholder="+54 9 11 1234-5678" />
      <ErrorMessage errors={errors} name="phone" render={renderErrorMessage} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="email">Email</label>
      <InputText {...register("email")} placeholder="ejemplo@gmail.com" />
      <ErrorMessage errors={errors} name="email" render={renderErrorMessage} />
    </div>
  </>
);

const Address = ({ form }: { form: UseFormReturn<RegisterSchemaT> }) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  return (
    <div className="flex flex-col items-stretch gap-4">
      <div className="flex gap-4">
        <div className="flex grow flex-col items-stretch gap-2">
          <label htmlFor="address.street">Calle</label>
          <InputText {...register("address.street")} placeholder="Av. Mitre" />
          <ErrorMessage
            errors={errors}
            name="address.street"
            render={renderErrorMessage}
          />
        </div>
        <div className="flex grow flex-col gap-2">
          <label htmlFor="address.streetNumber">Altura</label>
          <Controller
            name="address.streetNumber"
            control={control}
            render={({ field }) => (
              <InputNumber
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                onBlur={field.onBlur}
                useGrouping={false}
                placeholder="123"
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="address.streetNumber"
            render={renderErrorMessage}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex grow flex-col gap-2">
          <label htmlFor="address.province">Provincia</label>
          <InputText
            {...register("address.province")}
            placeholder="Buenos Aires"
          />
          <ErrorMessage
            errors={errors}
            name="address.province"
            render={renderErrorMessage}
          />
        </div>
        <div className="flex grow flex-col gap-2">
          <label htmlFor="address.city">Ciudad</label>
          <InputText
            {...register("address.city")}
            placeholder="Capital Federal"
          />
          <ErrorMessage
            errors={errors}
            name="address.city"
            render={renderErrorMessage}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex grow flex-col gap-2">
          <label htmlFor="address.district">Localidad / Comuna</label>
          <InputText
            {...register("address.district")}
            placeholder="Haedo / 3"
          />
          <ErrorMessage
            errors={errors}
            name="address.district"
            render={renderErrorMessage}
          />
        </div>
        <div className="flex grow flex-col gap-2">
          <label htmlFor="address.postalCode">Codigo Postal</label>
          <Controller
            name="address.postalCode"
            control={control}
            render={({ field }) => (
              <InputNumber
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                onBlur={field.onBlur}
                useGrouping={false}
                placeholder="1234"
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="address.postalCode"
            render={renderErrorMessage}
          />
        </div>
      </div>
    </div>
  );
};

const Guarantors = ({
  register,
  guarantors,
  errors,
}: {
  register: RegisterT;
  guarantors: GuarantorT;
  errors: ErrorsT;
}) => (
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
                    render={renderErrorMessage}
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
                    render={renderErrorMessage}
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
                  render={renderErrorMessage}
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
                  render={renderErrorMessage}
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
                  render={renderErrorMessage}
                />
              </div>
            </div>
          </div>
        </AccordionTab>
      ))}
    </Accordion>
    <Button
      label="Agregar un garante"
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

type UserProfileProps = {
  className?: string;
};

export const UserProfile = (_: UserProfileProps) => {
  const { form, guarantors } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: RegisterSchemaT) => console.log(data);

  console.log(errors);
  return (
    <main className="md:mx-auto md:max-w-xl md:p-4">
      <Card title="Tu perfil">
        <form
          className="flex flex-col items-stretch gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TabView>
            <TabPanel
              header="Datos Personales"
              className="flex flex-col items-stretch justify-start gap-4 "
            >
              <PersonalInfo register={register} errors={errors} />
            </TabPanel>
            <TabPanel header="Direccion">
              <Address form={form} />
            </TabPanel>
            <TabPanel
              header="Garantes"
              className="flex flex-col items-stretch justify-start gap-4 "
            >
              <Guarantors
                register={register}
                guarantors={guarantors}
                errors={errors}
              />
            </TabPanel>
          </TabView>
          <Button text raised type="submit" label="Actualizar datos" />
        </form>
      </Card>
    </main>
  );
};
