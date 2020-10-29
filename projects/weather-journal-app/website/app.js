/* Global Variables */
const apiKey = '50843be927de3e4a9f321bb7ccf7f92e';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('generate').addEventListener('click', generateEventHandler);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Click event handler for Generate button
function generateEventHandler() {
    const zip = document.getElementById('zip');
    const feelings = document.getElementById('feelings');

    getWeatherData(zip.value).then((data) => {
        const weatherData = {
            temperature: data.main.temp,
            date: newDate,
            user_response: feelings.value
        };
        saveWeatherData('/data', weatherData).then((data) => {
            loadWeatherData();
        });
    });
}

async function getWeatherData(zipCode) {
    if (!zipCode) zipCode = '94040'; // Set default value to USA
    const apiUrl = `${baseUrl}?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const res = await fetch(apiUrl);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data: ' + error.message);
    }
}

async function saveWeatherData(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    try {
        return await res.json();
    } catch (error) {
        console.error('Error saving weather data: ' + error.message);
    }
}

async function loadWeatherData() {
    const res = await fetch('/data');
    try {
        const projectData = await res.json();
        if (projectData) {
            document.getElementById('date').innerHTML = projectData.date;
            document.getElementById('temp').innerHTML = projectData.temperature;
            document.getElementById('content').innerHTML = projectData.user_response;
        }
    } catch (error) {
        console.error('Error loading weather data: ' + error.message);
    }
}