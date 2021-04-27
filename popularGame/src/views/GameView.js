/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet, ScrollView, TextInput, Button, Image, Pressable,
} from 'react-native';
import { PropTypes } from 'prop-types';
import {
  MaterialCommunityIcons, EvilIcons, MaterialIcons, AntDesign,
} from '@expo/vector-icons';
import LoadingView from './LoadingView';
import { POPULAR_MAX } from '../../env/env';
import { MAX_GAMES, MIN_GAMES } from '../constants/Numbers';
import { Text, View } from '../components/Themed.tsx';

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

/**
 * Card component for displaying game information
 * @param {object} game: information for a single game from popular or top100 collection
 */
export const GameInfo = (props) => {
  const { game, navigation } = props;

  const Score = () => {
    const items = [];
    const num = game.score === 'N/A' ? 0 : Math.ceil(game.score);
    for (let i = 0; i < num; i += 1) {
      items.push(<EvilIcons key={i} name="star" size={20} color="black" />);
    }
    return (
      <View style={styles.row}>
        {items}
      </View>
    );
  };

  return (
    <Pressable
      title="gamecard"
      style={styles.card}
      testID="navigate"
      onPress={() => navigation.navigate('Article', game)}
    >
      <Image
        style={styles.image}
        source={{
          uri: game.thumbnail,
        }}
      />
      <View>
        <Text style={styles.title}>
          {
            game.title
          }
        </Text>
        <Text style={styles.text}>
          <Score />
        </Text>
        <Text style={styles.text}>
          <MaterialCommunityIcons name="typewriter" size={24} color="black" />
          {
            `Edited By ${game.editor}`
          }
        </Text>
        <Text style={styles.text}>
          <MaterialIcons name="category" size={24} color="black" />
          {
            `${game.genres}`
          }
        </Text>
        <Text style={styles.text}>
          <MaterialIcons name="gamepad" size={24} color="black" />
          {
            `On ${game.platforms}`
          }
        </Text>
        <Text style={styles.text}>
          <AntDesign name="calendar" size={24} color="black" />
          {
            game.release
          }
        </Text>
      </View>
    </Pressable>
  );
};

GameInfo.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    editor: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    developers: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string),
    platforms: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

/**
 * display component for game list
 * @param {array of game} data list contains all game data
 * @param {function} navigation navigation in corresponding screen stack
 * @returns
 */
export const GameList = (props) => {
  const { data, navigation } = props;
  return (
    <ScrollView>
      {data.length !== 0 ? data.map((game) => (
        <GameInfo game={game} key={game.title} navigation={navigation} />
      )) : (
        <>
          <MaterialCommunityIcons style={styles.container} name="flask-empty-outline" size={24} color="black" />
          <Text style={styles.title}>No Data</Text>
        </>
      )}
    </ScrollView>
  );
};

GameList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * Componet rendering a tab page of game information list
 * @param {array of game} data: list of game information
 * @param {function} setLimit: the number of game displayed
 * @param {react component} Filter: the sub component display filtering parts
 */
const GameView = (props) => {
  const { data, setLimit, navigation } = props;
  const [value, setValue] = useState(POPULAR_MAX);

  if (!data) {
    return (
      <LoadingView />
    );
  }

  const Filter = () => (
    <>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="limit"
          value={value}
          onChangeText={(text) => {
            setValue(text);
          }}
        />
        <View style={styles.btn}>
          <Button
            style={styles.btn}
            title="submit"
            color="#bf1313"
            onPress={() => {
              let tempValue;
              if (value > MAX_GAMES || value < MIN_GAMES || !value) {
                tempValue = MAX_GAMES;
              } else {
                tempValue = value;
              }
              setLimit(tempValue);
            }}
          />
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <Filter />
      <GameList data={data} navigation={navigation} />
    </View>
  );
};

GameView.defaultProps = {
  data: undefined,
};

GameView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  setLimit: PropTypes.func.isRequired,
};

export default GameView;
