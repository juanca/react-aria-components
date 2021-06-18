import React, {
  createContext,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import {
  useActiveIndex,
  useEffect,
  useRef,
  useState,
} from '../../hooks/index.js';

const ChangeHandler = createContext(() => {});
const SelectHandler = createContext(() => {});
const Mode = createContext('single');

function getInitialValue(value, multiple) {
  if (value) {
    return multiple ? value : [value];
  }

  return [];
}

const Listbox = forwardRef(function Listbox(props, forwardedRef) {
  const ref = useRef(forwardedRef, { forwarded: true });
  const {
    activeIndex,
    setActiveIndex,
    setFirstActiveIndex,
    setLastActiveIndex,
    setNextActiveIndex,
    setPreviousActiveIndex,
  } = useActiveIndex(0, props.refs.length - 1);
  const [value, setValue] = useState(getInitialValue(
    props.value,
    props.multiple,
  ));
  const refs = {
    container: useRef(),
  };

  function onClick(event) {
    const focusedChildIndex = props.refs.findIndex((childRef) => (
      childRef.current.contains(event.target)
    ));

    if (focusedChildIndex === -1) {
      setActiveIndex(-1); // Focus "body"
    } else {
      setActiveIndex(focusedChildIndex);
    }
  }

  function onKeyDown(event) {
    if (!['ArrowDown', 'ArrowUp', 'End', 'Home'].includes(event.key)) return;

    event.preventDefault();
    if (activeIndex.current > -1) props.refs[activeIndex.current].current.setAttribute('tabindex', -1);

    switch (event.key) {
      case 'ArrowDown': setNextActiveIndex(); break;
      case 'ArrowUp': setPreviousActiveIndex(); break;
      case 'End': setLastActiveIndex(); break;
      case 'Home': setFirstActiveIndex(); break;
      default:
    }

    props.refs[activeIndex.current].current.setAttribute('tabindex', 0);
    props.refs[activeIndex.current].current.focus();
  }

  const onChange = useCallback(function onChange(event) {
    if (event.target.selected) {
      if (props.multiple) {
        setValue((state) => [...state, event.target.value]);
      } else {
        props.refs
          .filter((childRef) => childRef.current.selected)
          .filter((childRef) => childRef.current !== event.target)
          .forEach((childRef) => childRef.current.setAttribute('selected', false));
        setValue([event.target.value]);
      }
    } else {
      setValue((state) => state.filter((val) => val !== event.target.value));
    }
  }, [setValue, props.refs]);

  useEffect(() => {
    props.onChange({ target: ref.current });
  }, [value], { mounted: true });

  useImperativeHandle(ref, () => ({
    focus: (options = {}) => {
      switch (options.option) {
        case 'next': setNextActiveIndex(); break;
        case 'previous': setPreviousActiveIndex(); break;
        case 'first': setFirstActiveIndex(); break;
        case 'last': setLastActiveIndex(); break;
        default:
      }

      if (activeIndex.current === -1) refs.container.current.focus();
      else props.refs[activeIndex.current].current.focus();
    },
    value: props.multiple ? value : value[0],
  }));

  return (
    <ul
      aria-labelledby={props.labelledBy}
      aria-multiselectable={props.multiple}
      className={props.className}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={refs.container}
      role="listbox"
      tabIndex={props.active ? 0 : -1}
    >
      <Mode.Provider value={props.multiple ? 'multiple' : 'single'}>
        <ChangeHandler.Provider value={onChange}>
          <SelectHandler.Provider value={props.onSelect}>
            {props.children}
          </SelectHandler.Provider>
        </ChangeHandler.Provider>
      </Mode.Provider>
    </ul>
  );
});

Listbox.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  labelledBy: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  refs: PropTypes.arrayOf(PropTypes.shape({
    current: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  })),
  value: PropTypes.oneOfType([
    PropTypes.any, // eslint-disable-line react/forbid-prop-types
    PropTypes.arrayOf(PropTypes.any),
  ]),
};

Listbox.defaultProps = {
  active: false,
  children: undefined,
  className: undefined,
  multiple: false,
  onChange: () => {},
  onSelect: () => {},
  refs: [],
  value: undefined,
};

export default Listbox;
export {
  ChangeHandler,
  SelectHandler,
  Mode,
};
