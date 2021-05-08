import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Listbox from '../listbox/listbox.js';
import styles from './combo-box.css';
import useDidMount from '../../hooks/use-did-mount.js';
import useRef from '../../hooks/use-ref.js';

const ComboBox = forwardRef(function FormSelect(props, forwardedRef) {
  const [didMount] = useDidMount();
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.value);
  const inputRef = useRef();
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
    if (didMount) {
      props.onValueChange({ target: ref.current });
    }
  }, [value]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    value,
  }));

  const labelId = `${props.id}-label`;
  const listboxClass = expanded ? styles.expanded : styles.collapsed;

  return (
    <div
      className={styles.container}
      onClick={onClick}
      role="presentation"
    >
      <label
        className={styles.label}
        id={labelId}
      >
        {props.label}
      </label>
      <input
        aria-labelledby={labelId}
        className={styles.input}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        ref={inputRef}
        tabIndex="0"
        value={value}
      />
      <Listbox
        className={listboxClass}
        labelledBy={labelId}
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
  onValueChange: PropTypes.func,
  refs: PropTypes.arrayOf(PropTypes.shape({
    current: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  })).isRequired,
  value: PropTypes.string,
};

ComboBox.defaultProps = {
  onValueChange: () => {},
  value: '',
};

export default ComboBox;
