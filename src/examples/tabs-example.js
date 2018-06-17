import React from 'react';
import Tabs from '../tabs.js';
import TabList from '../tab-list.js';
import Tab from '../tab.js';
import TabPanels from '../tab-panels.js';

export default class extends React.Component {
  constructor() {
    super();
    this.state = { activeIndex: 0 };
  }

  render() {
    return (
      <Tabs activeIndex={this.state.activeIndex} onActivateTab={index => this.setState({ activeIndex: index })}>
        <TabList>
          <Tab>Tacos</Tab>
          <Tab>Burritos</Tab>
        </TabList>
        <TabPanels>
          <div>Delicious!</div>
          <div>Just big tacos</div>
        </TabPanels>
      </Tabs>
    );
  }
}
