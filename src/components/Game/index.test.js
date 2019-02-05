import React from 'react';
import { mount, shallow } from 'enzyme';
import Game, { Piece, Board } from './index';
import toJson from 'enzyme-to-json';


describe('<Game />', ()=>{

	it('Should render a container div', () => {
		const wrapper = shallow(<Game />);
		expect(wrapper.find('div').length).toEqual(2);
		wrapper.unmount();
	});

	it('Should render piece selector before game starts and board after', () => {	
		const app = mount(<Game />);

		expect(app.find('.piece-selector').length).toBe(1);
		
		const button = app.find('#btnX');
		button.simulate('click');
		
		expect(app.find('.piece-selector').length).toBe(0);

	})

	it('Matches snapshot', () => {
		const tree = mount(<Game />);
		expect(toJson(tree)).toMatchSnapshot();
		tree.unmount();
	});

});


describe('<Piece />', ()=>{

	it('Should render empty element', () => {
		const piece = shallow(<Piece symbol={{ value: null }} />)
		expect(piece.text()).toEqual('')
	});
})