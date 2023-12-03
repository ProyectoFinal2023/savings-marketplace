import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { Layout } from "~/components/Layout/Layout";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import type { RouterOutputs } from "~/utils/api";
import { formatARS, formatUSD } from "~/utils/strings";

const UsersInPlans: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ sellingPlans }) => {
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
                  {sellingPlans?.map(({ savingsPlan }, index) => (
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
  sellingPlans: RouterOutputs["savingsPlans"]["getSellingPlans"]
}> = async (ctx) => {
  const ssg = generateSSGHelper(ctx.req);
  const sellingPlans: RouterOutputs["savingsPlans"]["getSellingPlans"] = await ssg.savingsPlans.getSellingPlans.fetch();

  return {
    props: {
      sellingPlans
    }
  };
};
