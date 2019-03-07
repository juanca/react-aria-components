import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import StateDecorator from './utils/state-decorator.js';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
} from '../src/tabs';

storiesOf('Tabs', module)
  .addDecorator(storyFn => (
    <StateDecorator
      initialState={{ activeIndex: 0 }}
      storyFn={storyFn}
    />
  ))
  .add('default', ({ state, setState }) => (
    <Tabs
      activeIndex={state.activeIndex}
      onActivateTab={index => setState({ activeIndex: index })}
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
  ));
