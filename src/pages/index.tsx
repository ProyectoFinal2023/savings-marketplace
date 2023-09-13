import { useAuth } from "@clerk/nextjs";
import { GetServerSideProps, type NextPage } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { Layout } from "~/components/Layout/Layout";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";

const Home: NextPage = (props) => {
  return (
    <Layout>
      <button className="bg-green-300" onClick={() => ({})}>
        Haceme click
      </button>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const clerkUser = getAuth(ctx.req);
  if (!clerkUser.userId) throw Error("Not authorized.");
  const ssg = generateSSGHelper();
  const user = await ssg.users.getById.fetch({ id: clerkUser.userId });
  if (!user) {
    return {
      redirect: {
        destination: "/tutorial",
        permanent: false,
      },
      props: {},
    };
  }
  return {
    props: {},
    redirect: {
      destination: "/plans",
      permanent: false,
    },
  };
};

export default Home;

