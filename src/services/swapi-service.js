class SwapiService {
	_apiBase = 'https://swapi.co/api/';

	async getResource(url) {
		const request = await fetch(url);

		if (!request.ok) {
			throw new Error('Could not fetch url....');
		}
		const response = await request.json();
		//will return promise
		return response;
	}

	async getAllPeople() {
		const res = await this.getResource(`${this._apiBase}people/`);
		return res.results.map(this.transformPerson);
	}

	async getPerson(id) {
		const person = await this.getResource(`${this._apiBase}people/${id}/`);
		return this.transformPerson(person);
	}

	async getAllPlanets() {
		const res = await this.getResource(`${this._apiBase}planets/`);
		return res.results.map(this.transformPlanet);
	}

	async getPlanet(id) {
		const planet = await this.getResource(`${this._apiBase}planets/${id}/`);
		return this.transformPlanet(planet);
	}

	async getAllStarShips() {
		const res = await this.getResource(`${this._apiBase}starships/`);
		return res.results.map(this.transformShip);
	}

	async getStarShip(id) {
		const ship = await this.getResource(`${this._apiBase}starships/${id}/`);
		return this.transformShip(ship);
	}

	extractId(item) {
		const idRegex = /\/([0-9]*)\/$/;
		const id = item.url.match(idRegex)[1];
		return id;
	}

	transformPlanet = data => {
		return {
			name: data.name,
			population: data.population,
			rotation: data.rotation_period,
			diameter: data.diameter,
			id: this.extractId(data)
		};
	};

	transformShip = data => {
		return {
			id: this.extractId(data),
			name: data.name,
			model: data.model,
			manufacturer: data.manufacturer,
			costInCredits: data.costInCredits,
			length: data.length,
			crew: data.crew,
			passengers: data.passengers,
			cargoCapacity: data.cargoCapacity
		};
	};

	transformPerson = data => {
		return {
			id: this.extractId(data),
			name: data.name,
			gender: data.gender,
			birthYear: data.birth_year,
			eyeColor: data.eye_color
		};
	};
}

export default SwapiService;
