export function patch(): void {
  // scrollIntoView is not implemented in jsdom
  // https://stackoverflow.com/a/53294906
  window.HTMLElement.prototype.scrollIntoView = function () {
    //
  };
}
