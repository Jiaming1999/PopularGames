import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed.tsx';
import { getPopularGame } from '../modal/GamesModal';
import TopGameView from '../views/GameView';

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
 * Container Screen for Top100 Game list
 * @returns
 */
const TopGameScreen = (props) => {
  const { navigation } = props;
  const [data, setData] = useState();
  const [limit, setLimit] = useState(100);
  const [error, setError] = useState();

  async function fetchData() {
    try {
      const tempData = await getPopularGame(limit, 'top100');
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
        <TopGameView data={data} setLimit={setLimit} navigation={navigation} />
      </Text>
    </View>
  );
};

export default TopGameScreen;
