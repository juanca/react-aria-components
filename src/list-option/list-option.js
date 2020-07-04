import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import useDidMount from '../hooks/use-did-mount.js';
import useRef from '../hooks/use-ref.js';

const ListOption = forwardRef(function ListOption(props, forwardedRef) {
  const containerRef = useRef();
  const ref = useRef(forwardedRef);
  const [active, setActive] = useState(true);
  const [didMount] = useDidMount();
  const [focusQueued, setFocusQueued] = useState(false);
  const [selected, setSelected] = useState(props.selected);

  function onClick() {
    setSelected(!selected);
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        setSelected(!selected);
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

  useEffect(() => {
    if (didMount) {
      props.onSelectChange({ target: ref.current });
    }
  }, [selected]);

  useImperativeHandle(ref, () => ({
    contains: node => containerRef.current.contains(node),
    focus: () => {
      setActive(true);
      setFocusQueued(true);
    },
    selected,
    setAttribute: (attribute, value) => {
      switch (attribute) {
        case 'selected':
          setSelected(value);
          break;
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
    value: props.value,
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
  onSelectChange: PropTypes.func,
  selected: PropTypes.bool,
  value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

ListOption.defaultProps = {
  className: undefined,
  onSelectChange: () => {},
  selected: false,
};

export default ListOption;
