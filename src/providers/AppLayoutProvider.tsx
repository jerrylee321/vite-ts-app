import React, {
  PropsWithChildren,
  ReactElement,
  useContext,
  useMemo,
  useRef,
} from "react";

interface AppLayoutContextValue {
  layoutRef: React.MutableRefObject<HTMLDivElement | null>;
}

const AppLayoutContext = React.createContext<AppLayoutContextValue>(
  null as any
);

const AppLayoutProvider = ({ children }: PropsWithChildren): ReactElement => {
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const contextValue = useMemo((): AppLayoutContextValue => {
    return {
      layoutRef: layoutRef,
    };
  }, []);

  return (
    <AppLayoutContext.Provider value={contextValue}>
      {children}
    </AppLayoutContext.Provider>
  );
};

export default AppLayoutProvider;

export function useAppLayout(): AppLayoutContextValue {
  return useContext(AppLayoutContext);
}
