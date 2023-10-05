import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/router";
import { Card } from "primereact/card";
import { type PaginatorPageChangeEvent } from "primereact/paginator";
import { DefaultCar } from "public";
import React, { PropsWithChildren, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { type SearchParams, type PlanList } from "~/types/plans";
import { routePaths } from "~/utils/routes";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export type DropdownOptionT = {
  text: string;
  renderPlans: (plan: PlanList) => React.ReactNode;
};

export const usePlansList = (search: SearchParams) => {
  const { push } = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  const dropdownOptions: DropdownOptionT[] = [
    {
      text: "Vista Previa",
      renderPlans: (plans) =>
        plans.map((plan) => (
          <Card
            key={plan.id}
            title={plan.title}
            subTitle={plan.description}
            header={
              <button
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
                  className=" h-64 object-cover"
                />
              </button>
            }
            className=" shrink-0 basis-1/3-gap-6"
          />
        )),
    },
    {
      text: "Vista de Lista",
      renderPlans: (plans) => <div></div>,
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
  };
};
