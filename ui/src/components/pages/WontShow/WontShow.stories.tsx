import * as React from 'react';

import { storiesOf } from '@storybook/react';
import WontShow, { WontShowProps } from './WontShow';

const props: WontShowProps = { 
  airports: [{
    code: 'PTY',
    name: 'Tocumen International Airport',
  }],
  isLoading: false,
  handleSearchWontShow: () => console.log('handle search'),
  noShow: undefined,
};

storiesOf('WontShow', module)
  .add('with data', () => (
    <WontShow { ...props } />
  ))
  .add('when loading', () => (
    <WontShow { ...props } isLoading={true} />
  ))
  .add('with no airports', () => (
    <WontShow { ...props } airports={[]} />
  ))
