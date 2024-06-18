/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    spacing: () => {
      const spacing = {};
      for (let i = 0; i <= 300; i += 0.5) {
        spacing[i] = `${i * 0.25}rem`;
      }
      return spacing;
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    extend: {
      // Reference: CherryPick codebase [https://github.com/oursky/empf-cherrypicks-mpfa/blob/b0967d8ea496a94a2204cda1fc68c98f1ede070e/src/theme.ts#L22]
      minHeight: (theme) => theme("spacing"),
      minWidth: (theme) => theme("spacing"),
      maxHeight: (theme) => theme("spacing"),
      maxWidth: (theme) => theme("spacing"),
      boxShadow: {
        general: "0 .125rem .25rem rgba(0,0,0,.075)",
        "collapse-button": "0px 2px 10px #BFBEBE96",
        drawer: "0px 2px 10px #BFBEBE96",
        left: "-2px 0px .1rem #BFBEBE96 ",
        right: "2px 0px .1rem #BFBEBE96",
        authBox: "3px 4px 3px 1px rgb(0 0 0 / 8%)",
      },
      width: {
        drawer: 270,
        drawerItem: 222,
      },
      transitionTimingFunction: {
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      transitionDuration: {
        "entering-screen": "225ms",
        "leaving-screen": "195ms",
      },
      gap: {
        section: "2rem",
      },
      margin: {
        actionBar: "6rem",
      },
      colors: {
        common: {
          white: "#FFFFFF",
          black: "#000000",
        },
        theme: {
          main: "#EF841F",
          contrastText: "#FFFFFF",
        },
        primary: {
          main: "#EF841F",
          light: "#EF9F1F",
          dark: "#B4683A",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#2D9FC3",
          contrastText: "#FFFFFF",
        },
        error: {
          main: "#DF6C68",
          light: "#F6354A",
          lightSecondary: "#F7CECD",
          contrastText: "#FFFFFF",
        },
        success: {
          main: "#2FCC71",
          contrastText: "#FFFFFF",
        },
        warning: {
          main: "#ed6c02",
          light: "#FF9800",
          dark: "#E65100",
          contrastText: "#FFFFFF",
        },
        info: {
          main: "#0288D1",
          light: "#03A9F4",
          dark: "#01579B",
        },
        background: {
          default: "#F5F5F5",
          box: "#eaebeb",
          contrastText: "#FFFFFF",
        },
        auth: {
          default: "#eaebeb",
          contrastText: "#3D4F76",
          dark: "#ffffff",
          action: {
            main: "#E67E23",
            contrastText: "#FFFFFF",
          },
          otp: {
            input: "#E67E23",
          },
        },
        gray: {
          light: "#F4F4F4",
          main: "#BCBCBC",
          dark: "#727272",
        },
        metalicBlue: {
          main: "#3D4F76",
        },
        spanishGray: {
          main: "#9D9D9D",
        },
        independence: {
          main: "#42526E",
          transparent: "#42526EBF",
        },
        lavanderIndigo: {
          main: "#9D4DE1",
          contrastText: "#FFFFFF",
        },
        telemagenta: {
          main: "#CC2E75",
          contrastText: "#FFFFFF",
        },
        slateBlue: {
          main: "#7B68EE",
        },
        lightRed: {
          main: "#F06363",
        },
        cyanBlue: {
          light: "#E7F2F4",
          main: "#1D8DAF",
          contrastText: "#FFFFFF",
        },
        sidemenu: {
          icon: {
            normal: "#A8A8A8",
            active: "#EF941F",
          },
          text: {
            normal: "#3D4F76",
            active: "#EF941F",
          },
        },
        actionButton: {
          main: "#EF841F",
          alternative: "#009CCD",
          contrastColor: "#FFFFFF",
        },
        alertButton: {
          main: "#CF2E76",
          alternative: "#F06363",
          contrastColor: "#FFFFFF",
        },
        approveButton: {
          main: "#2FCC71",
          contrastColor: "#FFFFFF",
        },
        moduleTable: {
          main: "#519DBF",
          light: "#42526E",
        },
        radio: {
          enabled: {
            selected: { color: "#fafafa", border: "#2d9fc3" },
            unselected: { color: "#fafafa", border: "#9d9d9d" },
          },
          disabled: {
            selected: { color: "#fafafa", border: "#2d9fc3" },
            unselected: { color: "#fafafa", border: "#ededed" },
          },
          error: {
            selected: { color: "#fafafa", border: "#f6354a" },
            unselected: { color: "#fafafa", border: "#f6354a" },
          },
        },
        button: {
          disabled: {
            color: "rgba(0, 0, 0, 0.26)",
            border: "rgba(0, 0, 0, 0.12)",
          },
        },
      },
      zIndex: {
        "above-drawer": 1201, // z-index of Mui Drawer is 1200
      },
      backgroundImage: {
        auth: "url('/assets/images/login-background.png')",
      },
    },
  },
  plugins: [],
};
