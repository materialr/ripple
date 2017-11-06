const PASSIVE_EVENT_LISTENERS = ['touchstart'];
const matches = (prototype => ['webkitMatchesSelector', 'msMatchesSelector', 'matches']
  .filter(property => property in prototype).slice(-1)[0])(HTMLElement.prototype);

let classNames = [];
let cssVariables = {};

export const addClass = updateClassNames => (className) => {
  classNames = [...classNames, className];
  updateClassNames(classNames);
};

export const computeBoundingRect = element => () => {
  const { bottom, left, right, top } = element.getBoundingClientRect();
  return { top, left, right, bottom, width: right - left, height: bottom - top };
};

export const deregisterInteractionHandler = element =>
  (type, handler) => element.removeEventListener(type, handler);

export const isSurfaceActive = element => () => element[matches](':active');

export const isSurfaceDisabled = disabled => () => disabled;

export const isUnbounded = centered => () => centered;

export const registerInteractionHandler = element => (type, handler) =>
  element.addEventListener(
    type,
    handler,
    PASSIVE_EVENT_LISTENERS.includes(type) ? { passive: true } : null,
  );

export const removeClass = updateClassNames => (className) => {
  classNames = classNames.filter(currentClassName => currentClassName !== className);
  updateClassNames(classNames);
};

export const updateCssVariable = updateCssVariables => (variable, value) => {
  cssVariables = { ...cssVariables, [variable]: value };
  updateCssVariables(cssVariables);
};
