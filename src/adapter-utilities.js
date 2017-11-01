let classNames = [];

export const addClass = updateClassNames => (className) => {
  classNames = [...classNames, className];
  updateClassNames(classNames);
};

export const deregisterInteractionHandler = element =>
  (type, handler) => element.removeEventListener(type, handler);

export const isUnbounded = centered => () => centered;

export const removeClass = updateClassNames => (className) => {
  classNames = classNames.filter(currentClassName => currentClassName !== className);
  updateClassNames(classNames);
};
