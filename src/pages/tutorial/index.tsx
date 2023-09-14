import { type NextPage } from "next";
import { Layout } from "~/components/Layout/Layout";
import { UserProfile } from "~/components/UserProfile";

const TutorialPage: NextPage = () => {
  return (
    <Layout classname="px-12">
      <UserProfile />
    </Layout>
  );
};

export default TutorialPage;
