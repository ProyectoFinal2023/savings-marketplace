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

type RegisterT = UseFormReturn<RegisterSchemaT>["register"];
type GuarantorT = UseFieldArrayReturn<RegisterSchemaT, "guarantors", "id">;

const PersonalInfo = ({ register }: { register: RegisterT }) => (
  <>
    <div className="flex gap-4">
      <div className="flex w-full flex-col items-stretch gap-2">
        <label htmlFor="name">Nombre</label>
        <InputText {...register("name")} placeholder="Jorge" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="surname">Apellido</label>
        <InputText {...register("name")} placeholder="Pérez" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="dni">DNI</label>
      <InputText {...register("dni")} placeholder="99999999" />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="phone">N. de Celular</label>
      <InputText {...register("phone")} placeholder="+54 9 11 1234-5678" />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="email">Email</label>
      <InputText {...register("email")} placeholder="ejemplo@gmail.com" />
    </div>
  </>
);

const Address = ({ form }: { form: UseFormReturn<RegisterSchemaT> }) => {
  const { register, control } = form;
  return (
    <div className="flex flex-col items-stretch gap-4">
      <div className="flex gap-4">
        <div className="flex grow flex-col items-stretch gap-2">
          <label htmlFor="address.street">Calle</label>
          <InputText {...register("address.street")} placeholder="Av. Mitre" />
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
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex grow flex-col gap-2">
          <label htmlFor="address.province">Provincia</label>
          <InputText
            {...register("address.province")}
            placeholder="Buenos Aires"
          />
        </div>
        <div className="flex grow flex-col gap-2">
          <label htmlFor="address.city">Ciudad</label>
          <InputText
            {...register("address.city")}
            placeholder="Capital Federal"
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
        </div>
      </div>
    </div>
  );
};

const Guarantors = ({
  register,
  guarantors,
}: {
  register: RegisterT;
  guarantors: GuarantorT;
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
              className="absolute right-4 top-4"
              onClick={() => guarantors.remove(index)}
            >
              <i className="pi pi-times" />
            </button>
            <div className="flex flex-col gap-4 rounded-md border p-4">
              <div className="flex gap-4">
                <div className="flex w-full flex-col items-stretch gap-2">
                  <label htmlFor={`guarantors.${index}.name`}>Nombre</label>
                  <InputText
                    {...register(`guarantors.${index}.name`)}
                    placeholder="Jorge"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor={`guarantors.${index}.name`}>Apellido</label>
                  <InputText
                    {...register(`guarantors.${index}.surname`)}
                    placeholder="Pérez"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`guarantors.${index}.dni`}>DNI</label>
                <InputText
                  {...register(`guarantors.${index}.dni`)}
                  placeholder="99999999"
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
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`guarantors.${index}.email`}>Email</label>
                <InputText
                  {...register(`guarantors.${index}.email`)}
                  placeholder="ejemplo@gmail.com"
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
  const { register } = form;

  return (
    <main className="md:mx-auto md:max-w-xl md:p-4">
      <Card title="Tu perfil">
        <div className="flex flex-col items-stretch gap-8">
          <TabView>
            <TabPanel
              header="Datos Personales"
              className="flex flex-col items-stretch justify-start gap-4 "
            >
              <PersonalInfo register={register} />
            </TabPanel>
            <TabPanel header="Direccion">
              <Address form={form} />
            </TabPanel>
            <TabPanel
              header="Garantes"
              className="flex flex-col items-stretch justify-start gap-4 "
            >
              <Guarantors register={register} guarantors={guarantors} />
            </TabPanel>
          </TabView>
          <Button label="Actualizar perfil" />
        </div>
      </Card>
    </main>
  );
};
