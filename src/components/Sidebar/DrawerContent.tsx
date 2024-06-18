import React, { ReactElement } from "react";
import cn from "classnames";

interface DrawerContentProps {
  className?: string;
  isOpen: boolean;
}

const DrawerContent = (
  props: React.PropsWithChildren<DrawerContentProps>
): ReactElement => {
  const { isOpen, className, children } = props;
  return (
    <div
      className={cn(
        "flex flex-col overflow-y-auto overflow-x-hidden pb-3",
        {
          "whitespace-pre-wrap": isOpen,
          "whitespace-nowrap": !isOpen,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default DrawerContent;
