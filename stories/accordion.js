import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import StateDecorator from './utils/state-decorator.js';
import { Accordion, Section } from '../src/accordion';

storiesOf('Accordion', module)
  .addDecorator(storyFn => <StateDecorator storyFn={storyFn} />)
  .add('default', ({ state, setState }) => (
    <Accordion>
      <Section
        headingLevel={3}
        onClick={() => setState({ first: !state.first })}
        open={state.first}
        title={({ open }) => (open ? '- First' : '+ First')}
      >
        <span>
          A
        </span>
      </Section>
      <Section
        headingLevel={3}
        onClick={() => setState({ second: !state.second })}
        open={state.second}
        title={({ open }) => (open ? '- Second' : '+ Second')}
      >
        <span>
          B
        </span>
      </Section>
      <Section
        headingLevel={3}
        onClick={() => setState({ third: !state.third })}
        open={state.third}
        title={({ open }) => (open ? '- Third' : '+ Third')}
      >
        <span>
          C
        </span>
      </Section>
    </Accordion>
  ));
