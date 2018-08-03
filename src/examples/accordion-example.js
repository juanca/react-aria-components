import React from 'react';
import Example from './example.js';
import { Accordion, Section } from '../accordion';

const customTitle = () => (
  <span>Third</span>
);

export default class AccordionExample extends React.Component {
  constructor() {
    super();
    this.state = {
      first: false,
      second: false,
      third: false,
    };
  }

  handleClick(which) {
    return () => {
      this.setState(state => ({
        first: false,
        second: false,
        third: false,
        [which]: !state[which],
      }));
    };
  }

  render() {
    return (
      <Example title="Accordion">
        <Accordion>
          <Section title="First" open={this.state.first} onClick={this.handleClick('first')}>
            <span>
              A
            </span>
          </Section>
          <Section title="Second" open={this.state.second} onClick={this.handleClick('second')}>
            <span>
              B
            </span>
          </Section>
          <Section title={customTitle} open={this.state.third} onClick={this.handleClick('third')}>
            <span>
              C
            </span>
          </Section>
        </Accordion>
      </Example>
    );
  }
}
