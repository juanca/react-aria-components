import React from 'react';
import PropTypes from 'prop-types';

export default function Section({ children, open, title, onClick }) {
  const titleVal = typeof title === 'function' ? title({ open }) : title;

  return (
    <React.Fragment>
      <div role="heading">
        <button aria-expanded={open} type="button" onClick={onClick}>{titleVal}</button>
      </div>
      { open && (
        <div>
          { children }
        </div>
      )}
    </React.Fragment>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onClick: PropTypes.func,
};

Section.defaultProps = {
  open: false,
  title: undefined,
  onClick: undefined,
};
