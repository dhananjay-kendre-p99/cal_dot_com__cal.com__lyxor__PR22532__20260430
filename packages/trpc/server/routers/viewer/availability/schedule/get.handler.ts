import { ScheduleRepository } from "@calcom/lib/server/repository/schedule";

import type { TrpcSessionUser } from "../../../../types";
import type { TGetInputSchema } from "./get.schema";

type GetOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TGetInputSchema;
};

export const getHandler = async ({ ctx, input }: GetOptions) => {
  const { scheduleId, isManagedEventType } = input;
  const { user } = ctx;

  const schedule = await ScheduleRepository.findDetailedScheduleById({
    scheduleId,
    isManagedEventType,
    userId: user.id,
    timeZone: user.timeZone,
    defaultScheduleId: user.defaultScheduleId,
  });

  return schedule;
};