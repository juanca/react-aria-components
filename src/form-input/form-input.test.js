import React from 'react';
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
