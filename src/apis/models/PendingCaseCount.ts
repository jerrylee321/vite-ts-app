import { z } from "zod";

const SubmodulePendingCaseCountSchema = z.object({
  submoduleCode: z.string(),
  submoduleName: z.string(),
  pendingCaseCnt: z.number(),
});

const ArrayModulePendingCaseCountSchema = z.object({
  moduleCode: z.string(),
  moduleName: z.string(),
  pendingCaseCnt: z.number(),
  submodules: z.array(SubmodulePendingCaseCountSchema),
});

const ObjectModulePendingCaseCountSchema = z.object({
  moduleCode: z.string(),
  moduleName: z.string(),
  pendingCaseCnt: z.number(),
  submodules: SubmodulePendingCaseCountSchema.transform((it) => [it]),
});

export const ModulePendingCaseCountSchema = z.union([
  ArrayModulePendingCaseCountSchema,
  ObjectModulePendingCaseCountSchema,
]);

export type ModulePendingCaseCount = z.infer<
  typeof ModulePendingCaseCountSchema
>;
