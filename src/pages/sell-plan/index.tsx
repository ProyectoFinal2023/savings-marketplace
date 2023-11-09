import { zodResolver } from "@hookform/resolvers/zod";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Layout } from "~/components/Layout/Layout";
import { InputFile } from "~/components/form/InputFile";
import { InputText } from "~/components/form/InputText";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { type RouterOutputs } from "~/utils/api";

const schema = z.object({
  title: z.string(),
  carModel: z.string(),
  photos: z.string().array(),
  prices: z.array(z.object({ currency: z.string(), value: z.number() })),
});

type SchemaT = z.infer<typeof schema>;

const SellPlanPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ models }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<SchemaT>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Layout classname="">
      <div className="px-8 py-4">
        <form onSubmit={void handleSubmit(onSubmit)}>
          <Card
            title="Publicar una Venta de Plan"
            className="mx-auto max-w-3xl"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-around gap-4">
                <InputText
                  register={register}
                  name="title"
                  placeholder="Plan Hilux G3 Imperdible"
                  label="Título"
                  errors={errors}
                />
                <Controller
                  name="carModel"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Dropdown
                      placeholder="Modelo"
                      options={models}
                      optionLabel="description"
                      optionValue="id"
                      value={value}
                      className="basis-1/2"
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <InputFile />
              <Button
                type="submit"
                severity="success"
                className="ml-auto w-fit"
              >
                Publicar
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </Layout>
  );
};

export default SellPlanPage;

export const getServerSideProps: GetServerSideProps<{
  models: RouterOutputs["carModels"]["getAll"];
}> = async (ctx) => {
  const ssg = generateSSGHelper();

  const models = await ssg.carModels.getAll.fetch();

  return {
    props: {
      models,
    },
  };
};
