import React from 'react';
import { mount, shallow } from 'enzyme';
import Board from './index';
import toJson from 'enzyme-to-json';


describe('<Board />', () => {

	it('Should a div with class board', ()=> {
		const data = [['X', '', 'O'],['O','X',''],['X','O','X']]
		const board = shallow(<Board data={data} />);

		expect(board.find('.board').length).toEqual(1);
	})

	it('Matches snapshot', () => {
		const data = [['X', '', 'O'],['O','X',''],['X','O','X']]
		const board = mount(<Board data={data} />);
		
		expect(toJson(board)).toMatchSnapshot();
		board.unmount();
	});
})