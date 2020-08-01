`ListOption` is a convenience component for the w3 [`option` role](https://www.w3.org/WAI/PF/aria/roles#option).
All list options should be be nested in a `Listbox`.

### Keyboard Support

| Element | Key | Description |
| --- | --- | --- |
| ListOption | Enter | Toggle `select` state |

### Label Support

| Element | Label |
| --- | --- |

### React ref API

| Key | Type | Description |
| --- | --- | --- |
| contains | function | Determines whether a node is a descendant of the component |
| focus | function | Activates the component and sets focus on the component |
| selected | boolean | Exposes the `selected` state |
| setAttribute | function | Sets the `selected` state via `selected` attribute; Toggle `active` state via `tabindex` attribute |
| value | any | Exposes the `value` prop |

### Examples

```js
const [selected, setSelected] = React.useState(false);

<ListOption
  className={'example-list-option'}
  onSelectChange={() => setSelected(!selected)}
  selected={selected}
>
  Press to {selected ? 'deselect' : 'select'}
</ListOption>
```
