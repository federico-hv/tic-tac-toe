import React from 'react';
import { shallow } from 'enzyme';
import Game from './index';
import toJson from 'enzyme-to-json';


describe('<Game />', ()=>{

	it('Should render a container div', () => {
		const wrapper = shallow(<Game />);
		console.log(wrapper.debug())
		// expect(wrapper.find('div').length).toEqual(1);
	});

	it('Matches snapshot', () => {
		const tree = shallow(<Game />);
		expect(toJson(tree)).toMatchSnapshot();
	});

});