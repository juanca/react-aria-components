`ComboBox` enforces common practices for accessible selects in a form.
See [WAI ARIA Authoring Practices 1.1 documentation.](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox)

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

### Examples

```js
import RefExample, { Context } from '../ref-example.js';
import ListOption from '../list-option/list-option.js';

const ref = React.createRef();
const options = [
  {ref: React.createRef(), text: 'Option 1', value: 1},
  {ref: React.createRef(), text: 'Option 2', value: 2},
  {ref: React.createRef(), text: 'Option 3', value: 3},
  {ref: React.createRef(), text: 'Option 4', value: 4},
  {ref: React.createRef(), text: 'Option 5', value: 5},
];

<RefExample ref={ref}>
  <Context.Consumer>
    {(onChange) => (
      <ComboBox
        id="example-1"
        label="Example 1"
        onChange={onChange}
        ref={ref}
        refs={options.map(option => option.ref)}
      >
        {options.map(option => (
          <ListOption key={option.value} ref={option.ref} value={option.value}>
            {option.text}
          </ListOption>
        ))}
      </ComboBox>
    )}
  </Context.Consumer>
</RefExample>;
```
