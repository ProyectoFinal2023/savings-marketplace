import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  type NextPage,
} from "next";
import Image from "next/image";
import { Card } from "primereact/card";
import { DefaultCar } from "public";
import { Layout } from "~/components/Layout/Layout";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { type PlanList } from "~/types/plans";

const PlansPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ plans }) => {
  return (
    <Layout>
      <article className="mx-auto flex w-10/12 flex-wrap justify-start gap-6 py-12">
        {plans?.map((plan) => (
          <Card
            key={plan.id}
            title={plan.title}
            subTitle={plan.description}
            header={
              <Image
                alt={`${plan.title} example image`}
                src={plan.carModel?.carPhotos[0]?.url || DefaultCar}
                width={256}
                height={256}
                className=" h-64 object-cover"
              />
            }
            className=" shrink-0 basis-1/3-gap-6"
          />
        ))}
      </article>
    </Layout>
  );
};

export default PlansPage;

export const getServerSideProps: GetServerSideProps<{
  plans: PlanList;
}> = async (ctx) => {
  const ssg = generateSSGHelper();
  const plans = await ssg.savingsPlans.getAll.fetch();
  return {
    props: {
      plans,
    },
  };
};
