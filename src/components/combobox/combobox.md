`Combobox` enforces common practices for accessible selects in a form.
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

### Examples of Combobox with Listbox Popup

#### Example 1: List Autocomplete with Manual Selection

```js
import RefExample, { Context } from '../ref-example.js';
import ListOption from '../list-option/list-option.js';

const ref = React.createRef();
const options = [
  { label: 'Apple', ref: React.createRef() },
  { label: 'Artichoke', ref: React.createRef() },
  { label: 'Asparagus', ref: React.createRef() },
  { label: 'Banana', ref: React.createRef() },
  { label: 'Beets', ref: React.createRef() },
  { label: 'Bell pepper', ref: React.createRef() },
  { label: 'Broccoli', ref: React.createRef() },
  { label: 'Brussels sprout', ref: React.createRef() },
  { label: 'Cabbage', ref: React.createRef() },
  { label: 'Carrot', ref: React.createRef() },
  { label: 'Cauliflower', ref: React.createRef() },
  { label: 'Celery', ref: React.createRef() },
  { label: 'Chard', ref: React.createRef() },
  { label: 'Chicory', ref: React.createRef() },
  { label: 'Corn', ref: React.createRef() },
  { label: 'Cucumber', ref: React.createRef() },
  { label: 'Daikon', ref: React.createRef() },
  { label: 'Date', ref: React.createRef() },
  { label: 'Edamame', ref: React.createRef() },
  { label: 'Eggplant', ref: React.createRef() },
  { label: 'Elderberry', ref: React.createRef() },
  { label: 'Fennel', ref: React.createRef() },
  { label: 'Fig', ref: React.createRef() },
  { label: 'Garlic', ref: React.createRef() },
  { label: 'Grape', ref: React.createRef() },
  { label: 'Honeydew melon', ref: React.createRef() },
  { label: 'Iceberg lettuce', ref: React.createRef() },
  { label: 'Jerusalem artichoke', ref: React.createRef() },
  { label: 'Kale', ref: React.createRef() },
  { label: 'Kiwi', ref: React.createRef() },
  { label: 'Leek', ref: React.createRef() },
  { label: 'Lemon', ref: React.createRef() },
  { label: 'Mango', ref: React.createRef() },
  { label: 'Mangosteen', ref: React.createRef() },
  { label: 'Melon', ref: React.createRef() },
  { label: 'Mushroom', ref: React.createRef() },
  { label: 'Nectarine', ref: React.createRef() },
  { label: 'Okra', ref: React.createRef() },
  { label: 'Olive', ref: React.createRef() },
  { label: 'Onion', ref: React.createRef() },
  { label: 'Orange', ref: React.createRef() },
  { label: 'Parship', ref: React.createRef() },
  { label: 'Pea', ref: React.createRef() },
  { label: 'Pear', ref: React.createRef() },
  { label: 'Pineapple', ref: React.createRef() },
  { label: 'Potato', ref: React.createRef() },
  { label: 'Pumpkin', ref: React.createRef() },
  { label: 'Quince', ref: React.createRef() },
  { label: 'Radish', ref: React.createRef() },
  { label: 'Rhubarb', ref: React.createRef() },
  { label: 'Shallot', ref: React.createRef() },
  { label: 'Spinach', ref: React.createRef() },
  { label: 'Squash', ref: React.createRef() },
  { label: 'Strawberry', ref: React.createRef() },
  { label: 'Sweet potato', ref: React.createRef() },
  { label: 'Tomato', ref: React.createRef() },
  { label: 'Turnip', ref: React.createRef() },
  { label: 'Ugli fruit', ref: React.createRef() },
  { label: 'Victoria plum', ref: React.createRef() },
  { label: 'Watercress', ref: React.createRef() },
  { label: 'Watermelon', ref: React.createRef() },
  { label: 'Yam', ref: React.createRef() },
  { label: 'Zucchini', ref: React.createRef() },
];

<RefExample ref={ref}>
  <Context.Consumer>
    {(onChange) => (
      <Combobox
        id="example-1"
        label="Choice 1 Fruit or Vegetable"
        onChange={onChange}
        ref={ref}
        refs={options.map(option => option.ref)}
      >
        {options.map(option => (
          <ListOption key={option.label} ref={option.ref} value={option.label}>
            {option.label}
          </ListOption>
        ))}
      </Combobox>
    )}
  </Context.Consumer>
</RefExample>;
```

### Examples of Combobox with Grid Popup
