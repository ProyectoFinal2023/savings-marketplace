import { type RouterOutputs } from "~/utils/api";

export type PlanList = RouterOutputs["savingsPlans"]["getAll"];
export type PlanDetail = RouterOutputs["savingsPlans"]["getOne"];
