import * as React from 'react';
import { shallow } from 'enzyme';
import initStoryshots from '@storybook/addon-storyshots';

import Test from './Test';

describe('<Test />', () => {
  initStoryshots({
    suite: 'Serialized Snapshots',
    storyKindRegex: /^Test$/,
    renderer: shallow,
  });
});
