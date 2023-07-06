import { type NextPage } from "next";
import Link from "next/link";
import { Layout } from "~/components/Layout/Layout";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return <Layout></Layout>;
};

export default Home;
