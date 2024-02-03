import { getHours } from "date-fns";

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
	getForecastWeather(locationUrl);
};

const getCurrentWeather = async (locationUrl) => {
	const response = await fetch(
		`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationUrl}`
	);
	const weather = await response.json();
	updateCurrentWeather(weather);
	updateCurrentWeatherIcon(weather);
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
const pressure = document.getElementById("pressure");

const updateCurrentWeatherIcon = (weather) => {
	const { condition } = weather.current;
	const iconUrl = getIconUrl(condition.icon);
	weatherStatusIcon.src = iconUrl;
};

const updateCurrentWeather = async (weather) => {
	const { temp_c, condition, pressure_mb } = weather.current;
	temperature.innerHTML = `${temp_c}°`;
	weatherDescription.innerHTML = condition.text;
	feelsLike.innerHTML = `Feels like ${weather.current.feelslike_c}°`;
	pressure.innerHTML = `${pressure_mb} mb`;
};

const getForecastWeather = async (
	locationUrl,
	days = 6,
	airQuality = "no",
	alerts = "yes"
) => {
	const response = await fetch(
		`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationUrl}&days=${days}&aqi=${airQuality}&alerts=${alerts}`
	);
	const forecast = await response.json();
	updateGeneralForecast(forecast);
};

const minTemp = document.getElementById("min-temp");
const maxTemp = document.getElementById("max-temp");
const chanceOfRain = document.getElementById("chance-of-rain");
const wind = document.getElementById("wind");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const uvIndex = document.getElementById("uv-index");
const humidity = document.getElementById("humidity");
const gusts = document.getElementById("gusts");

const updateGeneralForecast = (forecast) => {
	const currentDayForecast = forecast.forecast.forecastday[0];
	minTemp.innerHTML = `${currentDayForecast.day.mintemp_c}°`;
	maxTemp.innerHTML = `${currentDayForecast.day.maxtemp_c}°`;
	chanceOfRain.innerHTML = `${currentDayForecast.day.daily_chance_of_rain}%`;
	wind.innerHTML = `${currentDayForecast.day.maxwind_kph} km/h`;
	sunrise.innerHTML = `${currentDayForecast.astro.sunrise}`;
	sunset.innerHTML = `${currentDayForecast.astro.sunset}`;
	uvIndex.innerHTML = `${currentDayForecast.day.uv}`;
	humidity.innerHTML = `${currentDayForecast.day.avghumidity}%`;
	gusts.innerHTML = `${currentDayForecast.day.maxwind_kph} km/h`;
	updateHourlyForecast(forecast);
};

const hourlyForecastContainer = document.querySelector(
	".hourly-cards-container"
);

const formatHour = (hour) => {
	const amOrPm = hour < 12 ? "AM" : "PM";
	let hourNumber = hour < 12 ? hour : hour - 12;
	hourNumber === 0 ? (hourNumber = 12) : null;
	return `${hourNumber} ${amOrPm}`;
};

const getIconUrl = (icon) => {
	const iconFolder = icon.match(/day|night/g)[0];
	const iconNumber = icon.match(/\d+/g)[2];
	return `assets/icons/${iconFolder}/${iconNumber}.svg`;
};

const updateHourlyForecast = (forecast) => {
	hourlyForecastContainer.innerHTML = "";
	const localTime = forecast.location.localtime;
	let localHour = getHours(new Date(localTime));
	if (localHour + 8 > 23) localHour = 16;
	for (let i = 0; i < 8; i++) {
		if (localHour > 23) {
			return;
		}
		const { condition } = forecast.forecast.forecastday[0].hour[localHour];
		const iconUrl = getIconUrl(condition.icon);
		const hourlyCard = document.createElement("div");
		hourlyCard.classList.add("hourly-card");
		const hourText = document.createElement("span");
		hourText.classList.add("hour-text", "small-text", "dark-text");
		hourText.innerHTML = formatHour(parseInt(localHour));
		const weatherIcon = document.createElement("img");
		weatherIcon.classList.add("weather-icon");
		weatherIcon.src = iconUrl;
		const tempText = document.createElement("p");
		tempText.classList.add("temp-text", "dark-text");
		hourlyCard.appendChild(hourText);
		hourlyCard.appendChild(weatherIcon);
		hourlyCard.appendChild(tempText);
		hourlyForecastContainer.appendChild(hourlyCard);
		localHour++;
	}
};
