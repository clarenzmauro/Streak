import {
  protectedProcedure, publicProcedure,
  router,
} from "../lib/trpc";
import { z } from "zod";
import { db } from "../lib/db";

const createGoalSchema = z.object({
  title: z.string().min(1, "Goal title is required").max(200, "Goal title too long"),
  description: z.string().optional(),
  frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY"]),
});

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  

  createGoal: protectedProcedure
    .input(createGoalSchema)
    .mutation(async ({ ctx, input }) => {
      const goal = await db.goal.create({
        data: {
          title: input.title,
          description: input.description,
          frequency: input.frequency,
          userId: ctx.session.user.id,
        },
      });
      return goal;
    }),
    
  getUserGoals: protectedProcedure
    .query(async ({ ctx }) => {
      const goals = await db.goal.findMany({
        where: {
          userId: ctx.session.user.id,
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return goals;
    }),
});
export type AppRouter = typeof appRouter;
