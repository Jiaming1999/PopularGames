import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
  subtitle: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    padding: 5,
    margin: 5,
  },
});

const ReviewView = (props) => {
  const { route } = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          {route.params.title}
        </Text>
        <Text style={styles.subtitle}>
          {route.params.editor}
        </Text>
        <Text style={styles.text}>
          {route.params.review}
        </Text>
      </ScrollView>
    </View>
  );
};

export default ReviewView;
