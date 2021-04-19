/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// eslint-disable-next-line import/no-unresolved
import { render, fireEvent } from '@testing-library/react-native';
import { TabOneNavigator } from '../src/navigation/BottomTabNavigator.tsx';

describe('To Article', () => {
  it('navigates on button press', () => {
    const component = (
      <NavigationContainer>
        <TabOneNavigator />
      </NavigationContainer>
    );

    const { findByText } = render(component);
    fireEvent.press(findByText('game'));
    const newHeader = findByText('Article');

    expect(newHeader).toBeTruthy();
  });
});
