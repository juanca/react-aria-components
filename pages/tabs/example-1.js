import React from 'react';

import Example from '../example.js';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
} from '../../src/tabs/index.js';

export default class TabsExample extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    return (
      <Example title="Tabs">
        <Tabs
          activeIndex={this.state.activeIndex}
          onActivateTab={index => this.setState({ activeIndex: index })}
        >
          <TabList>
            <Tab>
              Tacos
            </Tab>
            <Tab>
              Burritos
            </Tab>
            <Tab>
              Churros
            </Tab>
          </TabList>
          <TabPanels hasFocusableContent={false}>
            <div>
              Delicious!
            </div>
            <div>
              Just big tacos
            </div>
            <div>
              Mmmmmmmmmmm...
            </div>
          </TabPanels>
        </Tabs>
      </Example>
    );
  }
}
