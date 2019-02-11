import React from 'react';
import { mount, shallow } from 'enzyme';
import Game, { Piece, Board } from './index';
import toJson from 'enzyme-to-json';


describe('<Game />', ()=>{

	beforeAll(()=>{
		window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
	})
	it('Should render a game container if game started', () => {
		const wrapper = shallow(<Game />);
		expect(wrapper.find('.board-container').length).toEqual(1);
		wrapper.unmount();
	});
	
	it('Should update game data properly onPlayerMove', () => {	
		const app = shallow(<Game />);
		const data = app.state().data;
	
		app.setState({ player: 0, starterPiece: 0 })
		expect(data).toEqual([ [ '', '', '' ], [ '', '', '' ], [ '', '', '' ] ])
		app.instance().onPlayerMove([2,2]);
		expect(data).toEqual([ [ '', '', '' ], [ '', '', '' ], [ '', '', 'X' ] ])
		app.setState({ player: 1 })
		app.instance().onPlayerMove([1,1]);
		expect(data).toEqual([ [ '', '', '' ], [ '', 'O', '' ], [ '', '', 'X' ] ])
	})

	it('Should return the game result', () => {
		const app = shallow(<Game />);
		let data = app.state().data;
		
		//default data means game is still on
		expect(app.instance().getGameResult(data)).toEqual({ state: 0 });
		
		// an array with a winning result should return 1
		data = [['X', '', 'O'],['O','X',''],['X','O','X']]
		app.setState({ data });
		expect(app.instance().getGameResult(data)).toEqual({ state: 1, coordinates: [[0,0],[1,1],[2,2]] });

		// an array with a tie result should return 2
		data = [['X', 'O', 'X'],['O','O','X'],['X','X','O']]
		app.setState({ data });
		expect(app.instance().getGameResult(data)).toEqual({ state: 2});
	})


	it('Should render the final result after checkGameResult when game ends', () => {
		const app = mount(<Game />);
		const data = [['X', '', 'O'],['X','O',''],['X','O','X']];
		
		app.setState({ data, starterPiece: 'X' });
		app.update();
		app.instance().getGameResult = jest.fn().mockReturnValueOnce({ state: 1, coordinates: [[0,0],[1,1],[2,2]] });
		app.instance().checkGameResult();
		app.update();
		// console.log(app.debug())
		expect(app.find('.board-container').length).toEqual(1);
		expect(app.find('.result').length).toEqual(1);
	})


	it('Should render the turn of the corresponding player on every turn', () => {
		const app = mount(<Game />);
		const data = [['X', '', 'O'],['X','O',''],['X','O','X']];
		
		app.setState({ player: 0, starterPiece: 'X' });
		expect(app.find('.player-turn-1').length).toEqual(1);
		expect(app.find('.player-turn-1').text()).toEqual('Player\'s 1 turn');

		app.instance().getGameResult = jest.fn().mockReturnValueOnce({ state: 0 });
		app.instance().checkGameResult();
		app.update()
		expect(app.find('.player-turn-2').text()).toEqual('Player\'s 2 turn');
	})

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