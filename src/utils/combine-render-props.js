import React from 'react';

function reducer(acc, Component) {
  return (...propsList) => (
    <Component>
      {arg => acc(...propsList.concat([arg]))}
    </Component>
  );
}

export default function combineRenderProps(...components) {
  return function Composed({ children }) {
    const reduced = components.reduceRight(reducer, children);
    return reduced();
  };
}
