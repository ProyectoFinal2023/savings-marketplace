import { createTRPCRouter } from "~/server/api/trpc";
import { carsRouter } from "./routers/cars";
import { carModelsRouter } from "./routers/carModels";
import { savingsPlansRouter } from "./routers/savingsPlans";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cars: carsRouter,
  carModels: carModelsRouter,
  savingsPlans: savingsPlansRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
