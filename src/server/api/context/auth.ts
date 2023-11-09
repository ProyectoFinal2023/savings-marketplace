import { getAuth, type SignedInAuthObject, type SignedOutAuthObject } from '@clerk/nextjs/server';
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

export interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

export const createAuthContext = (_opts: CreateNextContextOptions) => {
  return getAuth(_opts.req);
};
