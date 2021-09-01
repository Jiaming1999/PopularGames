/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import renderer from 'react-test-renderer';
import api from '../src/util/api';
import { POPULAR_DATA, TOP_DATA, REVIEW_DATA } from '../mockData';
import { GameList } from '../src/views/GameView';
import LoadingView from '../src/views/LoadingView';
import { ReviewContent } from '../src/views/ReviewView';
import { parseGames } from '../src/modal/GamesModal';

jest.useFakeTimers();

beforeEach(() => {
  fetch.resetMocks();
});

/**
 * Unit test for mock api call successfully get popular game
 */
test('returns result for mock popular game', () => {
  fetch.mockResponseOnce(JSON.stringify([POPULAR_DATA]));
  const navigation = { navigate: jest.fn(), push: jest.fn() };
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/popular')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      const data = parseGames([onResponse.mock.calls[0][0][0]]);
      const tree = renderer.create(<GameList data={data} navigation={navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

/**
 * Unit test for mock api call successfully get top100 game
 */
test('returns result for mock top100 game', () => {
  fetch.mockResponseOnce(JSON.stringify([TOP_DATA]));
  const navigation = { navigate: jest.fn(), push: jest.fn() };
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/top100')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      const data = parseGames([onResponse.mock.calls[0][0][0]]);
      const tree = renderer.create(<GameList data={data} navigation={navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

/**
 * Snapshot for loading view
 */
test('loading for popular game', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/popular')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).not.toHaveBeenCalled();
      const tree = renderer.create(<LoadingView />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

/**
 * SnapShot for review view
 */
test('throws an error for top game', () => {
  fetch.mockResponseOnce(JSON.stringify([REVIEW_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/top100')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      const tree = renderer.create(<ReviewContent
        data={onResponse.mock.calls[0][0][0]}
      />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});
