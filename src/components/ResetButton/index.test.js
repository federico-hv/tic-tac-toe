import React from 'react';
import { mount, shallow } from 'enzyme';
import Piece from './index';
import toJson from 'enzyme-to-json';
import ResetButton from './index';


describe('<ResetButton>', ()=> {

	it('Should render a button with class reset-button and onAction prop', ()=>{
		const onAction = jest.fn();
		const button = shallow(<ResetButton onAction={onAction} />);

		expect(button.find('.reset-button').length).toEqual(1);
		button.simulate('click');
		expect(onAction.mock.calls.length).toBe(1);
	})

	it('Should Match snaptshot', ()=>{
		const button = shallow(<ResetButton />);

		expect(toJson(button)).toMatchSnapshot();
		button.unmount();
	})
});