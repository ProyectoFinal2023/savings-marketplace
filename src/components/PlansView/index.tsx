import Image from "next/image";
import { useRouter } from "next/router";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Paginator, type PaginatorPageChangeEvent } from "primereact/paginator";
import { DefaultCar } from "public";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type PlanList, type SearchParams } from "~/types/plans";
import { routePaths } from "~/utils/routes";
import { z } from "zod";
import { useState } from "react";

type PlansViewProps = {
  search: SearchParams;
  total: number;
  plans: PlanList;
};

type SearchForm = { title: string };

export const PlansView = ({ search, total, plans }: PlansViewProps) => {
  const { push } = useRouter();
  const { register, handleSubmit } = useForm<SearchForm>({
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

  const onSubmit = void handleSubmit(onSearch);

  const [pageLoading, setPageLoading] = useState(false);

  return (
    <article className="mx-auto h-full w-10/12">
      <header className="py-5">
        <form onSubmit={onSubmit}>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder="Search" {...register("title")} />
          </span>
        </form>
      </header>
      <section className=" flex flex-wrap justify-start gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            title={plan.title}
            subTitle={plan.description}
            header={
              <Image
                alt={`${plan.title} example image`}
                src={plan.carModel?.carPhotos[0]?.url || DefaultCar}
                width={380}
                height={256}
                className=" h-64 object-cover"
                onClick={() => {
                  setPageLoading(true);
                  if (!pageLoading)
                    void push(
                    routePaths.planDetail({
                      id: plan.id,
                    })
                )}}
              />
            }
            className="shrink-0 basis-1/3-gap-6 cursor-pointer"
          />
        ))}
      </section>
      <Paginator
        className="mx-auto mt-6 w-fit"
        first={search.page + 1}
        rows={search.size}
        totalRecords={total}
        onPageChange={onPageChange}
      />
    </article>
  );
};
