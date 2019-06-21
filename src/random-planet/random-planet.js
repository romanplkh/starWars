import React, { Component } from 'react';
import Swapi from '../services/swapi-service';
import './random-planet.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class RandomPlanet extends Component {
	swapi = new Swapi();

	state = {
		planet: {},
		loading: true,
		error: false
	};

	componentDidMount = () => {
		this.updatePlanet();
		this.interval = setInterval(this.updatePlanet, 2500);
	};

	componentWillUnmount = () => {
		console.log('unmounted');
		clearInterval(this.interval);
	};

	onPlanetLoaded = planet => {
		this.setState({ planet, loading: false });
	};

	onError = err => {
		this.setState({ error: true });
	};

	updatePlanet = () => {
		const id = Math.floor(Math.random() * 25 + 3);
		this.swapi
			.getPlanet(id)
			.then(this.onPlanetLoaded)
			.catch(this.onError);
	};

	render() {
		const {
			planet: { population, rotation, diameter, name, id },
			loading,
			error
		} = this.state;

		const errorMessage = error ? <ErrorIndicator /> : null;

		const spinner = loading && !error ? <Spinner /> : null;

		const planetContent =
			!loading && !error ? (
				<React.Fragment>
					<img
						className="planet-image"
						src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
						alt="planet"
					/>
					<div>
						<h4>{name}</h4>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								<span className="term">Population</span>
								<span>{population}</span>
							</li>
							<li className="list-group-item">
								<span className="term">Rotation Period</span>
								<span>{rotation}</span>
							</li>
							<li className="list-group-item">
								<span className="term">Diameter</span>
								<span>{diameter}</span>
							</li>
						</ul>
					</div>
				</React.Fragment>
			) : null;

		return (
			<div className="random-planet jumbotron rounded">
				{spinner}
				{planetContent}
				{errorMessage}
			</div>
		);
	}
}
