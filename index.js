const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card= document.querySelector(".card");
const apiKey="f42f71d48e8bda221b5c7256b5a7684a";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error)
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch (apiURL);
    
    if (!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    const   {name: city,
            main: {temp, humidity}, 
            weather:[{description, id}]}=data;

    card.textContent="";
    card.style.display="flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");


    cityDisplay.textContent=city;
    card.appendChild(cityDisplay);
    cityDisplay.classList.add("cityDisplay");

    const temperature = Math.round(temp-273.15);
    tempDisplay.textContent=`${temperature}°C`;
    card.appendChild(tempDisplay);
    tempDisplay.classList.add("tempDisplay");

    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    card.appendChild(humidityDisplay);
    humidityDisplay.classList.add("humidityDisplay");

    descDisplay.textContent=description;
    card.appendChild(descDisplay);
    descDisplay.classList.add("descDisplay");

    weatherEmoji.textContent= getWeatherEmoji(id);
    card.appendChild(weatherEmoji);
    weatherEmoji.classList.add("weatherEmoji");
}

function getWeatherEmoji(weatherID){
    switch (true){
        case(weatherID>=200 && weatherID<300):
        return '⛈️';
        case(weatherID>=300 && weatherID<400):
        return '🌧️';
        case(weatherID>=500 && weatherID<600):
        return '⛈️';
        case(weatherID>=600 && weatherID<700):
        return '❄️';
        case(weatherID>=700 && weatherID<800):
        return '🌫️';
        case(weatherID===800):
        return '☀️';
        case(weatherID>=801 && weatherID<810):
        return '☁️';

        default:
            return'❓';
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");
    card.textContent= "";
    card.style.display= "flex";
    card.appendChild(errorDisplay); 

}