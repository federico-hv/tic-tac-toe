import React from 'react';
import { mount, shallow } from 'enzyme';
import Piece from './index';
import toJson from 'enzyme-to-json';



describe('<Piece />', () => {

	it('Should render an empty space', () => {
		const piece = shallow(<Piece symbol={{ value: null }} />)
		expect(piece.text()).toEqual('')
	});

	it('Should render an X', () => {
		const piece = shallow(<Piece symbol={'X'} />)
		expect(piece.text()).toEqual('X')
	});

	it('Matches snapshot', () => {
		const tree = mount(<Piece />);
		expect(toJson(tree)).toMatchSnapshot();
		tree.unmount();
	});
})