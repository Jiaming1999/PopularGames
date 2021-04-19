import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text } from '../components/Themed.tsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 5,
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: 'bold',
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
  image: {
    width: '100%',
    height: 300,
  },
});

/**
 * Component display correpsond game's review article
 */
const ReviewView = (props) => {
  const { route } = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.image}
          source={{
            uri: route.params.thumbnail,
          }}
        />
        <Text style={styles.title}>
          {route.params.title}
        </Text>
        <Text style={styles.subtitle}>
          {`By ${route.params.editor}`}
        </Text>
        <Text style={styles.text}>
          {route.params.review}
        </Text>
      </ScrollView>
    </View>
  );
};

export default ReviewView;
