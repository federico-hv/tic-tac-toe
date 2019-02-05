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

	it('Should render the turn of the player according to state.turn', () => {	
		const app = shallow(<Game />);
		expect(app.find('.player-turn').text()).toEqual('First Player');
		app.instance().onPlayerMove([2,2]);
		expect(app.find('.player-turn').text()).toEqual('Second Player');
		app.instance().onPlayerMove([0,2]);
		expect(app.find('.player-turn').text()).toEqual('First Player');
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


describe('<Piece />', ()=>{

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