`Combobox` enforces common practices for accessible selects in a form.

Relevant documentation for WAI-ARIA 1.1:
- [Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox)
- [`combobox` role](https://www.w3.org/TR/wai-aria-1.1/#combobox)
- [`textbox` role](https://www.w3.org/TR/wai-aria-1.1/#textbox)
- [`listbox` role](https://www.w3.org/TR/wai-aria-1.1/#listbox)

### Keyboard Support

| Element | Key | Description |
| --- | --- | --- |

### Label Support

| Element | Label |
| --- | --- |
| Input | Labelled by the label prop |

### React ref API

| Property | Type | Description |
| --- | --- | --- |
| focus | function | Focuses the input |
| value | any | The selected value |

### Examples of Combobox with Listbox Popup

#### Example 1: List Autocomplete with Manual Selection

```js
import RefExample, {Context} from '../ref-example.js';
import Combobox from './combobox.js';
import ListOption from '../list-option/list-option.js';
import {options} from '../../site/combobox.js';

const ref = React.useRef();

const [visibleOptions, setVisibleOptions] = React.useState(options);

function onChange(event) {
  setVisibleOptions(options.filter(option => RegExp(event.target.value, 'i').test(option.label)));
}

function onInput(event) {
  setVisibleOptions(options.filter(option => RegExp(event.target.value, 'i').test(option.label)));
}

<RefExample ref={ref}>
  <Context.Consumer>
    {(updateRefExample) => (
      <Combobox
        id="example-1"
        label="Choice 1 Fruit or Vegetable"
        onChange={(event) => {
          onChange(event);
          updateRefExample();
        }}
        onInput={(event) => {
          onInput(event);
          updateRefExample();
        }}
        ref={ref}
        refs={visibleOptions.map(option => option.ref)}
      >
        {visibleOptions.map(option => (
          <ListOption key={option.label} ref={option.ref} value={option.label}>
            {option.label}
          </ListOption>
        ))}
      </Combobox>
    )}
  </Context.Consumer>
</RefExample>;
```

#### Example 2: List Autocomplete with Automatic Selection

```js
import RefExample, {Context} from '../ref-example.js';
import Combobox from './combobox.js';
import ListOption from '../list-option/list-option.js';
import {
  filterByText,
  options,
} from '../../site/combobox.js';
import styles from './combobox.example.css';

const ref = React.useRef();

const [visibleOptions, setVisibleOptions] = React.useState(filterByText(options, ''));

function onChange(event) {
  setVisibleOptions(filterByText(options, event.target.value));
}

function onInput(event) {
  setVisibleOptions(filterByText(options, event.target.value));
}

<RefExample ref={ref}>
  <Context.Consumer>
    {(updateRefExample) => (
      <Combobox
        id="example-2"
        label="Choice 2 Fruit or Vegetable"
        onChange={(event) => {
          onChange(event);
          updateRefExample();
        }}
        onInput={(event) => {
          onInput(event);
          updateRefExample();
        }}
        ref={ref}
        refs={visibleOptions.map(option => option.ref)}
      >
        {visibleOptions.map((option, i) => (
          <ListOption
            className={styles.option}
            key={option.label}
            ref={option.ref}
            selected={i === 0}
            toggle={false}
            value={option.label}
          >
            {option.label}
          </ListOption>
        ))}
      </Combobox>
    )}
  </Context.Consumer>
</RefExample>;
```

### Examples of Combobox with Grid Popup
