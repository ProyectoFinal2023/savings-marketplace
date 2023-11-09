import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { ScrollPanel } from "primereact/scrollpanel";
import { Layout } from "~/components/Layout/Layout";
import PlanView from "~/components/Plans/PlanView";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { type PlanDetail } from "~/types/plans";

const PlansDetail: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ onePlan }) => {
  return (
    <Layout>
      <article className="mx-auto flex w-10/12 flex-wrap justify-start gap-6 py-12">
        <ScrollPanel>
          <PlanView plan={onePlan} />
        </ScrollPanel>
      </article>
    </Layout>
  );
};

export default PlansDetail;

export const getServerSideProps: GetServerSideProps<
  {
    onePlan: PlanDetail;
  },
  { uuid: string }
> = async ({ params }) => {
  const ssg = generateSSGHelper();
  const onePlan = await ssg.savingsPlans.getOne.fetch({
    id: params?.uuid ?? "",
  });
  return {
    props: {
      onePlan,
    },
  };
};
