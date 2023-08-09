import { useAuth } from "@clerk/nextjs";
import { type NextPage } from "next";

const Home: NextPage = (props) => {
  const { userId } = useAuth();

  return null;
};

export default Home;
