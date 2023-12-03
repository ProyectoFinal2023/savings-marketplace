import type { Prisma } from "@prisma/client";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { useRouter } from "next/router";
import { SelectItemOptionsType } from "primereact/selectitem";
import { Layout } from "~/components/Layout/Layout";
import ActionsButton from "~/components/shared/ActionsButton";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import type { RouterOutputs } from "~/utils/api";
import { formatARS, formatUSD } from "~/utils/strings";

type SavingsPlanItem = Prisma.SavingsPlanGetPayload<{
  include: {
    carModel: Prisma.CarModelDefaultArgs,
    status: Prisma.SavingsPlanStatusDefaultArgs,
    seller: Prisma.SavingsPlanSellerDefaultArgs,
  }
}>

const UsersInPlans: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ savingsPlans }) => {
  const { push } = useRouter();

  const actions: Record<'pendiente' | 'confirmado' | 'activo', SelectItemOptionsType> = {
    pendiente: [
      {
        label: 'Ver detalle',
        value: (savingPlan: SavingsPlanItem) => {
          void push(`/plans/${savingPlan.id}`);
        }
      },
      {
        label: 'Confirmar',
        value: (savingPlan: SavingsPlanItem) => {
          console.log('Confirmar saving plan', savingPlan);
        }
      },
      {
        label: 'Rechazar',
        value: (savingPlan: SavingsPlanItem) => {
          console.log('Rechazar saving plan', savingPlan);
        }
      }
    ],
    confirmado: [
      {
        label: 'Ver detalle',
        value: (savingPlan: SavingsPlanItem) => {
          void push(`/plans/${savingPlan.id}`);
        }
      },
    ],
    activo: [
      {
        label: 'Ver detalle',
        value: (savingPlan: SavingsPlanItem) => {
          void push(`/plans/${savingPlan.id}`);
        }
      },
    ]
  }

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
                  {savingsPlans?.map((savingsPlan, index) => (
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
                          actions={(savingsPlan.status?.name !== 'rechazado' && savingsPlan.status?.name !== 'inactivo') ? (
                            actions[(savingsPlan.status?.name as 'pendiente' | 'confirmado' | 'activo')]
                          ) : []}
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
  savingsPlans: RouterOutputs["savingsPlans"]["getSellingPlans"]
}> = async (ctx) => {
  const ssg = generateSSGHelper(ctx.req);
  const savingsPlans: RouterOutputs["savingsPlans"]["getSellingPlans"] = await ssg.savingsPlans.getSellingPlans.fetch();

  return {
    props: {
      savingsPlans
    }
  };
};
