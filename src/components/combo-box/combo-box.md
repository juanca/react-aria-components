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
import ListOption from '../list-option/list-option.js';

const options = [
  { text: 'Option 1', value: 1 },
  { text: 'Option 2', value: 2 },
  { text: 'Option 3', value: 3 },
  { text: 'Option 4', value: 4 },
  { text: 'Option 5', value: 5 },
]
const refs = options.map(() => React.createRef());

<ComboBox id="example-1" label="Example 1" refs={refs}>
  {({ onSelectChange }) => options.map((option, i) => (
    <ListOption
      onSelectChange={onSelectChange}
      ref={refs[i]}
      value={options[i].value}
    >
      {options[i].text}
    </ListOption>
  ))}
</ComboBox>
```
