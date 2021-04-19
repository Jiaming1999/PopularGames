// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { PropTypes } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

const NotFoundScreen = ({
  navigation,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>This screen doesnt exist.</Text>
    <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
      <Text style={styles.linkText}>Go to home screen!</Text>
    </TouchableOpacity>
  </View>
);

NotFoundScreen.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default NotFoundScreen;
