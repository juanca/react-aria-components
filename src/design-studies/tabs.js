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
          <Tab>Grid 1</Tab>
          <Tab>Grid 2</Tab>
          <Tab>Grid 3</Tab>
        </TabList>
        <TabPanels hasFocusableContent>
          <Grid1 />
          <Grid2 />
          <Grid3 />
        </TabPanels>
      </Tabs>
    );
  }
}
