import './style.css'
import 'boxicons'

import {fetchWeatherApi} from './app/fetchWeatherApi'

async function getWeather(location) {
    const weather = await fetchWeatherApi(location);
    console.log(weather);
}
