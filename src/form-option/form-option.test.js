import React, {
  createRef,
} from 'react';
import {
  render,
} from '@testing-library/react';
import FormOption from './form-option.js';

describe('<FormOption />', () => {
  const requiredProps = {
    children: 'Test option',
    value: 'test-value',
  };

  it('has defaults', () => {
    render(<FormOption {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('ref API', () => {
    it('can be set', () => {
      const ref = createRef();
      render(<FormOption {...requiredProps} ref={ref} />);
      expect(ref.current).toBeDefined();
    });
  });
});
