/* eslint-disable import/prefer-default-export */
import { BASE_URL } from '../env/env';

/**
 * fetching profile data from backend api
 * return interface used for other files
 *
 */
export const getPopularGame = async (limit = 100) => {
  const url = `${BASE_URL}popular?limit=${limit}`;

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
