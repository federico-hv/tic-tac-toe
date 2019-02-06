import React from 'react';
import { mount, shallow } from 'enzyme';
import Game, { Piece, Board } from './index';
import toJson from 'enzyme-to-json';


describe('<Game />', ()=>{

	it('Should render a game container if game started', () => {
		const wrapper = shallow(<Game />);
		expect(wrapper.find('.board').length).toEqual(1);
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
		expect(app.instance().getGameResult(data)).toEqual(0);
		
		// an array with a winning result should return 1
		data = [['X', '', 'O'],['O','X',''],['X','O','X']]
		app.setState({ data });
		expect(app.instance().getGameResult(data)).toEqual(1);

		// an array with a tie result should return 2
		data = [['X', 'O', 'X'],['O','O','X'],['X','X','O']]
		app.setState({ data });
		expect(app.instance().getGameResult(data)).toEqual(2);
	})


	it('Should render the final result after checkGameResult when game ends', () => {
		const app = shallow(<Game />);
		const data = [['X', '', 'O'],['X','O',''],['X','O','X']];
		
		app.setState({ data });
		app.instance().getGameResult = jest.fn().mockReturnValueOnce(1);
		app.instance().checkGameResult();
		expect(app.find('.board').length).toEqual(0);
		expect(app.find('.game-result').length).toEqual(1);
	})

	
	it('Should render the turn of the corresponding player on every turn', () => {
		const app = shallow(<Game />);
		const data = [['X', '', 'O'],['X','O',''],['X','O','X']];
		
		expect(app.find('.player-turn').length).toEqual(1);
		expect(app.find('.player-turn').text()).toEqual('First Player');

		app.instance().getGameResult = jest.fn().mockReturnValueOnce(0);
		app.instance().checkGameResult();
		
		expect(app.find('.player-turn').text()).toEqual('Second Player');
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


describe('<Board />', () => {

	it('Should a div with class board', ()=> {
		const data = [['X', '', 'O'],['O','X',''],['X','O','X']]
		const board = shallow(<Board data={data} />);

		expect(board.find('.board').length).toEqual(1);
	})

	it('Matches snapshot', () => {
		const data = [['X', '', 'O'],['O','X',''],['X','O','X']]
		const board = shallow(<Board data={data} />);
		
		expect(toJson(board)).toMatchSnapshot();
		board.unmount();
	});
})


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