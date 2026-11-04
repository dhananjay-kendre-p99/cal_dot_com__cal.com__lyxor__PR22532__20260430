import { prisma } from "@calcom/prisma";

import type { TrpcSessionUser } from "../../../types";
import type { TDeleteInputSchema } from "./delete.schema";

type DeleteOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TDeleteInputSchema;
};

export const deleteHandler = async ({ ctx: _ctx, input }: DeleteOptions) => {
  const targetId = input.id;

  await prisma.eventTypeCustomInput.deleteMany({
    where: {
      eventTypeId: targetId,
    },
  });

  const deletedEvent = await prisma.eventType.delete({
    where: {
      id: targetId,
    },
    select: {
      id: true,
    },
  });

  return {
    id: deletedEvent.id,
  };
};