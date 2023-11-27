import { zodResolver } from "@hookform/resolvers/zod";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Controller, useForm } from "react-hook-form";
import { type z } from "zod";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Layout } from "~/components/Layout/Layout";
import { InputFile } from "~/components/form/InputFile";
import { InputText } from "~/components/form/InputText";
import { InputTextArea } from "~/components/form/InputTextArea";
import { createPlanSchema } from "~/schemas/postPlanSchema";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { api, type RouterOutputs } from "~/utils/api";
import { toast } from "react-toastify";

type SchemaT = z.infer<typeof createPlanSchema>;

const SellPlanPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ models, paymentMethods }) => {
  const { push } = useRouter();
  const { mutate: postPlan } = api.savingsPlans.postPlan.useMutation({
    onSuccess: () => {
      void push("/plans").then(() =>
        toast.success("Publicación creada con éxito")
      );
    },
    onError: () => {
      toast.error("Algo salió mal. Inténtalo más tarde.");
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<SchemaT>({
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      title: "",
      carModel: "",
      photos: [],
      priceARS: "",
      priceUSD: "",
      plan_months: "",
      plan_total_months: "",
      moving_value: "",
      description: "",
      paymentMethod: paymentMethods[0]?.id,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = (data: SchemaT) => {
    postPlan(data);
  };
  return (
    <Layout classname="">
      <div className="px-8 py-4">
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <Card
            title="Publicar una Venta de Plan"
            className="mx-auto max-w-3xl"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-around gap-4">
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
                  render={({ field: { value, onChange, name } }) => (
                    <div className="row-span-4 flex w-full flex-col items-stretch gap-2">
                      <label htmlFor={name}>
                        {"Modelo de Auto"}
                        <span className="text-red-500">{" *"}</span>
                      </label>
                      <Dropdown
                        placeholder="Modelo"
                        options={models}
                        optionLabel="description"
                        optionValue="id"
                        value={value}
                        className="basis-1/2"
                        onChange={onChange}
                      />
                      <ErrorMessage errors={errors} name={name} />
                    </div>
                  )}
                />
              </div>
              <div className="flex items-start gap-4">
                <InputText
                  register={register}
                  name="priceARS"
                  placeholder="Ej. 300000"
                  label="Precio (ARS)"
                  keyfilter={"int"}
                  errors={errors}
                />
                <InputText
                  register={register}
                  name="priceUSD"
                  placeholder="Ej. 3000"
                  label="Precio (USD)"
                  keyfilter={"int"}
                  errors={errors}
                />
              </div>
              <div className="flex flex-wrap items-start -mx-3">
                <div className="w-1/2 px-3 pr-2">
                  <InputText
                    register={register}
                    name="moving_value"
                    placeholder="Ej. 56700"
                    label="Cuota mensual actual"
                    keyfilter={"int"}
                    errors={errors}
                  />
                </div>
                <div className="w-1/2 px-3">
                <InputText
                  register={register}
                  name="plan_months"
                  placeholder="Ej. 5"
                  label="Meses pagados a la fecha"
                  keyfilter={"int"}
                  errors={errors}
                />
                </div>
              </div>
              <div className="flex flex-wrap items-start -mx-3 mb-5">
                <div className="w-full px-3">
                <InputText
                  register={register}
                  name="plan_total_months"
                  placeholder="Ej. 84"
                  label="Meses totales"
                  keyfilter={"int"}
                  errors={errors}
                />
                </div>
              </div>
              <InputFile />
              <InputTextArea
                register={register}
                name="description"
                placeholder="Acá podés describir tu plan"
                label="Descripción"
                errors={errors}
              />
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
  paymentMethods: RouterOutputs["admin"]["getPaymentMethods"];
}> = async (ctx) => {
  const ssg = generateSSGHelper();

  const models = await ssg.carModels.getAll.fetch();
  const paymentMethods = await ssg.admin.getPaymentMethods.fetch();
  return {
    props: {
      models,
      paymentMethods,
    },
  };
};
