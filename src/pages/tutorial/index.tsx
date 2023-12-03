import { getAuth } from "@clerk/nextjs/server";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { Layout } from "~/components/Layout/Layout";
import { UserProfile } from "~/components/UserProfile";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { type UserInfoT } from "~/types/userInfo";

const TutorialPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <Layout classname="px-12">
      <UserProfile {...props} />
    </Layout>
  );
};

export default TutorialPage;

export const getServerSideProps: GetServerSideProps<{
  user: UserInfoT;
  clerkId: string;
}> = async (ctx) => {
  const clerkUser = getAuth(ctx.req);
  if (!clerkUser.userId) throw Error("Not authorized.");
  const ssg = generateSSGHelper(ctx.req);
  const user = await ssg.users.getByClerkId.fetch({
    clerkId: clerkUser.userId,
  });
  return {
    props: { user, clerkId: clerkUser.userId },
  };
};
