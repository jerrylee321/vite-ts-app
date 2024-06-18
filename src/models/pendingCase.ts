import { ModulePendingCaseCount as APIModulePendingCaseCount } from "../apis/models/PendingCaseCount";

export interface PendingCaseSubmodule {
  subModuleName: string;
  pendingCaseCount: number;
}

export interface PendingCaseModule {
  moduleName: string;
  subModules: PendingCaseSubmodule[];
}

function isPendingCaseCountGT0(submodule: PendingCaseSubmodule): boolean {
  return submodule.pendingCaseCount > 0;
}

export function filterModulePendingCaseCountGT0(
  modules: PendingCaseModule[]
): PendingCaseModule[] {
  const res: PendingCaseModule[] = [];

  for (const module of modules) {
    const filteredSubmodules = module.subModules.filter(isPendingCaseCountGT0);
    if (filteredSubmodules.length > 0) {
      res.push({
        ...module,
        subModules: filteredSubmodules,
      });
    }
  }
  return res;
}

export function fromAPIModulePendingCase(
  modules: APIModulePendingCaseCount[]
): PendingCaseModule[] {
  return modules.map((module) => ({
    moduleName: module.moduleCode,
    subModules: module.submodules.map((submodule) => ({
      subModuleName: submodule.submoduleCode,
      pendingCaseCount: submodule.pendingCaseCnt,
    })),
  }));
}
