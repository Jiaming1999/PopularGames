/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PropTypes } from 'prop-types';
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
 * Review article for the game
 * @param {data} props
 * @param {object} data one game information
 * @returns
 */
export const ReviewContent = (props) => {
  const { data } = props;
  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{
          uri: data.thumbnail,
        }}
      />
      <Text style={styles.title}>
        {data.title}
      </Text>
      <Text style={styles.subtitle}>
        {`By ${data.editor}`}
      </Text>
      <Text style={styles.text}>
        {data.review}
      </Text>
    </ScrollView>
  );
};

ReviewContent.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    editor: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
};

/**
 * Component display correpsond game's review article
 * @ignore route: hidden props
 */
const ReviewView = (props) => {
  const { route } = props;
  const data = route.params;
  return (
    <View style={styles.container}>
      <ReviewContent data={data} />
    </View>
  );
};

export default ReviewView;
