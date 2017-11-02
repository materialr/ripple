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

const CLASS_NAME_1 = 'CLASS_NAME_1';
const CLASS_NAME_2 = 'CLASS_NAME_2';
const CSS_VARIABLE_2 = 'CSS_VARIABLE_2';
const CSS_VARIABLE_VALUE_2 = 'CSS_VARIABLE_VALUE_2';

test('\'addClass()\' adds a className and sends the list to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [CLASS_NAME_1, CLASS_NAME_2];
  const updateClassNames = jest.fn();

  addClass(updateClassNames)(CLASS_NAME_1);
  addClass(updateClassNames)(CLASS_NAME_2);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'computeBoundingRect()\' returns the bounding box of the element and it\'s size', () => {
  const GET_BOUNDING_CLIENT_RECT = jest.fn()
    .mockReturnValue({ bottom: 10, left: 0, right: 10, top: 0 });
  const element = { getBoundingClientRect: GET_BOUNDING_CLIENT_RECT };
  const expected = { bottom: 10, height: 10, left: 0, right: 10, top: 0, width: 10 };

  const actual = computeBoundingRect(element)();

  expect(actual).toEqual(expected);
});

test('\'deregisterInteractionHandler()\' removes an event listener from the element', () => {
  const HANDLER = 'HANDLER';
  const REMOVE_EVENT_LISTENER = jest.fn();
  const TYPE = 'TYPE';
  const element = { removeEventListener: REMOVE_EVENT_LISTENER };

  deregisterInteractionHandler(element)(TYPE, HANDLER);

  expect(REMOVE_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER);
});

test('\'isSurfaceActive()\' returns true when the surface is active', () => {
  const matches = jest.fn().mockReturnValue(true);
  const element = { matches };

  const actual = isSurfaceActive(element)();

  expect(actual).toBe(true);
});

test('\'isSurfaceActive()\' returns false when the surface is inactive', () => {
  const matches = jest.fn().mockReturnValue(false);
  const element = { matches };

  const actual = isSurfaceActive(element)();

  expect(actual).toBe(false);
});

test('\'isUnbounded()\' returns the \'centered\' property directly', () => {
  const CENTERED = 'CENTERED';
  const expected = CENTERED;

  const actual = isUnbounded(CENTERED)();

  expect(actual).toBe(expected);
});

test('\'registerInteractionHandler()\' adds a non-passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'TYPE';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  registerInteractionHandler(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, null);
});

test('\'registerInteractionHandler()\' adds a passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'touchstart';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  registerInteractionHandler(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, { passive: true });
});

test('\'removeClass()\' removes a classNames ands sends the list of classNames to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [];
  const updateClassNames = jest.fn();

  removeClass(updateClassNames)(CLASS_NAME_2);
  removeClass(updateClassNames)(CLASS_NAME_1);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'updateCssVariable()\' adds a css variable', () => {
  const CSS_VARIABLE_1 = 'CSS_VARIABLE_1';
  const CSS_VARIABLE_VALUE_1 = 'CSS_VARIABLE_VALUE_1';
  const updateCssVariables = jest.fn();
  const expectedFirst = { [CSS_VARIABLE_1]: CSS_VARIABLE_VALUE_1 };
  const expectedSecond = {
    [CSS_VARIABLE_1]: CSS_VARIABLE_VALUE_1,
    [CSS_VARIABLE_2]: CSS_VARIABLE_VALUE_2,
  };

  updateCssVariable(updateCssVariables)(CSS_VARIABLE_1, CSS_VARIABLE_VALUE_1);
  updateCssVariable(updateCssVariables)(CSS_VARIABLE_2, CSS_VARIABLE_VALUE_2);

  expect(updateCssVariables.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateCssVariables.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'updateCssVariable()\' changes a css variable', () => {
  const CSS_VARIABLE_1 = 'CSS_VARIABLE_1';
  const CSS_VARIABLE_VALUE_1_NEW = 'CSS_VARIABLE_VALUE_1_NEW';
  const updateCssVariables = jest.fn();
  const expected = {
    [CSS_VARIABLE_1]: CSS_VARIABLE_VALUE_1_NEW,
    [CSS_VARIABLE_2]: CSS_VARIABLE_VALUE_2,
  };

  updateCssVariable(updateCssVariables)(CSS_VARIABLE_1, CSS_VARIABLE_VALUE_1_NEW);

  expect(updateCssVariables).toBeCalledWith(expected);
});
