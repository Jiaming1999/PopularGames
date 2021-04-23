/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed.tsx';

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
const TopReviewScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>
      Top100 Reviwing
    </Text>
  </View>
);

export default TopReviewScreen;
