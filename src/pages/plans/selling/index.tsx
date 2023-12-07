import type { Prisma } from "@prisma/client";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { useRouter } from "next/router";
import { SelectItemOptionsType } from "primereact/selectitem";
import { useState } from "react";
import { toast } from "react-toastify";
import { Layout } from "~/components/Layout/Layout";
import ActionsButton from "~/components/shared/ActionsButton";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { api, type RouterOutputs } from "~/utils/api";
import { confirmAction } from "~/utils/modal";
import { formatARS, formatUSD } from "~/utils/strings";

type SavingsPlanItem = Prisma.SavingsPlanGetPayload<{
  include: {
    carModel: Prisma.CarModelDefaultArgs;
    status: Prisma.SavingsPlanStatusDefaultArgs;
    seller: Prisma.SavingsPlanSellerDefaultArgs;
  };
}>;

const UsersInPlans: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ savingsPlans }) => {
  const { push } = useRouter();
  const [savingPlansState, setSavingPlansState] = useState(savingsPlans);

  const { mutate: confirmPendingPlan } =
    api.savingsPlans.confirmPendingSavingsPlan.useMutation({
      onSuccess: (data, variables) => {
        toast.success("Reserva del plan aceptada con éxito.");
        setSavingPlansState(
          savingPlansState.map((plan) =>
            plan.id === variables.id ? data : plan
          )
        );
      },
      onError: () => {
        toast.error("Hubo un error. Intente nuevamente más tarde.");
      },
    });

  const { mutate: rejectPendingPlan } =
    api.savingsPlans.rejectPendingSavingsPlan.useMutation({
      onSuccess: (data, variables) => {
        toast.success("Reserva del plan rechazada con éxito.");
        setSavingPlansState(
          savingPlansState.map((plan) =>
            plan.id === variables.id ? data : plan
          )
        );
      },
      onError: () => {
        toast.error("Hubo un error. Intente nuevamente más tarde.");
      },
    });

  const { mutate: disableActivePlan } =
    api.savingsPlans.disableActiveSavingsPlan.useMutation({
      onSuccess: (data, variables) => {
        toast.success("Plan desactivado con éxito.");
        setSavingPlansState(
          savingPlansState.map((plan) =>
            plan.id === variables.id ? data : plan
          )
        );
      },
      onError: () => {
        toast.error("Hubo un error. Intente nuevamente más tarde.");
      },
    });

  const actions: Record<
    "pendiente" | "confirmado" | "activo",
    SelectItemOptionsType
  > = {
    pendiente: [
      {
        label: "Ver detalle",
        value: (savingPlan: SavingsPlanItem) => {
          void push(`/plans/${savingPlan.id}`);
        },
      },
      {
        label: "Confirmar",
        value: (savingPlan: SavingsPlanItem) => {
          confirmAction({
            message: `¿Está seguro que desea confirmar el plan ${savingPlan.title}?`,
            header: "Confirmar reserva de plan",
            accept: () => {
              confirmPendingPlan({ id: savingPlan.id });
            },
          });
        },
      },
      {
        label: "Rechazar",
        value: (savingPlan: SavingsPlanItem) => {
          confirmAction({
            message: `¿Está seguro que desea rechazar el plan ${savingPlan.title}?`,
            header: "Rechazar reserva de plan",
            accept: () => {
              rejectPendingPlan({ id: savingPlan.id });
            },
          });
        },
      },
    ],
    confirmado: [
      {
        label: "Ver detalle",
        value: (savingPlan: SavingsPlanItem) => {
          void push(`/plans/${savingPlan.id}`);
        },
      },
    ],
    activo: [
      {
        label: "Ver detalle",
        value: (savingPlan: SavingsPlanItem) => {
          void push(`/plans/${savingPlan.id}`);
        },
      },
      {
        label: "Dar de baja",
        value: (savingPlan: SavingsPlanItem) => {
          confirmAction({
            message: `¿Está seguro que desea dar de baja el plan ${savingPlan.title}?`,
            header: "Dar de baja",
            accept: () => {
              disableActivePlan({ id: savingPlan.id });
            },
          });
        },
      },
    ],
  };

  return (
    <Layout>
      <div className="flex flex-col p-12">
        <div className="mb-6">
          <h1 className="text-4xl font-black">Planes en Venta</h1>
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
                    ].map((columna) => (
                      <th
                        key={columna}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                      >
                        {columna}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {savingPlansState?.map((savingsPlan, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {savingsPlan.title}
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
                          disabled={
                            savingsPlan.status?.name == "rechazado" ||
                            savingsPlan.status?.name == "inactivo"
                          }
                          actions={
                            savingsPlan.status?.name !== "rechazado" &&
                            savingsPlan.status?.name !== "inactivo"
                              ? actions[
                                  savingsPlan.status?.name as
                                    | "pendiente"
                                    | "confirmado"
                                    | "activo"
                                ]
                              : []
                          }
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
    </Layout>
  );
};

export default UsersInPlans;

export const getServerSideProps: GetServerSideProps<{
  savingsPlans: RouterOutputs["savingsPlans"]["getSellingPlans"];
}> = async (ctx) => {
  const ssg = generateSSGHelper(ctx.req);
  const savingsPlans: RouterOutputs["savingsPlans"]["getSellingPlans"] =
    await ssg.savingsPlans.getSellingPlans.fetch();

  return {
    props: {
      savingsPlans,
    },
  };
};
