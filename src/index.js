import './style.css'
import 'boxicons'

import { format } from 'date-fns'
import {fetchWeatherApi} from './app/fetchWeatherApi'
import {todayDetails, createWeekCards, toggleMetrics, displayError, showLoader, hideLoader } from './app/domController'

const searchForm = document.querySelector('#searchForm')
const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')
const metricBtn = document.querySelector('#metricBtn')
const currentLocation = document.querySelector('#locationTitle')
let activeMetric

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    getWeather(searchInput.value, activeMetric)
})

metricBtn.addEventListener('click', () => {
    let metricUsed = toggleMetrics()
    if(!searchInput.value){
        getWeather(currentLocation.textContent, metricUsed)
    }else{
        if(metricUsed == 'metric'){
            getWeather(searchInput.value, metricUsed)
        }else{
            getWeather(searchInput.value, metricUsed)
        }
    }
})

function getMax(sun, rain, snow) {
    let max ='';
    
    if (sun > rain && sun > snow) {
        max = 'sunny';
    } else if (rain > sun && rain > snow) {
        max = 'rainy';
    } else {
        max = 'snowy';
    }

    return max;
}

async function changeDomMetric(metricPassed){
    let metricSymbol
    if(metricPassed == 'metric'){
        metricSymbol = '°C'
    } else{
        metricSymbol = '°F'
    }
    return metricSymbol
}

function getAlert(alert){
    let rawAlert

    if(alert){
        rawAlert = alert[0].headline
    }else{
        rawAlert = 'No alert for today'
    }
    return rawAlert
}

async function getWeather(location, metric) {
    try{
        showLoader()
        const metricSymbol = await changeDomMetric(metric)
        const weather = await fetchWeatherApi(location, metric);
        console.log(weather);
        const rawlocationTitle = weather.weatherData.resolvedAddress
        const locationTitle = rawlocationTitle.toString()
        const description = weather.weatherData.days[0].description
        const sunnyValue = 100 - weather.weatherData.days[0].cloudcover
        const rainyValue = weather.weatherData.days[0].precipprob
        const snowyValue = weather.weatherData.days[0].snow
        const sunriseRaw = (weather.weatherData.days[0].sunrise).split(':')
        const sunsetRaw = (weather.weatherData.days[0].sunset).split(':')
        
        const sunny = `${(100 - weather.weatherData.days[0].cloudcover).toFixed(2)}%`
        const rainy = `${weather.weatherData.days[0].precipprob}%`
        const snowy = `${weather.weatherData.days[0].snow}%`
        const feel = `${weather.weatherData.days[0].feelslike}${metricSymbol}`
        const rise = `${sunriseRaw[0]}:${sunriseRaw[1]} AM`
        const set = `${sunsetRaw[0]}:${sunsetRaw[1]} PM`
        const alert = getAlert(weather.weatherData.alert)
        let todayWeather = getMax(sunnyValue, rainyValue, snowyValue)

        await todayDetails(todayWeather, locationTitle, description, sunny, rainy, snowy, feel, rise, set, alert)

        for(let i = 0; i < 7; i++){
            const sunny = 100 - weather.weatherData.days[i].cloudcover
            const rainy = weather.weatherData.days[i].precipprob
            const snowy = weather.weatherData.days[i].snow
            let dayWeather = getMax(sunny, rainy, snowy)
            const date = weather.weatherData.days[i].datetime
            const dayName = format(date, 'EEEE')
            const temperature = `${weather.weatherData.days[i].feelslike}${metricSymbol}`
            const sunChance = `${(100 - weather.weatherData.days[i].cloudcover).toFixed(2)}%`
            const rainChance = `${weather.weatherData.days[i].precipprob}%`

            createWeekCards(dayName, dayWeather, temperature, sunChance, rainChance)
        }
    }catch(error){
        displayError('Can\'t find location, please enter valid City or Country')
        console.log(error)
    }finally{
        hideLoader()
    }
}

activeMetric = toggleMetrics()
getWeather('Manila', activeMetric)


// THINGS TO DO

// FONT AND LOGO DESIGN