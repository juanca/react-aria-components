import React from 'react';
import AccordionHeader from '../../src/accordion/accordion-header.js';
import AccordionPanel from '../../src/accordion/accordion-panel.js';

export default function AccordionsExample1() {
  return (
    <React.Fragment>
      <AccordionHeader>Personal Information</AccordionHeader>
      <AccordionPanel>Foo</AccordionPanel>
      <AccordionHeader>Billing Address</AccordionHeader>
      <AccordionPanel>Bar</AccordionPanel>
      <AccordionHeader>Shipping Address</AccordionHeader>
      <AccordionPanel>Baz</AccordionPanel>
    </React.Fragment>
  );
}
