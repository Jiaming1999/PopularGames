/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import PopularGameView from '../views/PopularGameView';
import { getPopularGame } from '../modal/PopularGamesModal';

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

const PopularGameScreen = () => {
  const [data, setData] = useState();
  const [limit, setLimit] = useState(100);
  async function fetchData() {
    try {
      const tempData = await getPopularGame(limit);
      setData(tempData);
    } catch (e) {
      throw new Error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [limit]);

  return (
    <View style={styles.container}>
      <Text>
        <PopularGameView data={data} setLimit={setLimit} />
      </Text>
    </View>
  );
};

export default PopularGameScreen;
