import React from 'react';
import renderer from 'react-test-renderer';
import FormInput from './form-input.js';

describe('<FormInput />', () => {
  it('has default', () => {
    expect(renderer.create(<FormInput />).toJSON()).toMatchSnapshot();
  });
});
