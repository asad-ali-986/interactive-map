import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Map from '../components/Map';
import PolygonDraw from '../components/PolygonDraw';

export default {
  title: 'Map/PolygonEdit',
  component: PolygonDraw,
} as Meta;

const Template: StoryFn = (args) => (
  <Map>
    <PolygonDraw {...args} />
  </Map>
);

export const Default = Template.bind({});
Default.args = {};
