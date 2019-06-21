import React, { Component } from 'react';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';

import './app.css';

class App extends Component {
	state = {
		showRandomPlanet: true,
		selectedPerson: 5
	};

	onPersonSelected = id => {
		this.setState({
			selectedPerson: id
		});
	};

	render() {
		return (
			<div>
				<Header />

				<RandomPlanet />
				<button className="toggle-planet btn btn-warning btn-lg">
					Toggle Random Planet
				</button>
				<div className="row mb-2">
					<div className="col-md-6">
						<ItemList onItemSelected={this.onPersonSelected} />
					</div>
					<div className="col-md-6">
						<PersonDetails personId={this.state.selectedPerson} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;