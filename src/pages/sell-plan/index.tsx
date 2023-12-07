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
import { getAuth } from "@clerk/nextjs/server";
import { type UserInfoT } from "~/types/userInfo";

type SchemaT = z.infer<typeof createPlanSchema>;

const SellPlanPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ models, paymentMethods, user }) => {
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
      moving_value: "",
      moving_value_USD: "",
      plan_months: "",
      plan_total_months: "",
      bank_info: "",
      phone_number: user?.phone ?? "",
      name: `${user?.name ?? ''} ${user?.surname ?? ''}` ?? "",
      description: "",
      paymentMethod: paymentMethods[0]?.id,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = (data: SchemaT) => {
    console.log('data', data);
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
              <div className="-mx-3 flex flex-wrap items-start">
                <div className="w-full md:w-1/2 px-3 pr-2 mb-6">
                  <InputText
                    register={register}
                    name="title"
                    placeholder="Plan Hilux G3 Imperdible"
                    label="Título"
                    errors={errors}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 pr-2 mb-2">
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
              </div>
              <div className="-mx-3 flex flex-wrap items-start">
                <div className="w-full md:w-1/2 px-3 pr-2 mb-6">
                  <InputText
                    register={register}
                    name="priceARS"
                    placeholder="Ej. 300000"
                    label="Precio de venta (ARS)"
                    keyfilter={"int"}
                    errors={errors}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 pr-2 mb-2">
                  <InputText
                    register={register}
                    name="priceUSD"
                    placeholder="Ej. 3000"
                    label="Precio de venta (USD)"
                    keyfilter={"int"}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="-mx-3 flex flex-wrap items-start">
                <div className="w-full md:w-1/2 px-3 pr-2 mb-6">
                  <InputText
                    register={register}
                    name="moving_value"
                    placeholder="Ej. 56700"
                    label="Cuota mensual actual ARS"
                    keyfilter={"int"}
                    errors={errors}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 pr-2 mb-2">
                  <InputText
                    register={register}
                    name="moving_value_USD"
                    placeholder="Ej. 500"
                    label="Cuota mensual actual USD"
                    keyfilter={"int"}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="-mx-3 flex flex-wrap items-start">
                <div className="w-full md:w-1/2 px-3 pr-2 mb-6">
                  <InputText
                    register={register}
                    name="plan_months"
                    placeholder="Ej. 5"
                    label="Meses pagados a la fecha"
                    keyfilter={"int"}
                    errors={errors}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 pr-2 mb-2">
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
              <div className="-mx-3 flex flex-wrap items-start">
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <InputText
                    register={register}
                    name="name"
                    placeholder="Ej. Jorge Perez"
                    label="Nombre"
                    keyfilter={"int"}
                    errors={errors}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2">
                  <InputText
                    register={register}
                    name="phone_number"
                    placeholder="Ej. +541123456789"
                    label="Número de teléfono"
                    keyfilter={"int"}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="-mx-3 mb-5 flex flex-wrap items-start">
                <div className="w-full px-3">
                  <InputText
                    register={register}
                    name="bank_info"
                    placeholder="Ej. 02205556666777788889999"
                    label="CBU"
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
  user: UserInfoT;
}> = async (ctx) => {
  const ssg = generateSSGHelper(ctx.req);
  const clerkUser = getAuth(ctx.req);
  if (!clerkUser.userId) throw Error("Not authorized.");

  const models = await ssg.carModels.getAll.fetch();
  const paymentMethods = await ssg.admin.getPaymentMethods.fetch();
  const user = await ssg.users.getByClerkId.fetch({ clerkId: clerkUser.userId });
  return {
    props: {
      user,
      models,
      paymentMethods,
    },
  };
};
