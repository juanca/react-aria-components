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

### Examples

#### Scrollable Listbox

[WAI ARIA authoring practices example source](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-scrollable.html)

```js
import ListOption from '../list-option/list-option.js';
import styles from '../examples.css';

const options = [
  'Neptunium',
  'Plutonium',
  'Americium',
  'Curium',
  'Berkelium',
  'Californium',
  'Einsteinium',
  'Fermium',
  'Mendelevium',
  'Nobelium',
  'Lawrencium',
  'Rutherfordium',
  'Dubnium',
  'Seaborgium',
  'Bohrium',
  'Hassium',
  'Meitnerium',
  'Darmstadtium',
  'Roentgenium',
  'Copernicium',
  'Nihonium',
  'Flerovium',
  'Moscovium',
  'Livermorium',
  'Tennessine',
  'Oganesson',
];
const refs = options.map(() => React.useRef());

<div className={styles['example-container']}>
  <label id="scrollable-list-example-label">
    Transuranium elements:
  </label>
  <Listbox
    className={styles['example-listbox']}
    labelledBy="scrollable-list-example-label"
    refs={refs}
  >
    {() => options.map((option, index) => (
      <ListOption
        className={styles['example-option']}
        key={option}
        ref={refs[index]}
        value={option}
      >
        {option}
      </ListOption>
    ))}
  </Listbox>
</div>
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
      className={styles['example-listbox']}
      labelledBy="single-select-example-label-1"
      onValueChange={onImportantValueChange}
      ref={importantListboxRef}
      refs={importantFeaturesRefs}
    >
      {({ onSelectChange }) => importantFeatures.map((feature, index) => (
        <ListOption
          className={styles['example-option']}
          key={feature}
          onSelectChange={onSelectChange}
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
      className={styles['example-listbox']}
      labelledBy="single-select-example-label-2"
      onValueChange={onNotImportantValueChange}
      ref={notImportantListboxRef}
      refs={notImportantFeaturesRefs}
    >
      {({ onSelectChange }) => notImportantFeatures.map((feature, index) => (
        <ListOption
          className={styles['example-option']}
          key={feature}
          onSelectChange={onSelectChange}
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

<div className={styles['example-container']} style={{display: 'flex'}}>
  <div style={{ width: '100%' }}>
    <label id="multi-select-example-label-1">
      Available upgrades:
    </label>
    <Listbox
      className={styles['example-listbox']}
      labelledBy="multi-select-example-label-1"
      multiple
      onValueChange={onAvailableUpgradesValueChange}
      ref={availableUpgradesListboxRef}
      refs={availableUpgradesRefs}
    >
      {({ onSelectChange }) => availableUpgrades.map((upgrade, index) => (
        <ListOption
          className={styles['example-option']}
          key={upgrade}
          onSelectChange={onSelectChange}
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
      className={styles['example-listbox']}
      labelledBy="single-select-example-label-2"
      multiple
      onValueChange={onChosenUpgradesValueChange}
      ref={chosenUpgradesListboxRef}
      refs={chosenUpgradesRefs}
    >
      {({ onSelectChange }) => chosenUpgrades.map((upgrade, index) => (
        <ListOption
          className={styles['example-option']}
          key={upgrade}
          onSelectChange={onSelectChange}
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
```
