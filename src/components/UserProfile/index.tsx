/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { TabPanel, TabView } from "primereact/tabview";
import { useRegister } from "~/hooks/useRegister";
import { type RegisterSchemaT } from "~/schemas/registerSchema";
import { type UserInfoT } from "~/types/userInfo";
import { Address } from "./tabs/Address";
import { Guarantors } from "./tabs/Guarantors";
import { PersonalInfo } from "./tabs/PersonalInfo";

type UserProfileProps = {
  className?: string;
  user: UserInfoT;
  clerkId: string;
};

export const UserProfile = (props: UserProfileProps) => {
  const { form, guarantors, onSubmit, isLoading } = useRegister(props);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = form;

  return (
    <main className="md:mx-auto md:max-w-4xl md:p-4">
      <Card
        title="Tu perfil"
        subTitle="Para poder comprar/vender un plan de ahorro, debes completar los siguientes datos:"
      >
        <form
          className="flex flex-col items-stretch gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TabView>
            <TabPanel
              header="Datos Personales"
              className="flex flex-col items-stretch justify-start gap-4 "
            >
              <PersonalInfo
                register={register}
                errors={errors}
                isLoading={isLoading}
              />
            </TabPanel>
            <TabPanel header="Direccion">
              <Address form={form} isLoading={isLoading} />
            </TabPanel>
            <TabPanel
              header="Garantes"
              className="flex flex-col items-stretch justify-start gap-4 "
            >
              <Guarantors
                form={form}
                guarantors={guarantors}
                isLoading={isLoading}
              />
            </TabPanel>
          </TabView>
          <div className="flex flex-col items-stretch gap-2">
            <Button
              text
              raised
              type="submit"
              label="Actualizar datos"
              disabled={isLoading}
            />
            {isSubmitted && !isValid && (
              <p className="text-center text-red-500">
                Algunos datos tienen errores. Por favor revisar el formulario.
              </p>
            )}
          </div>
        </form>
      </Card>
    </main>
  );
};
