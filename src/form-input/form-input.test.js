import React, {
  createRef,
} from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  screen,
} from '@testing-library/react';
import FormInput from './form-input.js';

describe('<FormInput />', () => {
  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
  };

  it('has default', () => {
    expect(renderer.create(<FormInput {...requiredProps} />).toJSON()).toMatchSnapshot();
  });

  describe('focus ref API', () => {
    it('focuses the input', () => {
      const ref = createRef();
      render(<FormInput {...requiredProps} ref={ref} />);
      expect(screen.getByLabelText('Test label')).not.toHaveFocus();
      ref.current.focus();
      expect(screen.getByLabelText('Test label')).toHaveFocus();
    });
  });

  describe('id API', () => {
    it('can be set', () => {
      render(<FormInput {...requiredProps} id="unique-id" />);
      expect(screen.getByLabelText('Test label')).toBeDefined();
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<FormInput {...requiredProps} label="Unique label" />);
      expect(screen.getByLabelText('Unique label')).toBeDefined();
    });
  });
});
