/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed.tsx';
import PopularGameView from '../views/GameView';
import { getGame } from '../modal/GamesModal';

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
 * Container Screen for popular Game list
 * @returns
 */
const PopularGameScreen = (props) => {
  const { navigation } = props;
  const [data, setData] = useState();
  const [limit, setLimit] = useState(100);
  const [error, setError] = useState();

  async function fetchData() {
    try {
      const tempData = await getGame(limit, 'popular');
      setData(tempData);
    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [limit]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>
        <PopularGameView data={data} setLimit={setLimit} navigation={navigation} />
      </Text>
    </View>
  );
};

export default PopularGameScreen;
