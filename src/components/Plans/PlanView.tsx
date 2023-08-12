import React from "react";
import { CarPhoto as CarPhotoModel } from "@prisma/client";

import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { Fieldset } from "primereact/fieldset";

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
          />
        </div>
        {/* TODO - Responsivness */}
        <div className="my-4 px-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-rows-1">
              <span className="font-bold">Características</span>
              <table className="table-fixed rounded border-2 border-solid border-[#ededed] text-[14px]">
                <tbody>
                  <tr className="bg-[#0000000a]">
                    <th className="px-6 py-4">Cantidad de Puertas</th>
                    <td className="px-6 py-4">{plan.carModel.amountDoors}</td>
                  </tr>
                  <tr className="bg-[#fff]">
                    <th className="px-6 py-4">Cantidad de Puertas</th>
                    <td className="px-6 py-4">{plan.carModel.amountDoors}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid grid-rows-1">
              <span className="font-bold">Especificaciones</span>
              <table className="table-fixed rounded border-2 border-solid border-[#ededed] text-[14px]">
                <tbody>
                  <tr className="bg-[#0000000a]">
                    <th className="px-6 py-4">Cantidad de Puertas</th>
                    <td className="px-6 py-4">{plan.carModel.amountDoors}</td>
                  </tr>
                  <tr className="bg-[#fff]">
                    <th className="px-6 py-4">Cantidad de Puertas</th>
                    <td className="px-6 py-4">{plan.carModel.amountDoors}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="grid py-4 text-justify">
        <Fieldset legend={legendTemplate}>{plan.description}</Fieldset>
      </div>
    </Card>
  );
};

export default PlanView;
