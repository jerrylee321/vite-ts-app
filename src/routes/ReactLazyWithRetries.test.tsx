import ReactLazyWithRetries from "./ReactLazyWithRetries";

test("ReactLazyWithRetries", () => {
  ReactLazyWithRetries(async () =>
    import("react").then((module) => ({
      default: module.Fragment,
    }))
  );
});
