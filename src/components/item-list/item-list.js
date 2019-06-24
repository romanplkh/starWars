import React, { Component } from 'react';
import { withData } from '../hoc-helper';
import './item-list.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';

const ItemList = props => {
	const { data } = props;

	const items = data.map(item => {
		const { id } = item;
		const label = props.children(item);
		return (
			<li
				className="list-group-item"
				key={id}
				onClick={() => props.onItemSelected(id)}
			>
				{label}
			</li>
		);
	});

	return <ul className="item-list list-group">{items}</ul>;
};

const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople);
