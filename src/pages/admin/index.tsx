import { type GetServerSideProps, type NextPage } from "next";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { getAuth } from "@clerk/nextjs/server";

// components/DebtorsList.tsx
import React from "react";
import { Layout } from "~/components/Layout/Layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

type Debtor = {
  "Denominacion del deudor": string;
  Entidad: string;
  Periodo: string;
  Situacion: string;
  Monto: string;
  "Dias de atraso": string;
  Observaciones: string;
};

const schema = z.object({
  cuit: z.string().min(1).default(""),
});
type SearchT = z.infer<typeof schema>;

const AdminPage: NextPage = () => {
  const { register } = useForm<SearchT>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const { data, isLoading, isError } = {
    data: {
      data: [
        {
          "Denominacion del deudor": "FRANCELLA GUILLERMO HECTOR",
          Entidad: "BANCO SANTANDER ARGENTINA S.A.",
          Periodo: "08/23",
          Situacion: "1",
          Monto: "1624",
          "Dias de atraso": "N/A",
          Observaciones: "-",
        },
      ],
      contactar: "NO",
      estado: "En situación normal",
      riesgo: "Situación normal",
      CUIT: 20112997505,
      dev: 0,
    },
    isLoading: false,
    isError: false,
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError || !data) {
    return <div>{"No se pudo mostrar los datos del deudor."}</div>;
  }

  const debtorData = data.data as Debtor[];
  const onSubmit = () => {
    return null;
  };

  return (
    <Layout classname="px-12">
      <div className="flex flex-col p-4">
        <form onSubmit={onSubmit} className="mb-4 flex gap-4">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder="Buscar" {...register("cuit")} />
          </span>
          <Button text raised type="submit">
            Buscar
          </Button>
        </form>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Deudor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Entidad
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Periodo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Situación
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Monto
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Días de atraso
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Observaciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {debtorData.map((debtor, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {debtor["Denominacion del deudor"]}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor.Entidad}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor.Periodo}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor.Situacion}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor.Monto}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor["Dias de atraso"]}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor.Observaciones}
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
export default AdminPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const clerkUser = getAuth(ctx.req);
  if (!clerkUser.userId) throw Error("Not authorized.");
  const ssg = generateSSGHelper();
  const user = await ssg.users.getByClerkId.fetch({
    clerkId: clerkUser.userId,
  });
  if (user?.userType.description !== "Admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
