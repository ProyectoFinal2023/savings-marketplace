import { type RegisterSchemaT } from "~/schemas/registerSchema";
import { type UseFieldArrayReturn, type UseFormReturn } from "react-hook-form";
import { type RouterOutputs } from "~/utils/api";

export type RegisterT = UseFormReturn<RegisterSchemaT>["register"];
export type ErrorsT = UseFormReturn<RegisterSchemaT>["formState"]["errors"];
export type GuarantorT = UseFieldArrayReturn<
  RegisterSchemaT,
  "guarantors",
  "id"
>;

export type UserInfoT = RouterOutputs["users"]["getByClerkId"];
