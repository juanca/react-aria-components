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
  const [selected, setSelected] = useState(props.selected);

  function onClick() {
    setSelected(true);
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        setSelected(true);
        break;
      default:
    }
  }

  useEffect(() => {
    if (active && focusQueued) {
      setFocusQueued(false);
      containerRef.current.focus();
    }
  }, [focusQueued]);

  useImperativeHandle(ref, () => ({
    contains: node => containerRef.current.contains(node),
    focus: () => {
      setActive(true);
      setFocusQueued(true);
    },
    setAttribute: (attribute, value) => {
      switch (attribute) {
        case 'tabindex':
          if (value === -1) {
            setActive(false);
          } else {
            setActive(true);
          }
          break;
        default:
      }
    },
  }));

  return (
    <li
      aria-selected={selected}
      className={props.className}
      onClick={onClick}
      onKeyDown={onKeyDown}
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
  className: PropTypes.string,
  selected: PropTypes.bool,
};

ListOption.defaultProps = {
  className: undefined,
  selected: false,
};

export default ListOption;
