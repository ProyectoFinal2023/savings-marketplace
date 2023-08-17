import { type RouterOutputs } from "~/utils/api";

export type PlanList =
  RouterOutputs["savingsPlans"]["getSavingsPlans"]["plans"];

export type SearchParams = {
  title: string;
  page: number;
  size: number;
};
