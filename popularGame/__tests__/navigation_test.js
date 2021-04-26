/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
// eslint-disable-next-line import/no-unresolved
import { render, fireEvent } from '@testing-library/react-native';
import { GameInfo } from '../src/views/GameView';
import { TOP_DATA } from '../mockData';

describe('To Article', () => {
  /**
   * Button navigation for popular tab
   */
  it('navigates on button press', () => {
    const navigate = jest.fn();
    const { getByTestId } = render(<GameInfo game={TOP_DATA} navigation={{ navigate }} />);
    fireEvent.press(getByTestId('navigation'));
    expect(navigate).toHaveBeenCalledWith('Article');
  });
});
