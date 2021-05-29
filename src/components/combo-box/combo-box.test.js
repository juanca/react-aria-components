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
import { Context } from '../listbox/listbox.js';
import ListOption from '../list-option/list-option.js';

describe('<ComboBox />', () => {
  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
    refs: [],
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<ComboBox {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
    expect(document.body).toHaveFocus();
  });

  describe('children API', () => {
    it('can be set', () => {
      render((
        <ComboBox {...requiredProps}>
          <option>Unique option</option>
        </ComboBox>
      ));
      userEvent.click(screen.getByText('Test label'));
      expect(screen.getByText('Unique option')).toBeDefined();
    });
  });

  describe('focus API', () => {
    it('focuses the input', () => {
      const ref = createRef();
      render(<ComboBox {...requiredProps} ref={ref} />);
      const input = screen.getByLabelText('Test label', { selector: 'input' });
      expect(input).not.toHaveFocus();
      act(() => ref.current.focus());
      expect(input).toHaveFocus();
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
          <Context.Consumer>
            {({ onChange: internalOnChange }) => (
              <option
                onClick={(event) => {
                  event.target.selected = true; // eslint-disable-line
                  internalOnChange(event);
                }}
                value="unique-option"
              >
                Option
              </option>
            )}
          </Context.Consumer>
        </ComboBox>
      ));

      expect(onChange).not.toHaveBeenCalled();
      userEvent.click(screen.getByRole('combobox', { name: 'Test label' }));
      userEvent.click(screen.getByText('Option'));
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({ value: 'unique-option' }),
      }));
    });
  });

  describe('value API', () => {
    it('can be set', () => {
      const { rerender } = render(<ComboBox {...requiredProps} value="unique-value" />);
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveValue('unique-value');
      rerender(<ComboBox {...requiredProps} value="another-value" />);
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveValue('another-value');
    });
  });

  describe('blurring', () => {
    test('with a mouse', () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <ComboBox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value">Test option</ListOption>
        </ComboBox>
      ));

      userEvent.click(screen.getByRole('combobox', { name: 'Test label' }));
      const option = screen.getByText('Test option');
      expect(option).toBeInTheDocument();
      userEvent.click(document.body);
      expect(document.body).toHaveFocus();
      expect(option).not.toBeInTheDocument();
    });

    test('with a keyboard on the textbox', () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <ComboBox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value">Test option</ListOption>
        </ComboBox>
      ));

      userEvent.tab();
      const option = screen.getByText('Test option');
      expect(option).toBeInTheDocument();
      userEvent.keyboard('{Escape}');
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      expect(option).not.toBeInTheDocument();
    });

    test('with a keyboard on the popup', () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <ComboBox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value">Test option</ListOption>
        </ComboBox>
      ));

      userEvent.tab();
      const option = screen.getByText('Test option');
      expect(option).toBeInTheDocument();
      userEvent.tab();
      userEvent.keyboard('{Escape}');
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      expect(option).not.toBeInTheDocument();
    });
  });

  describe('selecting an option', () => {
    test('with a mouse', () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <ComboBox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value">Test option</ListOption>
        </ComboBox>
      ));

      userEvent.click(screen.getByRole('combobox', { name: 'Test label' }));
      const option = screen.getByText('Test option');
      userEvent.click(option);
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveValue('test-value');
      expect(ref.current.value).toBe('test-value');
      expect(option).not.toBeInTheDocument();
    });

    test('with a keyboard', () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <ComboBox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value">Test option</ListOption>
        </ComboBox>
      ));

      userEvent.tab();
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      userEvent.tab();
      const option = screen.getByText('Test option');
      expect(option).toHaveFocus();
      userEvent.keyboard(' ');
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveValue('test-value');
      expect(ref.current.value).toBe('test-value');
      expect(option).not.toBeInTheDocument();
    });
  });
});
