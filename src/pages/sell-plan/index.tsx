import { zodResolver } from "@hookform/resolvers/zod";
import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Layout } from "~/components/Layout/Layout";

const schema = z.object({});

const SellPlanPage: NextPage = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  return <Layout></Layout>;
};

export default SellPlanPage;
