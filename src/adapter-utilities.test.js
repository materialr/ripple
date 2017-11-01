import { addClass, deregisterInteractionHandler, isUnbounded, removeClass } from './adapter-utilities';

const CLASS_NAME_1 = 'CLASS_NAME_1';
const CLASS_NAME_2 = 'CLASS_NAME_2';

test('\'addClass()\' adds a className and sends the list of classNames to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [CLASS_NAME_1, CLASS_NAME_2];
  const updateClassNames = jest.fn();

  addClass(updateClassNames)(CLASS_NAME_1);
  addClass(updateClassNames)(CLASS_NAME_2);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'deregisterInteractionHandler()\' removes an event listener from the element', () => {
  const HANDLER = 'HANDLER';
  const REMOVE_EVENT_LISTENER = jest.fn();
  const TYPE = 'TYPE';
  const element = { removeEventListener: REMOVE_EVENT_LISTENER };

  deregisterInteractionHandler(element)(TYPE, HANDLER);

  expect(REMOVE_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER);
});

test('\'isUnbounded()\' returns the \'centered\' property directly', () => {
  const CENTERED = 'CENTERED';
  const expected = CENTERED;

  const actual = isUnbounded(CENTERED)();

  expect(actual).toBe(expected);
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
