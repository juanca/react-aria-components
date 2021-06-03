`Listbox` is a convenience component for the w3 [`listbox` role](https://www.w3.org/WAI/PF/aria/roles#listbox).

### Keyboard Support

| Element | Key | Description |
| --- | --- | --- |
| ListOption | ArrowDown | Move focus to the next option |
| ListOption | ArrowUp | Move focus to the previous option |
| ListOption | End | Move focus to the last option |
| ListOption | Home | Move focus to the first option |

### Label Support

| Element | Label |
| --- | --- |
| Listbox | Content from `labelledBy` prop |

### React ref API

| Property | Type | Description |
| --- | --- | --- |
| focus | function | Activates the component and sets focus on the appropriate option |
| setValue | function | Sets the `value` state |
| value | one or many values | Exposes the `value` state: values of the selected options |

#### Scrollable Listbox

[WAI ARIA authoring practices example source](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-scrollable.html)

```js
import RefExample, { Context } from '../ref-example.js';
import ListOption from '../list-option/list-option.js';
import styles from '../examples.css';

const ref = React.createRef();
const options = [
  { label: 'Neptunium', ref: React.createRef() },
  { label: 'Plutonium', ref: React.createRef() },
  { label: 'Americium', ref: React.createRef() },
  { label: 'Curium', ref: React.createRef() },
  { label: 'Berkelium', ref: React.createRef() },
  { label: 'Californium', ref: React.createRef() },
  { label: 'Einsteinium', ref: React.createRef() },
  { label: 'Fermium', ref: React.createRef() },
  { label: 'Mendelevium', ref: React.createRef() },
  { label: 'Nobelium', ref: React.createRef() },
  { label: 'Lawrencium', ref: React.createRef() },
  { label: 'Rutherfordium', ref: React.createRef() },
  { label: 'Dubnium', ref: React.createRef() },
  { label: 'Seaborgium', ref: React.createRef() },
  { label: 'Bohrium', ref: React.createRef() },
  { label: 'Hassium', ref: React.createRef() },
  { label: 'Meitnerium', ref: React.createRef() },
  { label: 'Darmstadtium', ref: React.createRef() },
  { label: 'Roentgenium', ref: React.createRef() },
  { label: 'Copernicium', ref: React.createRef() },
  { label: 'Nihonium', ref: React.createRef() },
  { label: 'Flerovium', ref: React.createRef() },
  { label: 'Moscovium', ref: React.createRef() },
  { label: 'Livermorium', ref: React.createRef() },
  { label: 'Tennessine', ref: React.createRef() },
  { label: 'Oganesson', ref: React.createRef() },
];

<RefExample ref={ref}>
  <Context.Consumer>
    {(onChange) => (
      <div className={styles['example-container']}>
        <label id="scrollable-list-example-label">
          Transuranium elements:
        </label>
        <Listbox
          active
          className={styles['example-listbox']}
          labelledBy="scrollable-list-example-label"
          onChange={onChange}
          ref={ref}
          refs={options.map(option => option.ref)}
        >
          {options.map(option => (
            <ListOption
              className={styles['example-option']}
              key={option.label}
              ref={option.ref}
              value={option.label}
            > 
              {option.label}
            </ListOption>
          ))}
        </Listbox>
      </div>
      )}
  </Context.Consumer>
</RefExample>
```

#### Single Select Listbox

[WAI ARIA authoring practices example source](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-rearrangeable.html#ex1_label)

```js
import ListOption from '../list-option/list-option.js';
import styles from '../examples.css';

const options = [
  'Proximity of public K-12 schools',
  'Proximity of child-friendly parks',
  'Proximity of grocery shopping',
  'Proximity of fast food',
  'Proximity of fine dining',
  'Neighborhood walkability',
  'Availability of public transit',
  'Proximity of hospital and medical services',
  'Level of traffic noise',
  'Access to major highways',
];

const importantListboxRef = React.useRef();
const [importantFeatures, setImportantFeatures] = React.useState(options);
const importantFeaturesRefs = importantFeatures.map(() => React.createRef());
const [importantDisabled, setImportantDisabled] = React.useState(true);
const notImportantListboxRef = React.useRef();
const [notImportantFeatures, setNotImportantFeatures] = React.useState([]);
const notImportantFeaturesRefs = notImportantFeatures.map(() => React.createRef());
const [notImportantDisabled, setNotImportantDisabled] = React.useState(true);

function onNotImporantClick() {
  const selectedFeature = importantListboxRef.current.value;
  setImportantFeatures(importantFeatures.filter(feature => feature !== selectedFeature));
  setNotImportantFeatures([...notImportantFeatures, selectedFeature]);
  importantListboxRef.current.setValue(undefined);
  setNotImportantDisabled(true);
}

function onNotImportantValueChange() {
  setImportantDisabled(false);
}

function onImportantClick() {
  const selectedFeature = notImportantListboxRef.current.value;
  setImportantFeatures([...importantFeatures, selectedFeature]);
  setNotImportantFeatures(notImportantFeatures.filter(feature => feature !== selectedFeature));
  notImportantListboxRef.current.setValue(undefined);
  setImportantDisabled(true);
}

function onImportantValueChange() {
  setNotImportantDisabled(false);
}

<div className={styles['example-container']} style={{display: 'flex'}}>
  <div style={{ width: '100%' }}>
    <label id="single-select-example-label-1">
      Important Features:
    </label>
    <Listbox
      active
      className={styles['example-listbox']}
      labelledBy="single-select-example-label-1"
      onChange={onImportantValueChange}
      ref={importantListboxRef}
      refs={importantFeaturesRefs}
    >
      {importantFeatures.map((feature, index) => (
        <ListOption
          className={styles['example-option']}
          key={feature}
          ref={importantFeaturesRefs[index]}
          value={feature}
        >
          {feature}
        </ListOption>
      ))}
    </Listbox>
    <button disabled={notImportantDisabled} onClick={onNotImporantClick} type="button">
      Not Important →
    </button>
  </div>
  <div style={{ marginLeft: '20px', width: '100%' }}>
    <label id="single-select-example-label-2">
      Unimportant Features:
    </label>
    <Listbox
      active
      className={styles['example-listbox']}
      labelledBy="single-select-example-label-2"
      onChange={onNotImportantValueChange}
      ref={notImportantListboxRef}
      refs={notImportantFeaturesRefs}
    >
      {notImportantFeatures.map((feature, index) => (
        <ListOption
          className={styles['example-option']}
          key={feature}
          ref={notImportantFeaturesRefs[index]}
          value={feature}
        >
          {feature}
        </ListOption>
      ))}
    </Listbox>
    <button disabled={importantDisabled} onClick={onImportantClick} type="button">
      ← Important
    </button>
  </div>
</div>
```

#### Multiple Select Listbox

[WAI ARIA authoring practices example source](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-rearrangeable.html#ex2_label)

```js
import RefExample, { Context } from '../ref-example.js';
import ListOption from '../list-option/list-option.js';
import styles from '../examples.css';

const options = [
  'Leather seats',
  'Front seat warmers',
  'Rear bucket seats',
  'Rear seat warmers',
  'Front sun roof',
  'Rear sun roof',
  'Privacy cloque',
  'Food synthesizer',
  'Advanced waste recycling system',
  'Turbo vertical take-off capability',
];

const [availableUpgrades, setAvailableUpgrades] = React.useState(options);
const availableUpgradesRefs = availableUpgrades.map(() => React.createRef());
const availableUpgradesListboxRef = React.useRef();
const [chosenUpgrades, setChosenUpgrades] = React.useState([]);
const chosenUpgradesRefs = chosenUpgrades.map(() => React.createRef());
const chosenUpgradesListboxRef = React.useRef();
const [addUpgradeDisabled, setAddUpgradeDisabled] = React.useState(true);
const [removeUpgradeDisabled, setRemoveUpgradeDisabled] = React. useState(true);

function onAvailableUpgradesValueChange() {
  setAddUpgradeDisabled(false);
}

function onAddUpgradeClick() {
  const selectedUpgrades = availableUpgradesListboxRef.current.value;
  setAddUpgradeDisabled(true);
  setAvailableUpgrades(availableUpgrades.filter(upgrade => !selectedUpgrades.includes(upgrade)));
  setChosenUpgrades([...chosenUpgrades, ...selectedUpgrades]);
  availableUpgradesListboxRef.current.setValue([]);
}

function onChosenUpgradesValueChange() {
  setRemoveUpgradeDisabled(false);
}

function onRemoveUpgradeClick() {
  const selectedUpgrades = chosenUpgradesListboxRef.current.value;
  setRemoveUpgradeDisabled(true);
  setAvailableUpgrades([...availableUpgrades, ...selectedUpgrades]);
  setChosenUpgrades(chosenUpgrades.filter(upgrade => !selectedUpgrades.includes(upgrade)));
  chosenUpgradesListboxRef.current.setValue([]);
}

<RefExample ref={availableUpgradesListboxRef}>
  <Context.Consumer>
    {(onChange) => (
      <div className={styles['example-container']} style={{display: 'flex'}}>
        <div style={{ width: '100%' }}>
          <label id="multi-select-example-label-1">
            Available upgrades:
          </label>
          <Listbox
            active
            className={styles['example-listbox']}
            labelledBy="multi-select-example-label-1"
            multiple
            onChange={(event) => {onAvailableUpgradesValueChange(event); onChange();}}
            ref={availableUpgradesListboxRef}
            refs={availableUpgradesRefs}
          >
            {availableUpgrades.map((upgrade, index) => (
              <ListOption
                className={styles['example-option']}
                key={upgrade}
                ref={availableUpgradesRefs[index]}
                value={upgrade}
              >
                {upgrade}
              </ListOption>
            ))}
          </Listbox>
          <button disabled={addUpgradeDisabled} onClick={onAddUpgradeClick} type="button">
            Add →
          </button>
        </div>
        <div style={{ marginLeft: '20px', width: '100%' }}>
          <label id="single-select-example-label-2">
            Upgrades you have chosen:
          </label>
          <Listbox
            active
            className={styles['example-listbox']}
            labelledBy="single-select-example-label-2"
            multiple
            onChange={(event) => {onChosenUpgradesValueChange(event); onChange();}}
            ref={chosenUpgradesListboxRef}
            refs={chosenUpgradesRefs}
          >
            {chosenUpgrades.map((upgrade, index) => (
              <ListOption
                className={styles['example-option']}
                key={upgrade}
                ref={chosenUpgradesRefs[index]}
                value={upgrade}
              >
                {upgrade}
              </ListOption>
            ))}
          </Listbox>
          <button disabled={removeUpgradeDisabled} onClick={onRemoveUpgradeClick} type="button">
            ← Remove
          </button>
        </div>
      </div>
    )}
  </Context.Consumer>
</RefExample>
```
