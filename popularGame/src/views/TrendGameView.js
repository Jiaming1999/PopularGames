/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  StyleSheet, ScrollView, Button,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { View, Text } from '../components/Themed.tsx';
import { GameInfo } from './GameView';
import LoadingView from './LoadingView';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  card: {
    width: '98%',
    flexShrink: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    margin: 5,
    padding: 5,
  },
  text: {
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
  },
  input: {
    width: '70%',
    margin: 15,
    height: 40,
    borderColor: '#eee',
    borderWidth: 1,
  },
  btn: {
    alignSelf: 'center',
    marginRight: 15,
  },
  image: {
    width: '90%',
    height: 200,
  },
});

const Result = (props) => {
  const { children } = props;
  return (
    <View className={styles.container}>
      <Text>
        {children}
      </Text>
    </View>
  );
};

Result.propTypes = {
  children: PropTypes.string.isRequired,
};

/**
 * Game view display for a trend game review page
 * @returns
 */
const TrendGameView = (props) => {
  const {
    setType, data, gameData, navigation, loading,
  } = props;

  const handlePressGenreMost = () => {
    setType('mostgenre');
  };

  const handlePressPlatfromMost = () => {
    setType('mostplatform');
  };

  const handlePressGenreLeast = () => {
    setType('leastgenre');
  };

  const handlePressPlatfromLeast = () => {
    setType('leastplatform');
  };
  if (loading) {
    return (<LoadingView />);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {data ? data.response : 'Click to see result'}
      </Text>
      <View style={styles.row}>
        <Button
          style={styles.btn}
          title="MostGenre"
          color="#bf1313"
          onPress={handlePressGenreMost}
        />
        <Button
          style={styles.btn}
          title="MostPlatform"
          color="#bf1313"
          onPress={handlePressPlatfromMost}
        />
      </View>
      <View style={styles.row}>
        <Button
          style={styles.btn}
          title="LeastGenre"
          color="#bf1313"
          onPress={handlePressGenreLeast}
        />
        <Button
          style={styles.btn}
          title="LeastPlatform"
          color="#bf1313"
          onPress={handlePressPlatfromLeast}
        />
      </View>
      <ScrollView>
        {gameData ? gameData.map((game) => (
          <GameInfo game={game} key={game.title} navigation={navigation} />
        )) : <Text>See Games Satisfied Those Trend</Text>}
      </ScrollView>
    </View>
  );
};

TrendGameView.propTypes = {
  setType: PropTypes.func.isRequired,
  data: PropTypes.shape({
    response: PropTypes.string.isRequired,
  }).isRequired,
  gameData: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TrendGameView;