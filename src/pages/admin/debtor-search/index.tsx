import { getAuth } from "@clerk/nextjs/server";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import Image from "next/image";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DefaultUser } from "public";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Layout } from "~/components/Layout/Layout";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { type RouterOutputs } from "~/utils/api";

type Debtor = RouterOutputs["admin"]["getByCuit"];

const schema = z.object({
  cuit: z.string().min(1).default(""),
});
type SearchT = z.infer<typeof schema>;

const DebtorSearchPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ debtor }) => {
  const { register } = useForm<SearchT>({
    resolver: zodResolver(schema),
    defaultValues: {
      cuit: debtor?.cuit ? String(debtor?.cuit) : "",
    },
    mode: "onSubmit",
  });

  const debtorData = debtor?.data;
  const onSubmit = () => {
    return null;
  };

  return (
    <Layout classname="px-12">
      <div className="flex flex-col p-4">
        <div className="mb-4">
          <h1 className=" text-4xl font-black">Búsqueda de Deudores</h1>
        </div>
        <form onSubmit={onSubmit} className="mb-8 flex gap-4">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder="Buscar" {...register("cuit")} />
          </span>
          <Button text raised type="submit">
            Buscar
          </Button>
        </form>
        {debtor && (
          <div className="my-3 flex h-48 w-fit min-w-[50rem] items-center gap-8 rounded-md bg-dark p-4">
            <div>
              <Image
                src={DefaultUser}
                width={128}
                height={128}
                alt={`Foto de perfil de ${debtor.nombre}`}
              />
            </div>
            <div className=" flex h-full flex-col flex-wrap justify-center ">
              {[
                { key: "Nombre: ", value: debtor.nombre },
                { key: "Estado: ", value: debtor.estado },
                { key: "Riesgo: ", value: debtor.riesgo },
                { key: "Cuotas impagas: ", value: debtor.cuotas_impagas },
                {
                  key: "Contactar? ",
                  value: debtor.contactar,
                  className:
                    debtor.contactar === "NO"
                      ? "text-red-400"
                      : "text-green-400",
                },
              ].map((data) => (
                <div
                  key={data.key}
                  className="flex shrink-0 basis-1/3 items-center gap-2 px-4 text-white"
                >
                  <span className="font-bold">{data.key}</span>
                  <span className={clsx(data.className, "font-bold")}>
                    {data.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-dark">
                  <tr>
                    {[
                      "Entidad",
                      "Período",
                      "Situación",
                      "Monto",
                      "Días de atraso",
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
                  {debtorData?.map((debtor, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor.entidad}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor.periodo}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor.situacion}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor.monto}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {debtor.dias_atraso}
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
export default DebtorSearchPage;

export const getServerSideProps: GetServerSideProps<{
  debtor: Debtor | null;
}> = async (ctx) => {
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
  const cuit = ctx.query.cuit;
  let debtor = null;
  if (cuit) {
    debtor = await ssg.admin.getByCuit.fetch({ cuit: cuit as string });
  }

  return { props: { debtor } };
};
