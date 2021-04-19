import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed.tsx';
import PopularGameReviewView from '../views/PopularGameReviewView';

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
 * to do week2 review screen for popular games
 * @returns
 */
const PopularReviewScreen = () => (
  <View style={styles.container}>
    <PopularGameReviewView />
  </View>
);

export default PopularReviewScreen;
