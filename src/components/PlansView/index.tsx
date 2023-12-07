import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { type DropdownOptionT, usePlansList } from "~/hooks/usePlansList";
import { type PlanList, type SearchParams } from "~/types/plans";

type PlansViewProps = {
  search: SearchParams;
  total: number;
  plans: PlanList;
};

export const PlansView = ({ search, total, plans }: PlansViewProps) => {
  const {
    setPlanView,
    planView,
    onSubmit,
    onPageChange,
    dropdownOptions,
    form: { register },
  } = usePlansList(search);
  return (
    <article className="mx-auto h-full w-10/12">
      <header className="flex flex-wrap gap-4 py-5">
        <form onSubmit={onSubmit}>
          <div className="flex flex-wrap">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-search" />
              </span>
              <InputText placeholder="Buscar" {...register("title")} />
            </div>
          </div>
        </form>
        <Dropdown
          options={dropdownOptions}
          onChange={(e) => setPlanView(e.value as DropdownOptionT)}
          value={planView}
          optionLabel="text"
          placeholder="Modo de vista"
        />
      </header>
      <section className=" lg:flex lg:flex-wrap justify-start gap-6">
        {planView.renderPlans(plans)}
      </section>
      <Paginator
        className="mx-auto mt-6 w-fit"
        first={(search.page - 1) * search.size}
        rows={search.size}
        totalRecords={total}
        onPageChange={onPageChange}
      />
    </article>
  );
};
