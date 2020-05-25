import React from 'react';

export default function AccordionHeader(props) {
  return (
    <button {...props} type="button">
      Accordion Header
    </button>
  );
}

AccordionHeader.propTypes = {
};

AccordionHeader.defaultProps = {
};
