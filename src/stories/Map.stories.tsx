import { Meta, StoryFn } from '@storybook/react';
import Map from '../components/Map'; // Adjust the import path based on your project structure
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

export default {
  title: 'Map/InteractiveMap',
  component: Map,
} as Meta;

const Template: StoryFn = (args) => <Map {...args} />;

export const WithDrawing = Template.bind({});
WithDrawing.args = {
  // Add props or configurations to demonstrate the drawing functionality
};

WithDrawing.parameters = {
  docs: {
    description: {
      story: `
        ## Drawing Polygons

        This story demonstrates how to draw polygons using the map's integrated drawing tools.

        **How to Use:**
        1. Click anywhere on the map to create the first point of your polygon.
        2. Continue clicking to add more points.
        3. Double-click to finish drawing.

        **Editing:**
        - Drag any vertex to move it.
        - Right-click on a vertex to remove it.
        - Click on an edge to add a new vertex.

        **Note:** If you try to draw a polygon that intersects with another, the polygon will turn red.
      `,
    },
  },
};
