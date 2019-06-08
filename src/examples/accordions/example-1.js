import React from 'react';
import Example from '../example.js';
import { Accordion, Section } from '../../accordion';

function CustomTitle({ open, title }) { // eslint-disable-line react/prop-types
  return (
    <React.Fragment>
      <span>{title}</span>
      <span style={{ float: 'right' }}>{open ? '-' : '+'}</span>
    </React.Fragment>
  );
}

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
          <Section
            headingLevel={3}
            onClick={this.handleClick('first')}
            open={this.state.first}
            title={({ open }) => <CustomTitle open={open} title="First" />}
          >
            <span>
              A
            </span>
          </Section>
          <Section
            headingLevel={3}
            onClick={this.handleClick('second')}
            open={this.state.second}
            title={({ open }) => <CustomTitle open={open} title="Second" />}
          >
            <span>
              B
            </span>
          </Section>
          <Section
            headingLevel={3}
            onClick={this.handleClick('third')}
            open={this.state.third}
            title={({ open }) => <CustomTitle open={open} title="Third" />}
          >
            <span>
              C
            </span>
          </Section>
        </Accordion>
      </Example>
    );
  }
}
