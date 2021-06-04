import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
} from 'react';
import { Context } from '../listbox/listbox.js';
import styles from './list-option.css';
import {
  useEffect,
  useRef,
  useState,
} from '../../hooks';

const ListOption = forwardRef(function ListOption(props, forwardedRef) {
  const onChange = useContext(Context);
  const ref = useRef(forwardedRef);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(props.selected, { sync: true });
  const refs = {
    container: useRef(),
  };

  function onMouseDown(event) {
    event.preventDefault();
  }

  function onClick() {
    setSelected(state => !state);
    setActive(true);
    refs.container.current.focus();
  }

  function onKeyDown(event) {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        setSelected(state => !state);
        break;
      default:
    }
  }

  useEffect(() => {
    if (selected === props.selected) return;
    props.onChange({ target: ref.current });
    onChange({ target: ref.current });
  }, [selected], { mounted: true });

  useImperativeHandle(ref, () => ({
    contains: (node) => refs.container.current.contains(node),
    focus: () => {
      setActive(true);
      refs.container.current.focus();
    },
    selected,
    setAttribute: (attribute, value) => {
      switch (attribute) {
        case 'selected':
          setSelected(!!value);
          break;
        case 'tabindex':
          setActive(value !== -1);
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
      onMouseDown={onMouseDown}
      ref={refs.container}
      role="option"
      tabIndex={active ? 0 : -1}
    >
      {props.children}
    </li>
  );
});

ListOption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

ListOption.defaultProps = {
  children: undefined,
  className: styles.container,
  onChange: () => {},
  selected: false,
};

export default ListOption;
