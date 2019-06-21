import React, { Component } from 'react';
import swapi from '../services/swapi-service';
import './item-list.css';
import Spinner from '../spinner';
import SwapiService from '../services/swapi-service';

export default class ItemList extends Component {
	swapi = new SwapiService();

	state = {
		peopleList: null
	};

	componentDidMount() {
		this.swapi.getAllPeople().then(peopleList => this.setState({ peopleList }));
	}

	renderItemList = arr => {
		return arr.map(person => {
			return (
				<li
					key={person.id}
					className="list-group-item"
					onClick={() => this.props.onItemSelected(person.id)}
				>
					{person.name}
				</li>
			);
		});
	};

	render() {
		const { peopleList } = this.state;

		if (!peopleList) {
			return <Spinner />;
		}
		return (
			<ul className="item-list list-group">
			{this.renderItemList(peopleList)}
			</ul>
		);
	}
}
