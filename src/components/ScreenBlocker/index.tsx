import React, { useLayoutEffect } from "react";

export interface useCanAccessReturnValue {
  isAccessible: boolean;
  isLoading: boolean;
}

export interface Props {
  useCanAccess: () => useCanAccessReturnValue;
  otherwise: () => React.ReactElement;
  loadingComponent?: () => React.ReactElement;
}

const DefaultLoadingComponent = (): React.ReactElement => <></>;

export const ScreenBlocker = (
  props: React.PropsWithChildren<Props>
): React.ReactElement => {
  const {
    useCanAccess,
    otherwise,
    loadingComponent = DefaultLoadingComponent,
  } = props;

  const { isAccessible, isLoading } = useCanAccess();

  useLayoutEffect(() => {
    if (isLoading || isAccessible) {
      return;
    }

    console.warn("Screen component blocked because user has no access.");
  }, [isAccessible, isLoading]);

  if (isLoading) {
    return loadingComponent();
  }

  if (isAccessible) {
    return <>{props.children}</>;
  }
  return otherwise();
};

export function withScreenBlocker<WrappedProps extends object>(
  props: Props
): (
  WrappedComponent: React.ComponentType<WrappedProps>
) => React.ComponentType<WrappedProps> {
  return (
    WrappedComponent: React.ComponentType<WrappedProps>
  ): React.ComponentType<WrappedProps> => {
    const Wrapped = (wrappedProps: WrappedProps): React.ReactElement => {
      return (
        <ScreenBlocker
          otherwise={props.otherwise}
          useCanAccess={props.useCanAccess}
        >
          <WrappedComponent {...wrappedProps} />
        </ScreenBlocker>
      );
    };

    return Wrapped;
  };
}
