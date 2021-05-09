`ListOption` is a convenience component for the w3 [`option` role](https://www.w3.org/WAI/PF/aria/roles#option).
All list options should be nested in a `Listbox`.

### Interaction Support

| Element | Action | Description |
| --- | --- | --- |
| ListOption | Click/Space | Toggle `selected` state |

### Label Support

| Element | Label |
| --- | --- |
| ListOption | Text content |

### React ref API

| Property | Type | Description |
| --- | --- | --- |
| contains | function | Determines whether a node is a descendant of the component |
| focus | function | Activates the component and sets focus on the component |
| selected | boolean | Exposes the `selected` state |
| setAttribute | function | Sets the `selected` state via `selected` attribute; Toggle `active` state via `tabindex` attribute |
| value | any | Exposes the `value` prop |

### Examples

```js
import styles from './list-option.example.css';

<ListOption className={styles['list-option']} value="example-value">
  Press to toggle selection
</ListOption>  
```

```js
import RefExample, { Context } from '../ref-example.js';
import styles from './list-option.example.css';

const ref = React.createRef();

<RefExample ref={ref}>
  <Context.Consumer>
    {(onChange) => (
      <ListOption className={styles['list-option']} onChange={onChange} ref={ref} value="unique-value">
        Press to toggle selection
      </ListOption>
    )}
  </Context.Consumer>
</RefExample>
```
