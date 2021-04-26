import api from '../src/util/api';
import {
  POPULAR_DATA, TOP_DATA,
} from '../mockData';
import { parseGames } from '../src/modal/GamesModal';

beforeEach(() => {
  fetch.resetMocks();
});

/**
 * Unit test for mock api call successfully get popular game
 */
test('returns result for mock popular game', () => {
  fetch.mockResponseOnce(JSON.stringify([POPULAR_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/popular')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual(POPULAR_DATA);
    });
});

/**
 * Unit test for mock api call successfully get top100 game
 */
test('returns result for mock top100 game', () => {
  fetch.mockResponseOnce(JSON.stringify([TOP_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/top100')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual(TOP_DATA);
    });
});

/**
 * Return error if no data called
 */
test('throws an error for popular game', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/popular')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();
    });
});

/**
 * Return error if no data called
 */
test('throws an error for top game', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/top100')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();
    });
});

/**
 * Test for null data parsing
 */
test('empty profile parsing', () => {
  expect(() => { parseGames(null); }).toThrow('Cannot read property \'map\' of null');
});

/**
 * Test for undefined data parsing
 */
test('empty profile parsing', () => {
  expect(() => { parseGames(undefined); }).toThrow('fail to parse');
});

/**
 * Test for incorrect format game data parsing
 */
test('empty profile parsing', () => {
  expect(() => { parseGames('This is not a valid data form'); }).toThrow('json.map is not a function');
});

/**
 * invalid object data formating for profile parsing
 */
test('ordinary parsing top data', () => {
  const data = parseGames([TOP_DATA]);
  expect(data).toEqual([
    TOP_DATA,
  ]);
});
