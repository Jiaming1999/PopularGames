/* eslint-disable react/jsx-filename-extension */
/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/PopularGameScreen';
import TabTwoScreen from '../screens/PopularReviewScreen';
import TabThreeScreen from '../screens/TopGameScreen';
import TabFourScreen from '../screens/TopGameReviewScreen';
import ReviewPage from '../views/ReviewView';
import {
  BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList
} from '../../types';

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
        name="TrendFilter"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: () => <FontAwesome5 name="hotjar" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="TopGame"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: () => <Ionicons name="md-trophy-sharp" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="TopFilter"
        component={TabFourNavigator}
        options={{
          tabBarIcon: () => <Feather name="trending-up" size={24} color="black" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

export function TabOneNavigator() {
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
      <TabOneStack.Screen
        name='Article'
        component={ReviewPage}
        options={{
          headerTitle: 'Article',
          title: 'articles',
          headerTintColor: 'white',
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

export function TabThreeNavigator() {
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
      <TabThreeStack.Screen
        name='Article'
        component={ReviewPage}
        options={{
          headerTitle: 'Article',
          title: 'articles',
          headerTintColor: 'white',
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

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="TabFourScreen"
        component={TabFourScreen}
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
    </TabFourStack.Navigator>
  );
}
