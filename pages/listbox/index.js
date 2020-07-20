/* global window:false */

import '@babel/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React, {
  createRef,
  useRef,
  useState,
} from 'react';
import { render } from 'react-dom';

import Listbox from '../../src/listbox/listbox.js';
import ListOption from '../../src/list-option/list-option.js';
import Footer from '../footer.js';
import Header from '../header.js';
import styles from './styles.css';

function ScrollableListExample() {
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
  const refs = options.map(() => useRef());

  return (
    <section>
      <h2>Scrollable Listbox Example</h2>
      <p>
        <a href="https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-scrollable.html">
          WAI ARIA authoring practices example source.
        </a>
      </p>
      <div className={styles['example-container']}>
        <div>
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
      </div>
    </section>
  );
}

function SingleSelectListboxExample() {
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

  const importantListboxRef = useRef();
  const [importantFeatures, setImportantFeatures] = useState(options);
  const importantFeaturesRefs = importantFeatures.map(() => createRef());
  const [importantDisabled, setImportantDisabled] = useState(true);
  const notImportantListboxRef = useRef();
  const [notImportantFeatures, setNotImportantFeatures] = useState([]);
  const notImportantFeaturesRefs = notImportantFeatures.map(() => createRef());
  const [notImportantDisabled, setNotImportantDisabled] = useState(true);

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

  return (
    <section>
      <h2>Single-Select Listbox Example</h2>
      <p>
        <a href="https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-rearrangeable.html#ex1_label">
          WAI ARIA authoring practices examples source.
        </a>
      </p>
      <div className={styles['example-container']}>
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
    </section>
  );
}

function MultiSelectListboxExample() {
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

  const [availableUpgrades, setAvailableUpgrades] = useState(options);
  const availableUpgradesRefs = availableUpgrades.map(() => createRef());
  const availableUpgradesListboxRef = useRef();
  const [chosenUpgrades, setChosenUpgrades] = useState([]);
  const chosenUpgradesRefs = chosenUpgrades.map(() => createRef());
  const chosenUpgradesListboxRef = useRef();
  const [addUpgradeDisabled, setAddUpgradeDisabled] = useState(true);
  const [removeUpgradeDisabled, setRemoveUpgradeDisabled] = useState(true);

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

  return (
    <section>
      <h2>Multi-Select Listbox Example</h2>
      <p>
        <a href="https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-rearrangeable.html#ex2_label">
          WAI ARIA authoring practices example source.
        </a>
      </p>
      <div className={styles['example-container']}>
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
    </section>
  );
}

render((
  <React.Fragment>
    <Header link="./listbox" title="Listbox" />
    <main>
      <ScrollableListExample />
      <SingleSelectListboxExample />
      <MultiSelectListboxExample />
    </main>
    <Footer />
  </React.Fragment>
), window.document.getElementById('page'));
