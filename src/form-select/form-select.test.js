import React, {
  createRef,
} from 'react';
import {
  act,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormSelect from './form-select.js';

describe('<Form Select />', () => {
  const requiredProps = {
    children: () => {},
    id: 'test-id',
    label: 'Test label',
  };

  it('has defaults', () => {
    render(<FormSelect {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('children prop API', () => {
    it('can be set', () => {
      render((
        <FormSelect {...requiredProps}>
          {() => <option>Unique option</option>}
        </FormSelect>
      ));
      expect(screen.getByText('Unique option')).toBeDefined();
    });
  });

  describe('focus ref API', () => {
    it('focuses the input', () => {
      const ref = createRef();
      render(<FormSelect {...requiredProps} ref={ref} />);
      expect(screen.getByLabelText('Test label', { selector: 'input' })).not.toHaveFocus();
      act(() => ref.current.focus());
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveFocus();
    });
  });

  describe('id prop API', () => {
    it('can be set', () => {
      render(<FormSelect {...requiredProps} id="unique-id" />);
      expect(screen.getByText('Test label')).toHaveAttribute('id', 'unique-id-label');
    });
  });

  describe('label prop API', () => {
    it('can be set', () => {
      render(<FormSelect {...requiredProps} label="Unique label" />);
      expect(screen.getByText('Unique label', { selector: 'label' })).toBeInTheDocument();
    });
  });

  describe('onValueChange prop', () => {
    it('is called when the value changes', () => {
      const onValueChangeSpy = jest.fn();
      render((
        <FormSelect {...requiredProps} onValueChange={onValueChangeSpy}>
          {({ onSelectChange }) => (
            <option
              onClick={(event) => {
                event.target.selected = true; // eslint-disable-line
                onSelectChange(event);
              }}
              value="unique-option"
            >
              Option
            </option>
          )}
        </FormSelect>
      ));

      userEvent.click(screen.getByLabelText('Test label', { selector: 'input' }));
      userEvent.click(screen.getByText('Option'));
      expect(onValueChangeSpy).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({ value: 'unique-option' }),
      }));
    });
  });
});
