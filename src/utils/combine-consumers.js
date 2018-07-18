/* eslint-disable react/prop-types */
import React from 'react';

export default function combineConsumers(First, Second) {
  return function Consumer({ children }) {
    return (
      <First>
        {arg1 => (
          <Second>
            {arg2 => children(arg1, arg2)}
          </Second>
        )}
      </First>
    );
  };
}
