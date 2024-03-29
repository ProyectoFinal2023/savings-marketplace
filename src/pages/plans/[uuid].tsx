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
import { getAuth } from "@clerk/nextjs/server";
import { type UserInfoT } from "~/types/userInfo";

const PlansDetail: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ onePlan, user }) => {
  return (
    <Layout>
      <article className="mx-auto flex w-10/12 flex-wrap justify-start gap-6 py-12">
        <ScrollPanel>
          <PlanView plan={onePlan} user={user} />
        </ScrollPanel>
      </article>
    </Layout>
  );
};

export default PlansDetail;

export const getServerSideProps: GetServerSideProps<
  {
    onePlan: PlanDetail;
    user: UserInfoT;
  },
  { uuid: string }
> = async ({ params, req }) => {
  const ssg = generateSSGHelper(req);
  const onePlan = await ssg.savingsPlans.getOne.fetch({
    id: params?.uuid ?? "",
  });
  const clerkUser = getAuth(req);
  if (!clerkUser.userId) throw Error("Not authorized.");
  const user = await ssg.users.getByClerkId.fetch({
    clerkId: clerkUser.userId,
  });
  return {
    props: {
      onePlan,
      user,
    },
  };
};
