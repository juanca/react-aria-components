/* eslint-disable react/prop-types */

import React, {
  createContext,
  forwardRef,
  useEffect,
  useState,
} from 'react';

const Context = createContext({
  onChange: () => {},
});

function toJSX(value) {
  switch (typeof value) {
    case 'function': return `function ${value.name}`;
    default: return JSON.stringify(value);
  }
}

const RefExample = forwardRef(function RefExample(props, ref) {
  const [, setRender] = useState(0);

  function onChange() {
    setRender((state) => state + 1);
  }

  useEffect(() => {
    setRender((state) => state + 1);
  }, []);

  return (
    <Context.Provider value={onChange}>
      {props.children}
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ref.current || {}).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{toJSX(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Context.Provider>
  );
});

export default RefExample;
export { Context };
