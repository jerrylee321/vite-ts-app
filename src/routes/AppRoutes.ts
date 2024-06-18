interface AppRoute {
  path: string;
  render?: (...args: any[]) => string;
}

const makeForgotPasswordRoute = <T extends string>(
  prefix: T
): {
  path: `${T}/:stage?`;
  render: (
    stage: "initial" | "verify" | "password" | "success",
    loginname?: string
  ) => string;
} => {
  return {
    path: `${prefix}/:stage?`,
    render: (stage, loginname) => {
      if (stage === "initial") {
        if (!loginname || loginname === "") {
          return prefix;
        }
        return `${prefix}?loginname=${loginname}`;
      }
      return `${prefix}/${stage}`;
    },
  };
};

const AppRoutes = Object.freeze({
  Home: {
    path: "/",
  },
  Login: {
    path: "/login",
  },
  SelectScheme: {
    path: "/select-scheme",
    render: (redirectPath?: string): string => {
      if (redirectPath && redirectPath !== "/") {
        const search = new URLSearchParams({
          redirect_path: redirectPath,
        });
        return `/select-scheme?${search.toString()}`;
      }
      return "/select-scheme";
    },
  },
  LoginChangePassword: makeForgotPasswordRoute("/login/first-time"),
  ForgotPassword: makeForgotPasswordRoute("/forgot-password"),
} satisfies { [K in string]: AppRoute });

export default AppRoutes;
