/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet, ScrollView, TextInput, Button,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import LoadingView from './LoadingView';
import { POPULAR_MAX } from '../env/env.js';

import { Text, View } from '../components/Themed';

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

const GameInfo = (props) => {
  const { game } = props;
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Avatar
          size="large"
          containerStyle={{ margin: 5, marginTop: 10 }}
          title={game.title}
          source={{ uri: game.thumbnail }}
        />
        <View>
          <Text style={styles.title}>
            {
              game.title
            }
          </Text>
          <Text style={styles.text}>
            {
              `Rated Score:${game.score}`
            }
          </Text>
          <Text style={styles.text}>
            {
              `By ${game.editor}`
            }
          </Text>
          <Text style={styles.text}>
            {
              `On ${game.platforms}`
            }
          </Text>
          <Text style={styles.text}>
            {
              `From ${game.developers}`
            }
          </Text>
          <Text style={styles.text}>
            {
              game.release
            }
          </Text>
        </View>
      </View>
    </View>
  );
};

GameInfo.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    editor: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    developers: PropTypes.shape([
      PropTypes.string,
    ]),
    platforms: PropTypes.shape([
      PropTypes.string,
    ]),
  }).isRequired,
};

const PopularGameView = (props) => {
  const { data, setLimit } = props;
  const [value, setValue] = useState(POPULAR_MAX);

  if (!data) {
    return (
      <LoadingView />
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="limit"
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
      />
      <Button
        title="submit"
        color="#bf1313"
        onPress={() => {
          setLimit(value);
        }}
      />
      <ScrollView>
        {data.map((game) => (
          <GameInfo game={game} key={game.title} />
        ))}
      </ScrollView>
    </View>
  );
};

PopularGameView.propTypes = {
  data: PropTypes.shape([
    PropTypes.object,
  ]).isRequired,
  setLimit: PropTypes.func.isRequired,
};

export default PopularGameView;
