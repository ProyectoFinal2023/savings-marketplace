/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { TabPanel, TabView } from "primereact/tabview";
import { useRegister } from "~/hooks/useRegister";
import { type RegisterSchemaT } from "~/schemas/registerSchema";
import { Address } from "./tabs/Address";
import { Guarantors } from "./tabs/Guarantors";
import { PersonalInfo } from "./tabs/PersonalInfo";

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
              <Guarantors form={form} guarantors={guarantors} />
            </TabPanel>
          </TabView>
          <Button text raised type="submit" label="Actualizar datos" />
        </form>
      </Card>
    </main>
  );
};
