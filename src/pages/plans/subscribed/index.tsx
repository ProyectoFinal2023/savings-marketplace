import type { Prisma } from "@prisma/client";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { useRouter } from "next/router";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Layout } from "~/components/Layout/Layout";
import ReservedPlanMessage from "~/components/Plans/ReservedPlanMessage";
import ActionsButton from "~/components/shared/ActionsButton";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { api, type RouterOutputs } from "~/utils/api";
import { formatARS, formatUSD } from "~/utils/strings";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { toast } from "react-toastify";
import { confirmAction } from "~/utils/modal";

type SavingsPlanItem = Prisma.SavingsPlanGetPayload<{
  include: {
    carModel: Prisma.CarModelDefaultArgs,
    status: Prisma.SavingsPlanStatusDefaultArgs,
    seller: Prisma.SavingsPlanSellerDefaultArgs,
  }
}>

const UsersInPlans: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ savingPlans }) => {
  const { push } = useRouter();
  const [contactInfo, setContactInfo] = useState(
    { name: '', email: '', phone_number: '', bank_info: '' }
  );
  const [savingPlansState, setSavingPlansState] = useState(savingPlans);
  const { data: _savingPlans } = api.savingsPlans.getUserPlans.useQuery();
  const { mutate: cancelPendingPlan } = api.savingsPlans.cancelPendingSavingsPlan.useMutation({
    onSuccess: (data, variables) => {
      toast.success("Reserva del plan cancelada con éxito.");
      setSavingPlansState(savingPlansState.filter((plan) => plan.id !== variables.id));
    },
    onError: () => {
      toast.error("Hubo un error. Intente nuevamente más tarde.");
    },
  });
  const [showContactInfo, setShowContactInfo] = useState(false);

  return (
    <Layout>
      <ConfirmDialog />
      <div className="flex flex-col p-12">
        <div className="mb-6">
          <h1 className="text-4xl font-black">Planes Asociados</h1>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-dark">
                  <tr>
                    {[
                      "Plan",
                      "Modelo del Auto",
                      "Monto $",
                      "Monto U$D",
                      "Estado",
                      "Lapso del plan",
                      "Acciones",
                    ].map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {savingPlansState?.map((savingsPlan, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {savingsPlan.description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {savingsPlan.carModel.description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatARS(savingsPlan.movingValue)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatUSD(savingsPlan.movingValue)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {savingsPlan.status?.description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {savingsPlan.plan_total_months} Meses
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <ActionsButton
                          item={savingsPlan}
                          disabled={savingsPlan.status?.name == 'rechazado' || savingsPlan.status?.name == 'inactivo'}
                          actions={(savingsPlan.status?.name !== 'rechazado' && savingsPlan.status?.name !== 'inactivo') ? (savingsPlan.status?.name !== 'pendiente' ? [{
                            label: 'Mostrar Contacto',
                            value: (savingPlan: SavingsPlanItem) => {
                              const _contactInfo = savingPlan.seller?.contactInfo;
                              setContactInfo(_contactInfo ? JSON.parse(_contactInfo ?? "") as { name: string, email: string, phone_number: string, bank_info: string } : contactInfo);
                              setShowContactInfo(true);
                            }
                          }] : [
                            {
                              label: 'Ver detalle',
                              value: (savingPlan: SavingsPlanItem) => {
                                void push(`/plans/${savingPlan.id}`);
                              }
                            },
                            {
                              label: 'Mostrar Contacto',
                              value: (savingPlan: SavingsPlanItem) => {
                                const _contactInfo = savingPlan.seller?.contactInfo;
                                setContactInfo(_contactInfo ? JSON.parse(_contactInfo ?? "") as { name: string, email: string, phone_number: string, bank_info: string } : contactInfo);
                                setShowContactInfo(true);
                              }
                            }, {
                              label: 'Cancelar',
                              value: (savingPlan: SavingsPlanItem) => {
                                confirmAction({
                                  message: `¿Está seguro que desea cancelar la reserva del plan ${savingPlan.description}?`,
                                  header: 'Cancelar plan',
                                  accept: () => { cancelPendingPlan({ id: savingPlan.id }) }
                                });
                              }
                            }
                          ]) : []}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        visible={showContactInfo}
        onHide={() => setShowContactInfo(false)}
        header="Contacto"
        className=" min-w-[30rem]"
      >
        <ReservedPlanMessage contactInfo={contactInfo} />
      </Dialog>
    </Layout>
  );
};

export default UsersInPlans;

export const getServerSideProps: GetServerSideProps<{
  savingPlans: RouterOutputs["savingsPlans"]["getUserPlans"]
}> = async (ctx) => {
  const ssg = generateSSGHelper(ctx.req);
  const savingPlans: RouterOutputs["savingsPlans"]["getUserPlans"] = await ssg.savingsPlans.getUserPlans.fetch();

  return {
    props: {
      savingPlans
    }
  };
};
