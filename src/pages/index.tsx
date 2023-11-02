import { getAuth } from "@clerk/nextjs/server";
import { type GetServerSideProps, type NextPage } from "next";
import { Layout } from "~/components/Layout/Layout";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";

const Home: NextPage = (_props) => {
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
  const user = await ssg.users.getByClerkId.fetch({
    clerkId: clerkUser.userId,
  });
  if (!user) {
    return {
      redirect: {
        destination: "/tutorial",
        permanent: false,
      },
      props: {},
    };
  }
  if (user?.userType.description == "Admin") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
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
