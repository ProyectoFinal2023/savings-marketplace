import { getAuth } from "@clerk/nextjs/server";
import { type GetServerSideProps, type NextPage } from "next";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Layout } from "~/components/Layout/Layout";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";

const AdminPage: NextPage = () => {
  const { push } = useRouter();

  return (
    <Layout>
      <div className="mx-auto my-16 h-60 w-3/5 rounded-lg bg-dark p-4 text-white">
        <h1 className="mb-2 text-2xl font-semibold">Admin Dashboard</h1>
        <p>A continuación se muestran los paneles disponibles.</p>
        <div className="mt-16 flex w-full justify-center gap-4">
          <Button onClick={() => void push("/admin/debtor-search")}>
            Módulo Deudores
          </Button>
          <Button
            onClick={() => {
              window.open("https://lookerstudio.google.com/reporting/613fb282-64d7-48e6-892e-b59c24a82225", '_blank');
            }}>
            Business Analytics
          </Button>
          <Button onClick={() => void push("/plans")}>
            Ver Planes Disponibles
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const clerkUser = getAuth(ctx.req);
  if (!clerkUser.userId) throw Error("Not authorized.");

  const ssg = generateSSGHelper(ctx.req);
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

  return { props: { } };
};
