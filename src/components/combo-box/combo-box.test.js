import React, {
  createRef,
} from 'react';
import {
  act,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComboBox from './combo-box.js';

describe('<ComboBox />', () => {
  const requiredProps = {
    children: () => {},
    id: 'test-id',
    label: 'Test label',
    refs: [],
  };

  it('has defaults', () => {
    render(<ComboBox {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('children API', () => {
    it('can be set', () => {
      render((
        <ComboBox {...requiredProps}>
          {() => <option>Unique option</option>}
        </ComboBox>
      ));
      expect(screen.getByText('Unique option')).toBeDefined();
    });
  });

  describe('focus API', () => {
    it('focuses the input', () => {
      const ref = createRef();
      render(<ComboBox {...requiredProps} ref={ref} />);
      expect(screen.getByLabelText('Test label', { selector: 'input' })).not.toHaveFocus();
      act(() => ref.current.focus());
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveFocus();
    });
  });

  describe('id API', () => {
    it('can be set', () => {
      render(<ComboBox {...requiredProps} id="unique-id" />);
      expect(screen.getByText('Test label')).toHaveAttribute('id', 'unique-id-label');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<ComboBox {...requiredProps} label="Unique label" />);
      expect(screen.getByText('Unique label', { selector: 'label' })).toBeInTheDocument();
    });
  });

  describe('onChange API', () => {
    it('is a function', () => {
      const onChange = jest.fn();
      render((
        <ComboBox {...requiredProps} onChange={onChange}>
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
        </ComboBox>
      ));

      expect(onChange).not.toHaveBeenCalled();
      userEvent.click(screen.getByLabelText('Test label', { selector: 'input' }));
      userEvent.click(screen.getByText('Option'));
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({ value: 'unique-option' }),
      }));
    });
  });

  describe('value API', () => {
    it('can be set', () => {
      render(<ComboBox {...requiredProps} value="unique-value" />);
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveValue('unique-value');
    });
  });
});
