import React, {
  useRef,
} from 'react';
import AccordionHeader from '../../src/accordion/accordion-header.js';
import AccordionPanel from '../../src/accordion/accordion-panel.js';

export default function Example1() {
  const refs = [
    useRef(),
    useRef(),
    useRef(),
  ];

  return (
    <React.Fragment>
      <AccordionHeader htmlFor="personal-information">
        Personal Information
      </AccordionHeader>
      <AccordionPanel id="personal-information" ref={refs[0]}>
        Foo
      </AccordionPanel>
      <AccordionHeader htmlFor="billing-address">
        Billing Address
      </AccordionHeader>
      <AccordionPanel id="billing-address" ref={refs[1]}>
        Bar
      </AccordionPanel>
      <AccordionHeader htmlFor="shipping-address">
        Shipping Address
      </AccordionHeader>
      <AccordionPanel id="shipping-address" ref={refs[2]}>
        Baz
      </AccordionPanel>
    </React.Fragment>
  );
}
