/* eslint-disable import/prefer-default-export */
import { BASE_URL } from '../../env/env';

/**
 * parsing json file into object array stored
 * @param {*} json
 * @returns all games information
 */
export const parseGames = (json) => {
  if (json === undefined) {
    throw new Error('fail to parse');
  }
  const allGames = json.map((game) => game);
  return allGames;
};

/**
 * fetching profile data from backend api
 * return data used for other files/
 */
export const getGame = async (limit = 100, type) => {
  const url = `${BASE_URL}${type}?limit=${limit}`;

  try {
    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await response.json();
    return parseGames(json);
  } catch (e) {
    throw new Error(e);
  }
};
