/* eslint-disable import/prefer-default-export */
import { BASE_URL } from '../../env/env';

/**
 * fetching profile data from backend api
 * return data used for other files/
 */
export const getPopularGame = async (limit = 100, type) => {
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
    return json;
  } catch (e) {
    throw new Error(e);
  }
};
