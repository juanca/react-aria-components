import React, {
  createRef,
} from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  screen,
} from '@testing-library/react';
import FormSelect from './form-select.js';

describe('<Form Select />', () => {
  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
  };

  it('has defaults', () => {
    expect(renderer.create(<FormSelect {...requiredProps} />).toJSON()).toMatchSnapshot();
  });

  describe('children API', () => {
    it('can be set', () => {
      render((
        <FormSelect {...requiredProps}>
          <option>Unique option</option>
        </FormSelect>
      ));
      expect(screen.getByText('Unique option')).toBeDefined();
    });
  });

  describe('focus ref API', () => {
    it('focuses the input', () => {
      const ref = createRef();
      render(<FormSelect {...requiredProps} ref={ref} />);
      expect(screen.getByLabelText('Test label')).not.toHaveFocus();
      ref.current.focus();
      expect(screen.getByLabelText('Test label')).toHaveFocus();
    });
  });

  describe('id API', () => {
    it('can be set', () => {
      render(<FormSelect {...requiredProps} id="unique-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'unique-id');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<FormSelect {...requiredProps} label="Unique label" />);
      expect(screen.getByLabelText('Unique label')).toBeDefined();
    });
  });
});
