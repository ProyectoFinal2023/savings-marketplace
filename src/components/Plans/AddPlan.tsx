import React from "react";
import type { PlanDetail } from "~/types/plans";

type Props = {
  plan: PlanDetail;
};

const AddPlan = ({ plan }: Props) => {

  return (
    <div>
      {plan.paymentMethod.description}
    </div>
  );
};

export default AddPlan;
