// Search location input
const apiKey = "f9f500425848431297e232002243001";

const searchLocation = async (searchTerm) => {
	const response = await fetch(
		`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`
	);
	const locations = await response.json();
	displayLocations(locations);
};

const searchLocationInput = document.querySelector(".search-location-input");
searchLocationInput.addEventListener("input", (e) => {
	clearSearchButton.classList.add("show");
	const searchTerm = e.target.value;
	e.target.value === "" ? clearSearchButton.classList.remove("show") : null;
	searchLocation(searchTerm);
});

const locationsContainer = document.querySelector(".search-options-container");
const displayLocations = (locations) => {
	locationsContainer.innerHTML = "";
	locations.forEach((location) => {
		const locationElement = document.createElement("div");
		locationElement.classList.add("location-option");
		locationElement.innerHTML = `
            <h3>${location.name}</h3>
            <p>${location.country}</p>
        `;
		locationsContainer.appendChild(locationElement);
		locationElement.addEventListener("click", () => {
			selectLocation(`${location.name}, ${location.country}`, location.url);
		});
	});
};

const selectLocation = (locationName, locationUrl) => {
	searchLocationInput.value = locationName;
	locationsContainer.innerHTML = "";
	getCurrentWeather(locationUrl);
};

const getCurrentWeather = async (locationUrl) => {
	const response = await fetch(
		`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationUrl}`
	);
	const weather = await response.json();
	console.log(weather);
	updateWeather(weather);
	return weather;
};

const clearSearchButton = document.querySelector(".clear-search-button");

clearSearchButton.addEventListener("click", () => {
	searchLocationInput.value = "";
	locationsContainer.innerHTML = "";
	searchLocationInput.focus();
});

const temperature = document.getElementById("temperature");
const weatherStatusIcon = document.getElementById("weather-status-icon");
const weatherDescription = document.getElementById("weather-description");
const feelsLike = document.getElementById("feels-like");

const updateWeather = async (weather) => {
	const { temp_c, condition } = weather.current;
	temperature.innerHTML = `${temp_c}°`;
	weatherDescription.innerHTML = condition.text;
	feelsLike.innerHTML = `Feels like ${weather.current.feelslike_c}°`;
	return weather;
};
