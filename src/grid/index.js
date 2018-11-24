import React from 'react';

import Cursor from '../cursor';

export default function Grid() {
  return (
    <Cursor>
      {(x, y) => (
        <span>{x}, {y}</span>
      )}
    </Cursor>
  );
}
