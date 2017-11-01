import { MDCRipple } from '@material/ripple/dist/mdc.ripple';
import rippleFoundation from './index';

MDCRipple.createAdapter = jest.fn();

describe('Ripple > rippleFoundation()', () => {
  test('calls \'MDCRipple.createAdapter()\' with the correct context', () => {
    const SELF = 'SELF';
    rippleFoundation({
      centered: false,
      element: null,
      self: SELF,
      updateClassNames: null,
      updateCssVariables: null,
    });
    expect(MDCRipple.createAdapter).toBeCalledWith(SELF);
  });
});
