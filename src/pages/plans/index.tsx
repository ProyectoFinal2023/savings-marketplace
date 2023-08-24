import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { Layout } from "~/components/Layout/Layout";
import { PlansView } from "~/components/PlansView";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { type SearchParams, type PlanList } from "~/types/plans";

const PlansPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <Layout>
      <PlansView {...props} />
    </Layout>
  );
};

export default PlansPage;

export const getServerSideProps: GetServerSideProps<{
  plans: PlanList;
  total: number;
  search: SearchParams;
}> = async ({ query }) => {
  const title = query.title || "";
  if (typeof title !== "string") throw new Error();
  const page = Number(query.page) || 1;
  const size = Number(query.size) || 3;

  const ssg = generateSSGHelper();
  const search = { title, page, size };
  const { plans, total } = await ssg.savingsPlans.getSavingsPlans.fetch({
    search,
  });

  return { props: { plans, total, search } };
};
