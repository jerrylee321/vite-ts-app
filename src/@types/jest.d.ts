declare global {
  namespace jest {
    interface Matchers<R> {
      toShowErrorsInArgs(): R;
    }
  }
}
