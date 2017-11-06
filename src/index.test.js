import { MDCRipple } from '@material/ripple/dist/mdc.ripple';

import rippleFoundation from './index';

test('\'rippleFoundation()\' calls \'MDCRipple.createAdapter()\' method with the provided context', () => {
  const SELF = 'SELF';
  MDCRipple.createAdapter = jest.fn();

  rippleFoundation({
    centered: null,
    disabled: null,
    element: null,
    self: SELF,
    updateClassNames: null,
    updateCssVariables: null,
  });

  expect(MDCRipple.createAdapter).toBeCalledWith(SELF);
});
