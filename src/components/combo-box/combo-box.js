import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Listbox from '../listbox/listbox.js';
import styles from './combo-box.css';
import useMounted from '../../hooks/use-mounted.js';
import useRef from '../../hooks/use-ref.js';

const ComboBox = forwardRef(function FormSelect(props, forwardedRef) {
  const mounted = useMounted();
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.value);
  const classNames = {
    container: styles.container,
    input: styles.input,
    label: styles.label,
    listbox: expanded ? styles.expanded : styles.collapsed,
  };
  const ids = {
    label: `${props.id}-label`,
  };
  const refs = {
    input: useRef(),
  };
  const ref = useRef(forwardedRef);

  function onClick() {
    setExpanded(true);
  }

  function onInputChange() {
  }

  function onInputKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        setExpanded(false);
        break;
      default:
    }
  }

  function onListboxValueChange(event) {
    setValue(event.target.value);
    setExpanded(false);
  }

  useEffect(() => {
    if (!mounted) return;
    props.onChange({ target: ref.current });
  }, [value]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    focus: () => refs.input.current.focus(),
    value,
  }));

  return (
    <div
      className={classNames.container}
      onClick={onClick}
      role="presentation"
    >
      <label
        className={classNames.label}
        id={ids.label}
      >
        {props.label}
      </label>
      <input
        aria-labelledby={ids.label}
        className={classNames.input}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        ref={refs.input}
        tabIndex="0"
        value={value}
      />
      <Listbox
        className={classNames.listbox}
        labelledBy={ids.label}
        onValueChange={onListboxValueChange}
        refs={props.refs}
      >
        {({ onSelectChange }) => (
          props.children({ onSelectChange })
        )}
      </Listbox>
    </div>
  );
});

ComboBox.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  refs: PropTypes.arrayOf(PropTypes.shape({
    current: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  })).isRequired,
  value: PropTypes.string,
};

ComboBox.defaultProps = {
  onChange: () => {},
  value: '',
};

export default ComboBox;
