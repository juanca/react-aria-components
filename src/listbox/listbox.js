import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import useActiveIndex from '../hooks/use-active-index.js';
import useRef from '../hooks/use-ref.js';

const Listbox = forwardRef(function Listbox(props, forwardedRef) {
  const ref = useRef(forwardedRef);
  const [active, setActive] = useState(false);
  const {
    activeIndex,
    setActiveIndex,
    setFirstActiveIndex,
    setLastActiveIndex,
    setNextActiveIndex,
    setPreviousActiveIndex,
  } = useActiveIndex(0, props.refs.length - 1);

  function onFocus(event) {
    const nextActiveIndex = props.refs.findIndex(childRef => (
      childRef.current.contains(event.target)
    ));
    if (nextActiveIndex !== -1) setActiveIndex(nextActiveIndex);
    setActive(true);
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setNextActiveIndex();
        break;
      case 'ArrowUp':
        event.preventDefault();
        setPreviousActiveIndex();
        break;
      case 'End':
        event.preventDefault();
        setLastActiveIndex();
        break;
      case 'Home':
        event.preventDefault();
        setFirstActiveIndex();
        break;
      default:
    }
  }

  useEffect(() => {
    if (active) {
      props.refs.forEach((childRef, index) => {
        if (index === activeIndex) {
          childRef.current.focus();
          childRef.current.setAttribute('tabindex', 0);
        } else {
          childRef.current.setAttribute('tabindex', -1);
        }
      });
    }
  }, [active, activeIndex]);

  useImperativeHandle(ref, () => ({
    focus: () => props.refs[activeIndex].current.focus(),
  }));

  return (
    <ul
      aria-labelledby={props.labelledBy}
      className={props.className}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      role="listbox"
    >
      {props.children}
    </ul>
  );
});

Listbox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  labelledBy: PropTypes.string.isRequired,
  refs: PropTypes.arrayOf(PropTypes.shape({
    current: PropTypes.any,
  })),
};

Listbox.defaultProps = {
  children: undefined,
  className: undefined,
  refs: [],
};

export default Listbox;
