import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { Text, View } from '../../components/Themed.tsx';

const styles = StyleSheet.create({
  container: {

  },
  title: {
    paddingTop: 10,
    fontSize: 12,
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
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#eee',
    borderWidth: 1,
  },
});

/**
 * Placeholder for popular game review tab
 * @returns
 */
const PopularGameReviewView = () => (
  <View style={styles.container}>
    <Text style={styles.title}>
      Popular Review
    </Text>
  </View>
);

export default PopularGameReviewView;
