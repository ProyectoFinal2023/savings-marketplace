import { type NextPage } from "next";
import { Layout } from "~/components/Layout/Layout";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: cars } = api.cars.getAll.useQuery();

  return <Layout>{cars?.map((car) => "Car: " + car.id)}</Layout>;
};

export default Home;
