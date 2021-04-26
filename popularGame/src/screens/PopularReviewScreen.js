/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed.tsx';
import { BASE_URL } from '../../env/env';
import { getGameByAttr } from '../modal/FilterModal';
import TrendGameView from '../views/TrendGameView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

/**
 * Screen Container component for popular game's filter result
 * @returns
 */
const PopularReviewScreen = (props) => {
  const { navigation } = props;
  const [type, setType] = useState();
  const [data, setData] = useState();
  const [gameData, setGameData] = useState();

  async function fetchFilter(typeFilter) {
    if (!typeFilter) {
      throw new Error('no filter');
    }
    const url = `${BASE_URL}filter/popular?type=${typeFilter}`;
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
      setData(json);
      return json;
    } catch (e) {
      return null;
    }
  }

  async function fetchGameList() {
    let retData;
    if (type.includes('genre')) {
      retData = await getGameByAttr('popular', 'genre', data.response);
    } else {
      retData = await getGameByAttr('popular', 'platform', data.response);
    }
    setGameData(retData);
    return retData;
  }

  useEffect(() => {
    if (type) {
      fetchFilter(type);
    }
  }, [type]);

  useEffect(() => {
    fetchGameList();
  }, [data]);

  return (
    <View style={styles.container}>
      <TrendGameView
        setType={setType}
        data={data}
        gameData={gameData}
        navigation={navigation}
      />
    </View>
  );
};

export default PopularReviewScreen;
