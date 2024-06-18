import React, { ReactElement } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";

const root = document.getElementById("root");
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: root,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: root,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: root,
      },
    },
  },
});

const cache = createCache({
  key: "css",
  prepend: true,
});

const MuiProvider = (props: React.PropsWithChildren): ReactElement => {
  const { children } = props;

  return (
    <CacheProvider value={cache}>
      <StyledEngineProvider injectFirst={true}>
        <ThemeProvider theme={theme}>
          <CssBaseline>{children}</CssBaseline>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
};

export default MuiProvider;
