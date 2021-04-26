/* eslint-disable import/prefer-default-export */
import { BASE_URL } from '../../env/env';

/**
 * parsing json file into object array stored
 * @param {*} json
 * @returns all games information
 */
export const parseGamesByAttr = (json) => {
  if (json === undefined) {
    throw new Error('fail to parse');
  }
  const allGames = json.map((game) => game);
  return allGames;
};

/**
 * Get game information by specific game genre and platform
 * @param {*} type
 * @param {*} category
 * @param {*} value
 * @returns
 */
export const getGameByAttr = async (type, category, value) => {
  const url = `${BASE_URL}${type}/rank?${category}=${value}`;

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
    return parseGamesByAttr(json);
  } catch (e) {
    throw new Error(e);
  }
};
