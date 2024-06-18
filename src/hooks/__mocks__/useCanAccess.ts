jest.mock("../useCanAccess", () => {
  return {
    __esModule: true,
    default: jest
      .fn()
      .mockReturnValue({ isAccessible: true, isLoading: false }),
  };
});

export default {};
