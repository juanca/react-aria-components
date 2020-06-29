import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import useRef from '../hooks/use-ref.js';

const ListOption = forwardRef(function ListOption(props, forwardedRef) {
  const containerRef = useRef();
  const ref = useRef(forwardedRef);
  const [active, setActive] = useState(true);
  const [focusQueued, setFocusQueued] = useState(false);

  useEffect(() => {
    if (active && focusQueued) {
      setFocusQueued(false);
      containerRef.current.focus();
    }
  }, [focusQueued]);

  useImperativeHandle(ref, () => ({
    blur: () => {
      setActive(false);
    },
    contains: node => containerRef.current.contains(node),
    focus: () => {
      setActive(true);
      setFocusQueued(true);
    },
  }));

  return (
    <li
      aria-selected={props.selected}
      ref={containerRef}
      role="option"
      tabIndex={active ? 0 : -1}
    >
      {props.children}
    </li>
  );
});

ListOption.propTypes = {
  children: PropTypes.node.isRequired,
};

ListOption.defaultProps = {
};

export default ListOption;
