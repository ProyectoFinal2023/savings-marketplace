import { useAuth } from "@clerk/nextjs";
import { GetServerSideProps, type NextPage } from "next";

const Home: NextPage = (props) => {
  const { userId } = useAuth();

  return null;
};

export default Home;

// TODO - landing page
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: "/plans",
      permanent: false,
    },
  };
};
