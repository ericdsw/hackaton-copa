import { configure } from '@storybook/react';

let req: any;
if (process.env.NODE_ENV === 'test') {
  const requireContext = require('require-context.macro');
  req = requireContext('../src', true, /\.stories\.tsx$/);
} else {
  req = require.context('../src', true, /\.stories\.tsx$/);
}

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
