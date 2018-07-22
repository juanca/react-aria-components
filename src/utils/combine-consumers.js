import React from 'react';

function reducer(acc, Consumer) {
  return (...propsList) => (
    <Consumer>
      {arg => acc(...propsList.concat([arg]))}
    </Consumer>
  );
}

export default function combineConsumers(...consumers) {
  return function Composed({ children }) {
    const reduced = consumers.reduceRight(reducer, children);
    return reduced();
  };
}
