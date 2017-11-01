import { MDCRipple, MDCRippleFoundation } from '@material/ripple/dist/mdc.ripple';

import { addClass, deregisterInteractionHandler, isUnbounded, removeClass } from './adapter-utilities';

const matches = (prototype => ['webkitMatchesSelector', 'msMatchesSelector', 'matches']
  .filter(property => property in prototype).slice(-1)[0])(HTMLElement.prototype);

export default ({ centered, element, self, updateClassNames, updateCssVariables }) => {
  let cssVariables = {};
  const PASSIVE_EVENT_LISTENERS = ['touchstart'];
  return new MDCRippleFoundation({
    ...MDCRipple.createAdapter(self),
    addClass: addClass(updateClassNames),
    computeBoundingRect: () => {
      const { bottom, left, right, top } = element.getBoundingClientRect();
      return { top, left, right, bottom, width: right - left, height: bottom - top };
    },
    deregisterInteractionHandler: deregisterInteractionHandler(element),
    isUnbounded: isUnbounded(centered),
    isSurfaceActive: () => element[matches](':active'),
    removeClass: removeClass(updateClassNames),
    registerInteractionHandler: (type, handler) => {
      element.addEventListener(
        type,
        handler,
        PASSIVE_EVENT_LISTENERS.includes(type) ? { passive: true } : null,
      );
    },
    updateCssVariable: (variable, value) => {
      cssVariables = { ...cssVariables, [variable]: value };
      updateCssVariables(cssVariables);
    },
  });
};
