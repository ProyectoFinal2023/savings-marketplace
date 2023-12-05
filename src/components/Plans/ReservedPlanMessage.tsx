import React from "react";

export type ContactInfoT = {
  name: string;
  email: string;
  phone_number: string;
  bank_info: string;
};

type Props = {
  contactInfo: ContactInfoT;
};

const ReservedPlanMessage = ({ contactInfo }: Props) => {
  return (
    <>
      <p>
        Su plan ha sido reservado con éxito. Para continuar, debe ponerse en
        contacto con el comprador.
      </p>
      {contactInfo && (
        <div className="mt-3 flex flex-col">
          <div className="flex flex-row">
            <div className="w-1/3">
              <span>Nombre:</span>
            </div>
            <div className="w-1/3">
              <span>{contactInfo["name"]}</span>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/3">
              <span>Email de contacto:</span>
            </div>
            <div className="w-1/3">
              <span>{contactInfo["email"]}</span>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/3">
              <span>Teléfono de contacto:</span>
            </div>
            <div className="w-1/3">
              <span>{contactInfo["phone_number"]}</span>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/3">
              <span>CBU/CVU:</span>
            </div>
            <div className="w-1/3">
              <span>{contactInfo["bank_info"]}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservedPlanMessage;
