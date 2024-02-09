import { getHours, format } from "date-fns";

const apiKey = "f9f500425848431297e232002243001";

const searchLocation = async (searchTerm) => {
	const response = await fetch(
		`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`
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
	locationsContainer.classList.toggle("show", locations.length > 0);
	locationsContainer.innerHTML = "";
	locations.forEach((location) => {
		const locationElement = document.createElement("div");
		locationElement.classList.add("location-option");
		locationElement.innerHTML = `
            <h3>${location.name}</h3>
            <p>${location.region}, ${location.country}</p>
        `;
		locationsContainer.appendChild(locationElement);
		locationElement.addEventListener("click", () => {
			selectLocation(
				`${location.name}, ${
					location.name === location.region ? location.country : location.region
				}`,
				location.url
			);
		});
	});
};

const selectLocation = (locationName, locationUrl) => {
	const currentLocationInput = document.querySelector(".current-location");
	currentLocationInput.value = locationName;
	searchLocationInput.value = locationName;
	locationsContainer.innerHTML = "";
	locationsContainer.classList.remove("show");
	clearSearchButton.classList.add("show");
	getCurrentWeather(locationUrl);
	getForecastWeather(locationUrl);
	// Setting current location
	localStorage.setItem("currentLocation", locationName);
};

const getCurrentWeather = async (locationUrl) => {
	const response = await fetch(
		`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationUrl}`
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
	clearSearchButton.classList.remove("show");
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
	const tempUnit = localStorage.getItem("tempUnit");
	const speedUnit = localStorage.getItem("speedUnit");

	const {
		temp_c,
		temp_f,
		condition,
		pressure_mb,
		feelslike_c,
		feelslike_f,
		gust_kph,
		gust_mph,
		wind_kph,
		wind_mph,
	} = weather.current;
	temperature.innerHTML = `${tempUnit === "celcius" ? temp_c : temp_f}°`;
	weatherDescription.innerHTML = condition.text;
	feelsLike.innerHTML = `Feels like ${
		tempUnit === "celcius" ? feelslike_c : feelslike_f
	}°`;
	pressure.innerHTML = `${pressure_mb} mb`;
	gusts.innerHTML = `${
		speedUnit === "km/h" ? gust_kph : gust_mph
	} ${speedUnit}`;
	wind.innerHTML = `${speedUnit === "km/h" ? wind_kph : wind_mph} ${speedUnit}`;
};

const getForecastWeather = async (
	locationUrl,
	days = 6,
	airQuality = "no",
	alerts = "yes"
) => {
	const response = await fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationUrl}&days=${days}&aqi=${airQuality}&alerts=${alerts}`
	);
	const forecast = await response.json();
	updateGeneralForecast(forecast);
	updateHourlyForecast(forecast);
	updateWeekForecast(forecast);
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
	const tempUnit = localStorage.getItem("tempUnit");
	const currentDayForecast = forecast.forecast.forecastday[0];
	minTemp.innerHTML = `${
		tempUnit === "celcius"
			? currentDayForecast.day.mintemp_c
			: currentDayForecast.day.mintemp_f
	}°`;
	maxTemp.innerHTML = `${
		tempUnit === "celcius"
			? currentDayForecast.day.maxtemp_c
			: currentDayForecast.day.maxtemp_f
	}°`;
	chanceOfRain.innerHTML = `${currentDayForecast.day.daily_chance_of_rain}%`;
	sunrise.innerHTML = `${currentDayForecast.astro.sunrise}`;
	sunset.innerHTML = `${currentDayForecast.astro.sunset}`;
	uvIndex.innerHTML = `${currentDayForecast.day.uv}`;
	humidity.innerHTML = `${currentDayForecast.day.avghumidity}%`;
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

const updateHourlyForecast = (weather) => {
	hourlyForecastContainer.innerHTML = "";
	const localTime = weather.location.localtime;
	let localHour = getHours(new Date(localTime));
	if (localHour + 8 > 23) localHour = 16;
	for (let i = 0; i < 8; i++) {
		if (localHour > 23) {
			return;
		}
		const { condition } = weather.forecast.forecastday[0].hour[localHour];
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

const weekForecastContainer = document.querySelector(".week-cards-container");
const updateWeekForecast = (weather) => {
	const tempUnit = localStorage.getItem("tempUnit");
	weekForecastContainer.innerHTML = "";
	const { forecastday } = weather.forecast;
	forecastday.forEach((day) => {
		const weekCard = document.createElement("div");
		weekCard.classList.add("week-card");
		const iconContainer = document.createElement("div");
		iconContainer.classList.add("icon-container");
		const icon = document.createElement("img");
		icon.classList.add("week-brief-card-icon");
		icon.src = getIconUrl(day.day.condition.icon);
		iconContainer.appendChild(icon);
		weekCard.appendChild(iconContainer);
		weekForecastContainer.appendChild(weekCard);
		const weekDetailsContainer = document.createElement("div");
		weekDetailsContainer.classList.add("week-details-container");
		weekCard.appendChild(weekDetailsContainer);
		const date = document.createElement("div");
		date.classList.add("date");
		const dayName = document.createElement("p");
		dayName.classList.add("day-name");
		dayName.innerHTML = format(new Date(day.date_epoch * 1000), "iii");
		const dateText = document.createElement("p");
		dateText.classList.add("date");
		dateText.innerHTML = format(new Date(day.date_epoch * 1000), "dd MMM");
		const tempDetails = document.createElement("div");
		tempDetails.classList.add("temp-details");
		const min = document.createElement("div");
		min.classList.add("min");
		const minTemp = document.createElement("p");
		minTemp.classList.add("temp");
		minTemp.innerHTML = `${
			tempUnit === "celcius" ? day.day.mintemp_c : day.day.mintemp_f
		}°`;
		const minTempLabel = document.createElement("p");
		minTempLabel.classList.add("temp-label");
		minTempLabel.innerHTML = "min";
		min.appendChild(minTemp);
		min.appendChild(minTempLabel);
		const max = document.createElement("div");
		max.classList.add("max");
		const maxTemp = document.createElement("p");
		maxTemp.classList.add("temp");
		maxTemp.innerHTML = `${
			tempUnit === "celcius" ? day.day.maxtemp_c : day.day.maxtemp_f
		}°`;
		const maxTempLabel = document.createElement("p");
		maxTempLabel.classList.add("temp-label");
		maxTempLabel.innerHTML = "max";
		max.appendChild(maxTemp);
		max.appendChild(maxTempLabel);
		tempDetails.appendChild(min);
		tempDetails.appendChild(max);
		weekDetailsContainer.appendChild(date);
		date.appendChild(dayName);
		date.appendChild(dateText);
		weekDetailsContainer.appendChild(tempDetails);
	});
};

const settingsBox = document.querySelector(".setting-box");
const handleConfigButtonClick = () => {
	settingsBox.classList.toggle("hide");
};

const configButton = document.querySelector(".config-button");
configButton.addEventListener("click", handleConfigButtonClick);

// Settings placeholders
const tempUnitText = document.querySelector(".temp-unit");
const speedUnitText = document.querySelector(".speed-unit");
const themeNameText = document.querySelector(".theme-name");

// Getting default values
const tempUnit = localStorage.getItem("tempUnit")
	? localStorage.getItem("tempUnit")
	: localStorage.setItem("tempUnit", "celcius");

const speedUnit = localStorage.getItem("speedUnit")
	? localStorage.getItem("speedUnit")
	: localStorage.setItem("speedUnit", "km/h");

const themeName = localStorage.getItem("themeName")
	? localStorage.getItem("themeName")
	: localStorage.setItem("themeName", "light");

const defaultLocation = localStorage.getItem("defaultLocation")
	? localStorage.getItem("defaultLocation")
	: localStorage.setItem("defaultLocation", "San Jose, CR");

const currentLocation = localStorage.getItem("currentLocation")
	? localStorage.getItem("currentLocation")
	: localStorage.setItem("currentLocation", "San Jose, CR");

const updateSettings = () => {
	tempUnitText.innerHTML = localStorage.getItem("tempUnit") || "celcius";
	speedUnitText.innerHTML = localStorage.getItem("speedUnit") || "km/h";
	themeNameText.innerHTML = localStorage.getItem("themeName") || "light";
	const themeName = localStorage.getItem("themeName");
	const pinnedLocation = document.querySelector(".pinned-location");
	pinnedLocation.value = localStorage.getItem("defaultLocation");
	const currentLocationInput = document.querySelector(".current-location");
	currentLocationInput.value = localStorage.getItem("currentLocation");
	renderSavedLocations();
	selectTheme(themeName);
};

const handleTempUnitClick = () => {
	const unit = document.querySelector(".temp-unit").innerHTML;
	unit === "celcius" ? selectTempUnit("fahrenheit") : selectTempUnit("celcius");
};
const tempUnitSelector = document.querySelector(".temp-unit-selector");
tempUnitSelector.addEventListener("click", handleTempUnitClick);

const selectTempUnit = (unit) => {
	localStorage.setItem("tempUnit", unit);
	updateSettings();
	const currentLocation = localStorage.getItem("currentLocation")
		? localStorage.getItem("currentLocation")
		: localStorage.setItem("currentLocation", "San Jose, CR");
	selectLocation(currentLocation, currentLocation);
};

const handleSpeedUnitClick = () => {
	const unit = document.querySelector(".speed-unit").innerHTML;
	unit === "km/h" ? selectSpeedUnit("mph") : selectSpeedUnit("km/h");
};
const speedUnitSelector = document.querySelector(".speed-unit-selector");
speedUnitSelector.addEventListener("click", handleSpeedUnitClick);

const selectSpeedUnit = (unit) => {
	localStorage.setItem("speedUnit", unit);
	updateSettings();
	const currentLocation = localStorage.getItem("currentLocation")
		? localStorage.getItem("currentLocation")
		: localStorage.setItem("currentLocation", "San Jose, CR");
	selectLocation(currentLocation, currentLocation);
};

const selectTheme = (theme) => {
	const body = document.querySelector("body");
	const themeNameText = document.querySelector(".theme-name");
	localStorage.setItem("themeName", theme);
	if (theme === "light") {
		themeNameText.innerHTML = "light";
		body.classList.remove("dark-theme");
		themeIconPath.setAttribute("d", lightIconPath);
	}
	if (theme === "dark") {
		body.classList.add("dark-theme");
		themeIconPath.setAttribute("d", darkIconPath);
		themeNameText.innerHTML = "dark";
	}
};

const darkIconPath =
	"M21.64 13a1 1 0 0 0-1.05-.14a8.05 8.05 0 0 1-3.37.73a8.15 8.15 0 0 1-8.14-8.1a8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69a1 1 0 0 0-.36-1.05m-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14a9.79 9.79 0 0 0 2.1-.22a8.11 8.11 0 0 1-7.18 4.32Z";

const lightIconPath =
	"M12 2c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm0 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm9.25-2.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM12 19c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm-7.75-6.25a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zm-.03-8.53c.3-.3.77-.3 1.06 0l1.5 1.5a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06zm1.06 15.56a.75.75 0 11-1.06-1.06l1.5-1.5a.75.75 0 111.06 1.06l-1.5 1.5zm14.5-15.56a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 001.06 1.06l1.5-1.5c.3-.3.3-.77 0-1.06zm-1.06 15.56a.75.75 0 101.06-1.06l-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5z";

const themeIcon = document.querySelector(".theme-icon");
const themeIconPath = themeIcon.querySelector("path");

const handleThemeNameClick = () => {
	const theme = document.querySelector(".theme-name").innerHTML;
	theme === "light" ? selectTheme("dark") : selectTheme("light");
};

const changeThemeButton = document.querySelector(".theme-selector");
changeThemeButton.addEventListener("click", handleThemeNameClick);

const locationModal = document.querySelector(".location-modal-container");
const locationSelectorButton = document.querySelector(".location-selector");
const handleLocationSelectorClick = () => {
	locationModal.classList.toggle("hide");
};
locationSelectorButton.addEventListener("click", handleLocationSelectorClick);

const closeModalButton = document.querySelector(".close-location-modal-button");
const handleLocationModalClose = () => {
	locationModal.classList.add("hide");
};
closeModalButton.addEventListener("click", handleLocationModalClose);
window.addEventListener("click", (e) => {
	if (e.target === locationModal) {
		handleLocationModalClose();
	}
});

const removeLocationSvg = `<svg color="#445353"
	fill="currentColor"
	class="remove-saved-location-button"
	aria-hidden="true"
	width="20"
	height="20"
	viewBox="0 0 20 20"
	xmlns="http://www.w3.org/2000/svg">
	<path
	d="M10 2a8 8 0 110 16 8 8 0 010-16zM7.8 7.11a.5.5 0 00-.63.06l-.06.07a.5.5 0 00.06.64L9.3 10l-2.12 2.12-.06.07a.5.5 0 00.06.64l.07.06c.2.13.47.11.64-.06L10 10.7l2.12 2.12.07.06c.2.13.46.11.64-.06l.06-.07a.5.5 0 00-.06-.64L10.7 10l2.12-2.12.06-.07a.5.5 0 00-.06-.64l-.07-.06a.5.5 0 00-.64.06L10 9.3 7.88 7.17l-.07-.06z"
	fill="currentColor"></path>
</svg>`;

const saveLocationButton = document.querySelector(".save-location-button");
const handleSaveLocationClick = () => {
	const savedLocations =
		JSON.parse(localStorage.getItem("savedLocations")) || [];
	const currentLocation = document.querySelector(".current-location");
	savedLocations.push(currentLocation.value);
	localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
	renderSavedLocations();
};
saveLocationButton.addEventListener("click", handleSaveLocationClick);
const renderSavedLocations = () => {
	const savedLocations =
		JSON.parse(localStorage.getItem("savedLocations")) || [];
	const savedLocationsContainer = document.querySelector(
		".saved-locations-container"
	);
	savedLocationsContainer.innerHTML = "";
	if (savedLocations.length !== 0) {
		savedLocations.forEach((location, index) => {
			const savedLocation = document.createElement("div");
			savedLocation.classList.add("saved-location");
			const savedLocationText = document.createElement("p");
			savedLocationText.innerHTML = location;
			savedLocation.appendChild(savedLocationText);
			savedLocation.innerHTML += removeLocationSvg;
			const removeButton = savedLocation.querySelector("svg");
			removeButton.addEventListener("click", () => {
				deleteSavedLocation(index);
			});
			savedLocationsContainer.appendChild(savedLocation);
		});
	} else {
		const savedLocation = document.createElement("div");
		savedLocation.classList.add("saved-location", "text-center");
		const savedLocationText = document.createElement("p");
		savedLocationText.innerHTML = "No saved locations...";
		savedLocation.appendChild(savedLocationText);
		savedLocationsContainer.appendChild(savedLocation);
	}
};

const deleteSavedLocation = (index) => {
	const savedLocations = JSON.parse(localStorage.getItem("savedLocations"));
	savedLocations.splice(index, 1);
	localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
	renderSavedLocations();
};

const setDefaultLocationButton = document.querySelector(
	".set-default-location-button"
);
const handlePinLocationClick = () => {
	const pinnedLocation = document.querySelector(".pinned-location");
	const currentLocation = document.querySelector(".current-location");
	localStorage.setItem("defaultLocation", currentLocation.value);
	pinnedLocation.value = localStorage.getItem("defaultLocation");
	localStorage.setItem("defaultLocation", pinnedLocation.value);
};
setDefaultLocationButton.addEventListener("click", handlePinLocationClick);

updateSettings();
if (!defaultLocation) {
	selectLocation("San Jose, CR", "San Jose, CR");
} else {
	selectLocation(defaultLocation, defaultLocation);
}
