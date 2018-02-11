const PASSIVE_EVENT_LISTENERS = ['touchstart'];
const matches = (prototype => ['webkitMatchesSelector', 'msMatchesSelector', 'matches']
  .filter(property => property in prototype).slice(-1)[0])(HTMLElement.prototype);

export default () => {
  let classNames = [];
  let cssVariables = {};

  return {
    addClass: updateClassNames => (className) => {
      classNames = [...classNames, className];
      updateClassNames(classNames);
    },
    computeBoundingRect: element => () => {
      const { bottom, left, right, top } = element.getBoundingClientRect();
      return { top, left, right, bottom, width: right - left, height: bottom - top };
    },
    deregisterInteractionHandler: element =>
      (type, handler) => element.removeEventListener(type, handler),
    isSurfaceActive: element => () => element[matches](':active'),
    isSurfaceDisabled: disabled => () => disabled,
    isUnbounded: centered => () => centered,
    registerInteractionHandler: element => (type, handler) =>
      element.addEventListener(
        type,
        handler,
        PASSIVE_EVENT_LISTENERS.includes(type) ? { passive: true } : null,
      ),
    removeClass: updateClassNames => (className) => {
      classNames = classNames.filter(currentClassName => currentClassName !== className);
      updateClassNames(classNames);
    },
    updateCssVariable: updateCssVariables => (variable, value) => {
      cssVariables = { ...cssVariables, [variable]: value };
      updateCssVariables(cssVariables);
    },
  };
};
