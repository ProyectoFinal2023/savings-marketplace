import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/router";
import { Card } from "primereact/card";
import { type PaginatorPageChangeEvent } from "primereact/paginator";
import { DefaultCar } from "public";
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { type SearchParams, type PlanList } from "~/types/plans";
import { routePaths } from "~/utils/routes";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { api } from "~/utils/api";
import { formatARS, formatUSD } from "~/utils/strings";

export type DropdownOptionT = {
  text: string;
  renderPlans: (plan: PlanList) => React.ReactNode;
};

export const usePlansList = (search: SearchParams) => {
  const { push } = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const { data: carModels } = api.carModels.getAll.useQuery();

  const imageTemplate = (plan: PlanList[0]) => (
    <Image
      src={plan?.carModel?.carPhotos[0]?.url || DefaultCar}
      alt={`Image of ${plan.carModel.description}`}
      width={64}
      height={64}
      className=" rounded-md"
    />
  );
  const planPaymentTemplate = (plan: PlanList[0]) => {
    return <span className="">{formatARS(plan.sellingPrice)}</span>;
  };
  const planPaymentTemplateUSD = (plan: PlanList[0]) => {
    return <span className="">{formatUSD(plan.sellingPriceUSD)}</span>;
  };

  const monthlyPaymentTemplate = (plan: PlanList[0]) => {
    const dollarString = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });
    return <span className="">{dollarString.format(plan.movingValue)}</span>;
  };

  const monthlyPaymentTemplateUSD = (plan: PlanList[0]) => {
    const dollarString = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
    return (
      <span className="">{`USD ${dollarString.format(
        plan.movingValueUSD
      )}`}</span>
    );
  };
  const dropdownOptions: DropdownOptionT[] = [
    {
      text: "Vista Previa",
      renderPlans: (plans) =>
        plans.map((plan) => (
          <Card
            key={plan.id}
            title={plan.title}
            subTitle={
              plan.description.substring(0, 31) +
              (plan.description.length > 31 ? "..." : "")
            }
            header={
              <button
                className="w-full"
                onClick={() => {
                  setPageLoading(true);
                  if (!pageLoading)
                    void push(
                      routePaths.planDetail({
                        id: plan.id,
                      })
                    );
                }}
              >
                <Image
                  alt={`${plan.title} example image`}
                  src={plan.carModel?.carPhotos[0]?.url || DefaultCar}
                  width={380}
                  height={256}
                  className=" h-64 object-cover !rounded-t-lg"
                />
              </button>
            }
            className=" shrink-0 basis-1/3-gap-6"
          />
        )),
    },
    {
      text: "Vista de Lista",
      renderPlans: (plans) => (
        // plans[0]?.carModel.description
        <DataTable
          stripedRows
          value={plans}
          // removableSort
          rowClassName={() =>
            "cursor-pointer hover:!bg-dark/10 !transition-all !duration-200"
          }
          isDataSelectable={() => true}
          onRowClick={(row) => {
            const plan = row.data as PlanList[0];
            void push(routePaths.planDetail({ id: plan.id }));
          }}
          tableStyle={{ minWidth: "60rem", width: "100%" }}
          className="w-full"
        >
          <Column field="title" header="Titulo" sortable></Column>
          <Column
            field="carModel.description"
            header="Modelo"
            sortable
          ></Column>
          <Column header="Image" body={imageTemplate}></Column>
          <Column header="Precio de venta" body={planPaymentTemplate}></Column>
          <Column header="Precio en dólares" body={planPaymentTemplateUSD}></Column>
          <Column header="Cuota Mensual" body={monthlyPaymentTemplate}></Column>
          <Column header="Cuota en dólares" body={monthlyPaymentTemplateUSD}></Column>
          <Column
            body={(plan: PlanList[0]) => plan.plan_total_months - plan.plan_months}
            header="Meses pendientes"
          ></Column>
          <Column
            field="plan_total_months"
            header="Meses Totales"
            sortable
          ></Column>
          {/* <Column header="Status" body={statusBodyTemplate}></Column> */}
        </DataTable>
      ),
    },
  ];
  const [planView, setPlanView] = useState<DropdownOptionT>(
    dropdownOptions[0] as DropdownOptionT
  );

  type SearchForm = { title: string };
  const form = useForm<SearchForm>({
    resolver: zodResolver(z.object({ title: z.string() })),
    defaultValues: {
      title: search.title,
    },
  });

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    void push(
      routePaths.plans({
        search: search.title,
        page: event.page + 1,
        size: event.rows,
      })
    );
  };

  const onSearch: SubmitHandler<{ title: string }> = async (data) => {
    await push(
      routePaths.plans({
        search: data.title,
      })
    );
  };

  const onSubmit = void form.handleSubmit(onSearch);

  return {
    dropdownOptions,
    form,
    onSubmit,
    onPageChange,
    planView,
    setPlanView,
    carModels,
  };
};
