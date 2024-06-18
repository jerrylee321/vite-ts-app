export const mockRequest = jest.fn().mockReturnValue({ data: undefined });

export const create = jest.fn().mockImplementation(() => {
  return {
    request: mockRequest,
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
  };
});

export const { isAxiosError, AxiosError } = jest.requireActual("axios");

export default {
  create,
  isAxiosError,
  AxiosError,
};
