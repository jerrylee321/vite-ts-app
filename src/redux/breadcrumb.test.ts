import reducer, { Breadcrumb, pop, push } from "./breadcrumb";

describe("breadcrumb reducer", () => {
  test("should have initial state", () => {
    const { breadcrumbs } = reducer(undefined, { type: undefined });
    expect(breadcrumbs.length).toEqual(0);
  });

  test("should push a breadcrumb", () => {
    const mockBreadcrumb: Breadcrumb = {
      title: "mockTitle",
      path: "mockPath",
    };
    const { breadcrumbs } = reducer({ breadcrumbs: [] }, push(mockBreadcrumb));
    expect(breadcrumbs.length).toEqual(1);
    if (breadcrumbs.length === 1) {
      expect(breadcrumbs[0].path).toEqual(mockBreadcrumb.path);
      expect(breadcrumbs[0].title).toEqual(mockBreadcrumb.title);
    }
  });

  test("should pop a breadcrumb", () => {
    const mockBreadcrumb: Breadcrumb = {
      title: "mockTitle",
      path: "mockPath",
    };
    const { breadcrumbs } = reducer({ breadcrumbs: [mockBreadcrumb] }, pop());
    expect(breadcrumbs.length).toEqual(0);
  });
});
