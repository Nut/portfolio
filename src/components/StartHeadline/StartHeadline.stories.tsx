import React from 'react';
// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { StartHeadline } from './StartHeadline';
export default {
  component: StartHeadline,
  title: 'StartHeadline'
  // Our exports that end in "Data" are not stories.
  //   excludeStories: /.*Data$/
};

export const Default = (): JSX.Element => {
  return <StartHeadline />;
};
