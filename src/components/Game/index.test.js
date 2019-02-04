import React from 'react';
import { configure, shallow } from 'enzyme';
import Game from './index';


describe('<Game />', ()=>{
	
	it('Should render a container div', () => {
		const wrapper = shallow(<Game />);
		expect(wrapper.find('div').length).toEqual(1);
	})



});