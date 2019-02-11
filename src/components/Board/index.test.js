import React from 'react';
import { mount, shallow } from 'enzyme';
import Board from './index';
import toJson from 'enzyme-to-json';


describe('<Board />', () => {

	it('Should return a div with class board, player-turn-1 class and square-container', ()=> {
		const data = [['X', '', 'O'],['O','X',''],['X','O','X']]
		const board = shallow(<Board coordinates={[[0,0],[1,1],[2,2]]} data={data} player={1} result=''/>);


		expect(board.find('.board').length).toEqual(1);
		expect(board.find('.player-turn-1').length).toEqual(1);
		expect(board.find('.squares-container').length).toEqual(1);
	})

	
	it('Should return a message with the final result of the game', ()=> {
		const data = [['X', '', 'O'],['O','X',''],['X','O','X']]
		const board = shallow(<Board coordinates={[[0,0],[1,1],[2,2]]} data={data} player={1} result='Player 1 wins!'/>);


		expect(board.find('.board').length).toEqual(1);
		expect(board.find('.result').length).toEqual(1);
		expect(board.find('.result').text()).toEqual('Player 1 wins!');
	})

	it('Matches snapshot', () => {
		const data = [['X', '', 'O'],['O','X',''],['X','O','X']]
		const board = mount(<Board coordinates={[[0,0],[1,1],[2,2]]} data={data} />);
		
		expect(toJson(board)).toMatchSnapshot();
		board.unmount();
	});
})