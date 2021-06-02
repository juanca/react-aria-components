import React, {
  createContext,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import useActiveIndex from '../../hooks/use-active-index.js';
import useMountedEffect from '../../hooks/use-mounted-effect.js';
import useRef from '../../hooks/use-ref.js';

const Context = createContext(() => {});

function getInitialValue(value, multiple) {
  if (value) {
    return multiple ? value : [value];
  }

  return [];
}

const Listbox = forwardRef(function Listbox(props, forwardedRef) {
  const ref = useRef(forwardedRef);
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
    props.refs[activeIndex.current].current.focus()
  }

  const onSelectChange = useCallback(function onSelectChange(event) {
    if (event.target.selected) {
      if (props.multiple) {
        setValue(value => [...value, event.target.value]);
      } else {
        const previouslySelected = props.refs.find((childRef) => (
          childRef.current.selected && childRef.current !== event.target
        ));
        if (previouslySelected) {
          previouslySelected.current.setAttribute('selected', false);
        }
        setValue([event.target.value]);
      }
    } else {
      setValue(value => value.filter((val) => val !== event.target.value));
    }
  }, [setValue, props.refs]);

  useMountedEffect(() => {
    props.onChange({ target: ref.current });
  }, [value]);

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
      else props.refs[activeIndex.current].current.focus()
    },
    setValue: (state) => setValue(getInitialValue(state, props.multiple)),
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
      <Context.Provider value={onSelectChange}>
        {props.children}
      </Context.Provider>
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
  refs: [],
  value: undefined,
};

export default Listbox;
export { Context };
