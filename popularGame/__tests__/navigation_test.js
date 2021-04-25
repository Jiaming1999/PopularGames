/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// eslint-disable-next-line import/no-unresolved
import { render, fireEvent } from '@testing-library/react-native';
import { TabOneNavigator, TabThreeNavigator } from '../src/navigation/BottomTabNavigator.tsx';

describe('To Article', () => {
  /**
   * Button navigation for popular tab
   */
  it('navigates on button press', async () => {
    const component = (
      <NavigationContainer>
        <TabOneNavigator />
      </NavigationContainer>
    );

    const { findByText } = render(component);
    const onClick = await findByText('game');
    fireEvent(onClick, 'press');
    const newHeader = await findByText('Article');

    expect(newHeader).toBeTruthy();
  });

  /**
   * Button navigation for top100 tab
   */
  it('navigates on button press', () => {
    const component = (
      <NavigationContainer>
        <TabThreeNavigator />
      </NavigationContainer>
    );

    const { findByText } = render(component);
    fireEvent.press(findByText('game'));
    const newHeader = findByText('Article');

    expect(newHeader).toBeTruthy();
  });
});
