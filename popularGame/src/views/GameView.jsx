import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet, ScrollView, TextInput, Button,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoadingView from './LoadingView';
import { POPULAR_MAX } from '../../env/env';

import { Text, View } from '../components/Themed.tsx';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
});

/**
 * Card component for displaying game information
 * game: information for a single game from popular or top100 collection
 */
const GameInfo = (props) => {
  const { game, navigation } = props;
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Avatar
          size="large"
          containerStyle={{ margin: 5, marginTop: 10 }}
          title={game.title}
          source={{ uri: game.thumbnail }}
          onPress={() => navigation.navigate('Article', game)}
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
    developers: PropTypes.arrayOf(PropTypes.string),
    platforms: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

/**
 * Componet rendering a tab page of game information list
 * data: list of game information
 * setLimit: the number of game displayed
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
              if (value > 100 || value < 0 || !value) {
                tempValue = 100;
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
