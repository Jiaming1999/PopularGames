/* eslint-disable react/jsx-filename-extension */
// eslint-disable-next-line no-use-before-define
import * as React from 'react';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

/**
 * Loading View for all data loading action
 * @returns
 */
const LoadingView = () => (
  <Placeholder
    Animation={Fade}
    Left={PlaceholderMedia}
    Right={PlaceholderMedia}
  >
    <PlaceholderLine width={80} />
    <PlaceholderLine />
    <PlaceholderLine width={30} />
  </Placeholder>
);

export default LoadingView;
