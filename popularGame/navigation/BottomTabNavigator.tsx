/* eslint-disable react/jsx-filename-extension */
/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../src/screens/PopularGameScreen';
import TabTwoScreen from '../src/screens/PopularReviewScreen';
import TabThreeScreen from '../src/screens/TopGameScreen';
import {
  BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TrendGame"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="TrendGame"
        component={TabOneNavigator}
        options={{
          tabBarIcon: () => <Ionicons name="game-controller" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="TrendReview"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: () => <MaterialIcons name="rate-review" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="TopGame"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: () => <Ionicons name="md-trophy-sharp" size={24} color="black" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: 'Popular Games',
          title: 'populargames',
          headerTitleStyle: {
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#bf1313',
            height: 100,
          },
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitle: 'Popular Reviews',
          headerTitleStyle: {
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#bf1313',
            height: 100,
          },
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{
          headerTitle: 'Top100 Games',
          headerTitleStyle: {
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#bf1313',
            height: 100,
          },
        }}
      />
    </TabThreeStack.Navigator>
  );
}
