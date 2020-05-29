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

  function onClick(event) {
    const htmlFor = event.target.getAttribute('for');
    const nextPanel = refs.find(ref => ref.current.id === htmlFor);
    const otherPanels = refs.filter(ref => ref !== nextPanel);

    nextPanel.current.open();
    otherPanels.forEach(ref => ref.current.close());
  }

  return (
    <React.Fragment>
      <AccordionHeader htmlFor="personal-information" onClick={onClick}>
        Personal Information
      </AccordionHeader>
      <AccordionPanel id="personal-information" ref={refs[0]}>
        Foo
      </AccordionPanel>
      <AccordionHeader htmlFor="billing-address" onClick={onClick}>
        Billing Address
      </AccordionHeader>
      <AccordionPanel id="billing-address" ref={refs[1]}>
        Bar
      </AccordionPanel>
      <AccordionHeader htmlFor="shipping-address" onClick={onClick}>
        Shipping Address
      </AccordionHeader>
      <AccordionPanel id="shipping-address" ref={refs[2]}>
        Baz
      </AccordionPanel>
    </React.Fragment>
  );
}
