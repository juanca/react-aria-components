import React from 'react';
import PropTypes from 'prop-types';

export default function Section({ children, open, title, onClick }) {
  const titleVal = typeof title === 'function' ? title({ open, onClick }) : <button type="button" onClick={onClick}>{title}</button>;

  return (
    <React.Fragment>
      { titleVal }
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
