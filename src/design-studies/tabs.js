import React from 'react';

import Grid1 from './grid-1.js';
import Grid2 from './grid-2.js';
import Grid3 from './grid-3.js';

import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
} from '../tabs';

export default class TabsExample extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    return (
      <Tabs
        activeIndex={this.state.activeIndex}
        onActivateTab={index => this.setState({ activeIndex: index })}
      >
        <TabList>
          <Tab id="grid-1-label">Grid Concept 1</Tab>
          <Tab id="grid-2-label">Grid Concept 2</Tab>
          <Tab id="grid-3-label">Grid Concept 3</Tab>
        </TabList>
        <TabPanels hasFocusableContent>
          <Grid1 aria-labelledby="grid-1-label" />
          <Grid2 aria-labelledby="grid-2-label" />
          <Grid3 aria-labelledby="grid-2-label" />
        </TabPanels>
      </Tabs>
    );
  }
}
