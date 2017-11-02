import { MDCRipple, MDCRippleFoundation } from '@material/ripple/dist/mdc.ripple';

import {
  addClass,
  computeBoundingRect,
  deregisterInteractionHandler,
  isSurfaceActive,
  isUnbounded,
  registerInteractionHandler,
  removeClass,
  updateCssVariable,
} from './adapter-utilities';

export default ({ centered, element, self, updateClassNames, updateCssVariables }) =>
  new MDCRippleFoundation({
    ...MDCRipple.createAdapter(self),
    addClass: addClass(updateClassNames),
    computeBoundingRect: computeBoundingRect(element),
    deregisterInteractionHandler: deregisterInteractionHandler(element),
    isUnbounded: isUnbounded(centered),
    isSurfaceActive: isSurfaceActive(element),
    removeClass: removeClass(updateClassNames),
    registerInteractionHandler: registerInteractionHandler(element),
    updateCssVariable: updateCssVariable(updateCssVariables),
  });
