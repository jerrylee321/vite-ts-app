import { z } from "zod";

export enum RejectType {
  redo = "sendRedo",
  abandon = "reject",
}

export const RejectTypeSchema = z.nativeEnum(RejectType);

export const NO_REJECT_TYPES: RejectType[] = [];
