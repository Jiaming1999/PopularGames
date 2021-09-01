/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import renderer from 'react-test-renderer';
import api from '../src/util/api';
import {
  MOST_GENRE_DATA, MOST_PLATFORM_DATA, LEAST_GENRE_DATA, LEAST_PLATFORM_DATA,
} from '../mockData';
import { parseGamesByAttr } from '../src/modal/FilterModal';
import { Result } from '../src/views/TrendGameView';

jest.useFakeTimers();

beforeEach(() => {
  fetch.resetMocks();
});

/**
 * snap shot test for Normally display most genre result for  games
 */
test('returns result for mock popular game', () => {
  fetch.mockResponseOnce(JSON.stringify([MOST_GENRE_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/popular?type=mostgenre')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      const data = parseGamesByAttr([onResponse.mock.calls[0][0][0]]);
      const tree = renderer.create(<Result data={data[0]} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

/**
 * snap shot test for Normally display most platform result for popular games
 */
test('returns result for mock popular game', () => {
  fetch.mockResponseOnce(JSON.stringify([MOST_PLATFORM_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/popular?type=mostplatform')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      const data = parseGamesByAttr([onResponse.mock.calls[0][0][0]]);
      const tree = renderer.create(<Result data={data[0]} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

/**
 * snap shot test for Normally display least genre result for top100 games
 */
test('returns result for mock popular game', () => {
  fetch.mockResponseOnce(JSON.stringify([LEAST_GENRE_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/top100?type=mostgenre')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      const data = parseGamesByAttr([onResponse.mock.calls[0][0][0]]);
      const tree = renderer.create(<Result data={data[0]} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

/**
 * snap shot test for Normally display least platform result for top100 games
 */
test('returns result for mock popular game', () => {
  fetch.mockResponseOnce(JSON.stringify([LEAST_PLATFORM_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/filter/top100?type=mostplatform')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      const data = parseGamesByAttr([onResponse.mock.calls[0][0][0]]);
      const tree = renderer.create(<Result data={data[0]} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});
