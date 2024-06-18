import React, { useCallback, useMemo, useState } from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import cn from "classnames";

import { ReactComponent as ExpandIcon } from "../../assets/icons/ic_expand.svg";
import { MessageKey } from "../../i18n/LocaleModel";
import { Module, Submodule } from "../../models/module";
import {
  filterModulePendingCaseCountGT0,
  PendingCaseModule,
  PendingCaseSubmodule,
} from "../../models/pendingCase";
import InfoBadgeText from "../InfoBadgeText";

interface SubmoduleRowProps {
  highlightTextClass: string;
  normalTextClass: string;
  submodule: Submodule;
  submodulePendingCase?: PendingCaseSubmodule;
}

const SubmoduleRow = (props: SubmoduleRowProps): React.ReactElement => {
  const {
    highlightTextClass,
    normalTextClass,
    submodule,
    submodulePendingCase,
  } = props;

  const innerComponent = useMemo(
    () => (
      <Typography
        variant="body2"
        className={cn({
          [normalTextClass]: !submodulePendingCase?.pendingCaseCount,
          [highlightTextClass]: !!submodulePendingCase?.pendingCaseCount,
        })}
      >
        <Trans<MessageKey> i18nKey={submodule.messageKey} />{" "}
        {submodulePendingCase?.pendingCaseCount ? (
          <span>({submodulePendingCase.pendingCaseCount})</span>
        ) : null}
      </Typography>
    ),
    [
      highlightTextClass,
      normalTextClass,
      submodule.messageKey,
      submodulePendingCase,
    ]
  );

  return (
    <li className="mb-2 last:mb-0">
      {submodule.path ? (
        <Link className="no-underline" to={submodule.path}>
          {innerComponent}
        </Link>
      ) : (
        innerComponent
      )}
    </li>
  );
};

interface SubmodulesContentProps {
  highlightTextClass: string;
  normalTextClass: string;
  submodulePendingCases?: PendingCaseSubmodule[];
  submodules: Submodule[];
}

const SubmodulesContent = (
  props: SubmodulesContentProps
): React.ReactElement => {
  const {
    highlightTextClass,
    normalTextClass,
    submodulePendingCases,
    submodules,
  } = props;

  const submodulePendingCaseMap = useMemo(() => {
    return (
      submodulePendingCases?.reduce<{
        [key in string]: PendingCaseSubmodule;
      }>(
        (prev, curr) => ({
          ...prev,
          [curr.subModuleName]: curr,
        }),
        {}
      ) ?? {}
    );
  }, [submodulePendingCases]);

  return (
    <ul className="my-0 list-none pl-11">
      {submodules.map((submodule) => (
        <SubmoduleRow
          key={submodule.messageKey}
          submodule={submodule}
          submodulePendingCase={
            submodule.pendingCasesKey
              ? submodulePendingCaseMap[submodule.pendingCasesKey]
              : undefined
          }
          normalTextClass={normalTextClass}
          highlightTextClass={highlightTextClass}
        />
      ))}
    </ul>
  );
};

interface ModuleRowProps {
  highlightIconClass: string;
  highlightTextClass: string;
  module: Module;
  normalIconClass: string;
  normalTextClass: string;
  totalPendingCases: number;
}

const ModuleRow = (props: ModuleRowProps): React.ReactElement => {
  const {
    highlightIconClass,
    highlightTextClass,
    module,
    normalIconClass,
    normalTextClass,
    totalPendingCases,
  } = props;

  return (
    <>
      <div className="mr-1 h-5 w-5 shrink-0">
        {module.icon ? (
          <module.icon
            className={cn("h-5 w-5", {
              [normalIconClass]: totalPendingCases === 0,
              [highlightIconClass]: totalPendingCases !== 0,
            })}
          />
        ) : null}
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <Typography
          variant="body2"
          className={cn("font-bold", {
            [normalTextClass]: totalPendingCases === 0,
            [highlightTextClass]: totalPendingCases !== 0,
          })}
        >
          <Trans<MessageKey> i18nKey={module.messageKey} />
        </Typography>
        {totalPendingCases ? (
          <div className="inline-block">
            <InfoBadgeText>{totalPendingCases}</InfoBadgeText>
          </div>
        ) : null}
      </div>
    </>
  );
};

interface ModuleItemProps {
  highlightIconClass: string;
  highlightTextClass: string;
  module: Module;
  modulePendingCase?: PendingCaseModule;
  normalIconClass: string;
  normalTextClass: string;
}

const ModuleItem = (props: ModuleItemProps): React.ReactElement => {
  const {
    highlightIconClass,
    highlightTextClass,
    module,
    modulePendingCase,
    normalIconClass,
    normalTextClass,
  } = props;

  const hasSubmodules = module.submodules && module.submodules.length > 0;

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed((x) => !x);
  }, []);

  const totalPendingCases = useMemo(
    () =>
      modulePendingCase?.subModules
        .map((p) => p.pendingCaseCount)
        ?.reduce((prev, curr) => prev + curr, 0) ?? 0,
    [modulePendingCase]
  );

  return (
    <li className="mb-4 last:mb-0">
      <div className="mb-2 flex items-start">
        <div className="mr-1 h-4 w-4 shrink-0">
          {hasSubmodules ? (
            <Button
              type="button"
              onClick={toggleCollapse}
              className="inline-block h-4 min-w-4 p-0 align-baseline normal-case"
            >
              <ExpandIcon
                className={cn("h-4 w-4 fill-[#a8a8a8]", {
                  "-rotate-90": collapsed,
                })}
                width="16"
                height="16"
              />
            </Button>
          ) : null}
        </div>
        {module.path ? (
          <Link className="flex no-underline" to={module.path}>
            <ModuleRow
              module={module}
              totalPendingCases={totalPendingCases}
              highlightIconClass={highlightIconClass}
              highlightTextClass={highlightTextClass}
              normalIconClass={normalIconClass}
              normalTextClass={normalTextClass}
            />
          </Link>
        ) : (
          <Button
            className="items-start p-0 text-left normal-case hover:bg-white"
            disableFocusRipple={true}
            disableRipple={true}
            onClick={toggleCollapse}
          >
            <ModuleRow
              module={module}
              totalPendingCases={totalPendingCases}
              highlightIconClass={highlightIconClass}
              highlightTextClass={highlightTextClass}
              normalIconClass={normalIconClass}
              normalTextClass={normalTextClass}
            />
          </Button>
        )}
      </div>
      {module.submodules && module.submodules.length > 0 && !collapsed ? (
        <SubmodulesContent
          highlightTextClass={highlightTextClass}
          normalTextClass={normalTextClass}
          submodulePendingCases={modulePendingCase?.subModules}
          submodules={module.submodules}
        />
      ) : null}
    </li>
  );
};

interface Props {
  highlightIconClass: string;
  highlightTextClass: string;
  mainModules?: Module[];
  modulePendingCases?: PendingCaseModule[];
  normalIconClass: string;
  normalTextClass: string;
  otherModules?: Module[];
}

const ModuleSummary = (props: Props): React.ReactElement => {
  const {
    highlightIconClass,
    highlightTextClass,
    mainModules,
    modulePendingCases,
    normalIconClass,
    normalTextClass,
    otherModules,
  } = props;

  const modulePendingCaseMap = useMemo(() => {
    const validModulePendingCases = filterModulePendingCaseCountGT0(
      modulePendingCases ?? []
    );
    return validModulePendingCases.reduce<{
      [key in string]: PendingCaseModule;
    }>(
      (prev, curr) => ({
        ...prev,
        [curr.moduleName]: curr,
      }),
      {}
    );
  }, [modulePendingCases]);

  const renderModule = useCallback(
    (module: Module) => (
      <ModuleItem
        key={module.messageKey}
        module={module}
        modulePendingCase={
          module.pendingCasesKey
            ? modulePendingCaseMap[module.pendingCasesKey]
            : undefined
        }
        highlightIconClass={highlightIconClass}
        highlightTextClass={highlightTextClass}
        normalIconClass={normalIconClass}
        normalTextClass={normalTextClass}
      />
    ),
    [
      highlightIconClass,
      highlightTextClass,
      modulePendingCaseMap,
      normalIconClass,
      normalTextClass,
    ]
  );

  return (
    <div className="flex w-full">
      {mainModules && mainModules.length > 0 ? (
        <ul className="my-0 mr-4 flex-1 list-none pl-0">
          {mainModules.map(renderModule)}
        </ul>
      ) : null}
      {mainModules &&
      mainModules.length > 0 &&
      otherModules &&
      otherModules.length > 0 ? (
        <div className="w-[1px] shrink-0 bg-[#a8a8a8]"></div>
      ) : null}
      {otherModules && otherModules.length > 0 ? (
        <ul className="my-0 mr-4 flex-1 list-none pl-0">
          {otherModules.map(renderModule)}
        </ul>
      ) : null}
    </div>
  );
};

export default ModuleSummary;
