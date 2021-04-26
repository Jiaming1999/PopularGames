import api from '../src/util/api';
import {
  MOST_GENRE_DATA, MOST_PLATFORM_DATA, LEAST_GENRE_DATA, LEAST_PLATFORM_DATA,
} from '../mockData';
import { parseGamesByAttr } from '../src/modal/FilterModal';

beforeEach(() => {
  fetch.resetMocks();
});

/**
 * Mock api test for returning most popular genre
 */
test('returns result for mock most popular game genre', () => {
  fetch.mockResponseOnce(JSON.stringify([MOST_GENRE_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/popular?type=mostgenre')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual(MOST_GENRE_DATA);
    });
});

/**
 * Mock api test for returning most popular platform
 */
test('returns result for mock most popular game platform', () => {
  fetch.mockResponseOnce(JSON.stringify([MOST_PLATFORM_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/popular?type=mostplatform')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual(MOST_PLATFORM_DATA);
    });
});

/**
 * Mock api test for returning least popular genre
 */
test('returns result for mock least popular game genre', () => {
  fetch.mockResponseOnce(JSON.stringify([LEAST_GENRE_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/popular?type=mostplatform')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual(LEAST_GENRE_DATA);
    });
});

/**
 * Mock api test for returning least popular platform
 */
test('returns result for mock least popular game platform', () => {
  fetch.mockResponseOnce(JSON.stringify([LEAST_PLATFORM_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/popular?type=mostplatform')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual(LEAST_PLATFORM_DATA);
    });
});

/**
 * Mock api test for returning most top100 genre
 */
test('returns result for mock most top100 game genre', () => {
  fetch.mockResponseOnce(JSON.stringify([MOST_GENRE_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/top100?type=mostgenre')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual(MOST_GENRE_DATA);
    });
});

/**
 * Mock api test for returning most top100 platform
 */
test('returns result for mock most top100 game platform', () => {
  fetch.mockResponseOnce(JSON.stringify([MOST_PLATFORM_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/top100?type=mostplatform')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual(MOST_PLATFORM_DATA);
    });
});

/**
 * Mock api test for returning least top100 genre
 */
test('returns result for mock least top100 game genre', () => {
  fetch.mockResponseOnce(JSON.stringify([LEAST_GENRE_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/top100?type=mostplatform')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual(LEAST_GENRE_DATA);
    });
});

/**
 * Mock api test for returning least top100 game platform
 */
test('returns result for mock least platform on top100 game', () => {
  fetch.mockResponseOnce(JSON.stringify([LEAST_PLATFORM_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/top100?type=mostplatform')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual(LEAST_PLATFORM_DATA);
    });
});

/**
 * Test for null data parsing
 */
test('empty null parsing', () => {
  expect(() => { parseGamesByAttr(null); }).toThrow('Cannot read property \'map\' of null');
});

/**
 * Test for undefined data parsing
 */
test('empty undefined parsing', () => {
  expect(() => { parseGamesByAttr(undefined); }).toThrow('fail to parse');
});

/**
 * Test for incorrect format game data parsing
 */
test('empty parsing', () => {
  expect(() => { parseGamesByAttr('This is not a valid data form'); }).toThrow('json.map is not a function');
});

/**
 * ordinary parsing least genre data
 */
test('ordinary parsing least genre data', () => {
  const data = parseGamesByAttr([LEAST_GENRE_DATA]);
  expect(data).toEqual([
    LEAST_GENRE_DATA,
  ]);
});

/**
 * ordinary parsing least platform data
 */
test('ordinary parsing least platform data', () => {
  const data = parseGamesByAttr([LEAST_PLATFORM_DATA]);
  expect(data).toEqual([
    LEAST_PLATFORM_DATA,
  ]);
});

/**
 * ordinary parsing most genre data
 */
test('ordinary parsing most genre data', () => {
  const data = parseGamesByAttr([MOST_GENRE_DATA]);
  expect(data).toEqual([
    MOST_GENRE_DATA,
  ]);
});

/**
 * ordinary parsing most platform data
 */
test('ordinary parsing most platform data', () => {
  const data = parseGamesByAttr([MOST_PLATFORM_DATA]);
  expect(data).toEqual([
    MOST_PLATFORM_DATA,
  ]);
});
