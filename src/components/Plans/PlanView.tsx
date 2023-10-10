import React from "react";
import type { CarPhoto as CarPhotoModel, Prisma } from "@prisma/client";

import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { Fieldset } from "primereact/fieldset";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

import { PlanDetail } from "~/types/plans";
import CarPhoto from "~/components/Cars/CarPhoto";
import { DefaultCar } from "public";

type Props = {
  plan: PlanDetail;
};

const PlanView = ({ plan }: Props) => {
  const carPhotos = plan.carModel?.carPhotos?.length
    ? plan.carModel?.carPhotos
    : [{ url: DefaultCar }];
  // const carPhotos = Array(5).fill(plan.carModel?.carPhotos[0]);

  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item: CarPhotoModel) => {
    return (
      <CarPhoto
        photo={item}
        className="h-128 object-fill"
        width={700}
        height={700}
      />
    );
  };

  const thumbnailTemplate = (item: CarPhotoModel) => {
    return (
      <img
        src={item.url}
        alt={item.epigraph ?? ""}
        width={72}
        height={72}
        style={{ display: "block" }}
      />
    );
  };

  const legendTemplate = (
    <div className="align-items-center flex text-primary">
      <span className="pi pi-car mr-2" style={{ fontSize: "1.5rem" }}></span>
      <span className="text-2xl font-bold">Descripción</span>
    </div>
  );

  function handleClickPlan(event: React.MouseEvent<HTMLButtonElement>) {
    console.log('Click submit burtton');
  }

  const currencyFormat = (cash: number) => (
    String(new Intl.NumberFormat('en-AR', {
      style: 'currency',
      currency: 'USD',
    }).format(cash)).split('').slice(0, -3).join('')
  )

  console.log('asda', plan.carModel);

  return (
    <Card
      pt={{
        body: { className: "shadow" },
      }}
    // header={<h3 className="text-3xl text-center font-sans italic">AUTO</h3>}
    >
      <div className="grid grid-cols-2 justify-center gap-4">
        <div className="p-d-flex p-jc-center p-mt-5">
          <Galleria
            value={carPhotos}
            responsiveOptions={responsiveOptions}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
            thumbnailsPosition="left"
            numVisible={4}
            className="bg-black"
          />
        </div>
        {/* TODO - Responsivness */}
        <div className="my-4 px-4">
          <div className="grid">
            <span className="text-2xl font-bold">
              {plan.carModel.description}
            </span>
            <Divider type="solid" style={{ borderWidth: "1px" }} />
            <div className="text-black row">
              <p className="text-3xl">{currencyFormat(plan.movingValue)}
              </p>
              <p className="mt-2">{plan.plan_total_months} cuotas de {currencyFormat(plan.movingValue / plan.plan_total_months)}</p>
            </div>
            <Button
              severity="info"
              size="large"
              raised
              style={{ marginTop: "2rem", justifyContent: "center" }}
              onClick={handleClickPlan}
            >
              Solicitar Plan
            </Button>
          </div>
        </div>
      </div>
      <div className="grid py-4 text-justify">
        <Fieldset legend={legendTemplate}>{plan.description}</Fieldset>
      </div>
      <section id="vehicle-carachteristics" className="contents">
        <div className="block">
          <div className="col-start-1 col-span-12 mb-2">
            <span className="text-md md:text-2xl">Características del vehículo</span>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {Object.entries(plan.carModel.carAttributes as Prisma.JsonObject).map(([tableName, attributes]) => (
              <div className="col-auto w-full md:w-max" key={tableName}>
                <span className="font-bold">{tableName}</span>
                <table className="table-auto rounded border-2 border-solid border-[#ededed] text-[14px] mt-2">
                  <tbody>
                    {attributes && Object.entries(attributes)?.map(([attrName, attr], index) => (
                      <tr className={index % 2 !== 0 ? "bg-[#0000000a]" : "bg-[#fff]"} key={attrName}>
                        <th className="px-6 py-4 text-left">{attrName}</th>
                        <td className="px-6 py-4 text-left">{attr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Card>
  );
};

export default PlanView;
