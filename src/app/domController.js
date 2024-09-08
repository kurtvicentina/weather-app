import 'boxicons'

const todayContainer = document.querySelector('.today-container')
const todayWeatherContainer = todayContainer.querySelector('#todayWeather')
const locationTitle = document.querySelector('#locationTitle')
const descriptionTitle = document.querySelector('#descriptionTitle')
const sunnyTitle = document.querySelector('#sunnyTitle')
const rainyTitle = document.querySelector('#rainyTitle')
const snowyTitle = document.querySelector('#snowyTitle')
const feelTitle = document.querySelector('#feelsLike')
const sunrise = document.querySelector('#sunrise')
const sunset = document.querySelector('#sunset')
const alertTitle = document.querySelector('#alertTitle')
const weekContainer = document.querySelector('.week-container')
const farenheitSpan = document.querySelector('#farenheit')
const celciusSpan = document.querySelector('#celcius')
const errorContainer = document.querySelector('#fail')
const successContainer = document.querySelector('#success')
const loaderContainer = document.querySelector('#loaderContainer')

export async function todayDetails(todayWeather, location, description,sunny, rainy, snowy, feelsLike, rise, set, alert){
    errorContainer.classList.add('hidden')
    successContainer.classList.remove('hidden')
    todayWeatherContainer.setAttribute('class', `today-${todayWeather}`)
    locationTitle.textContent = location
    descriptionTitle.textContent = `${description}`
    sunnyTitle.textContent = `Sun chances: ${sunny}`
    rainyTitle.textContent = `Rain chances: ${rainy}`
    snowyTitle.textContent = `Snow chances: ${snowy}`
    feelTitle.textContent = `Temp feels like: ${feelsLike}`
    sunrise.textContent = `Sunrise: ${rise}`
    sunset.textContent = `Sunset: ${set}`
    alertTitle.textContent = `${alert}`
}


export async function createWeekCards(day, weather, temperature, sunChance, rainChance){
    deleteWeekCards()

    const dayContainer = document.createElement('div')
    dayContainer.setAttribute('class', 'day')

    const dayTitle = document.createElement('h2')
    dayTitle.setAttribute('class', 'day-title')

    const weatherIcon = document.createElement('i')
    weatherIcon.classList.add('weather-icon')

    const dayTemperature = document.createElement('p')
    dayTemperature.setAttribute('class', 'temperature')

    const chanceOfSun = document.createElement('p')
    chanceOfSun.setAttribute('class', 'chance')

    const chanceOfRain = document.createElement('p')
    chanceOfRain.setAttribute('class', 'chance')

    dayTitle.textContent = day

    if(await weather == 'sunny'){
        weatherIcon.setAttribute('class', 'bx bxs-sun')
        dayContainer.classList.add('sunny')
    }else if(await weather == 'rainy'){
        weatherIcon.setAttribute('class', 'bx bxs-cloud-rain')
        dayContainer.classList.add('rainy')
    }
    else{
        weatherIcon.setAttribute('class', 'bx bx-cloud-snow')
        dayContainer.classList.add('snowy')
    } 
    dayTemperature.textContent = `The temperature will feel like: ${temperature}`
    chanceOfSun.textContent = `Sun chance: ${sunChance}`
    chanceOfRain.textContent = `Rain chance: ${rainChance}`

    dayContainer.append(dayTitle)
    dayContainer.append(weatherIcon)
    dayContainer.append(dayTemperature)
    dayContainer.append(chanceOfSun)
    dayContainer.append(chanceOfRain)
    weekContainer.append(dayContainer)
}

export function deleteWeekCards(){
    weekContainer.innerHTML = ''
}

export function toggleMetrics(){
    let active

    if(farenheitSpan.classList.contains('span-is-active')){
        farenheitSpan.classList.remove('span-is-active')
        celciusSpan.classList.add('span-is-active')
        active = 'metric'
    }else{
        celciusSpan.classList.remove('span-is-active')
        farenheitSpan.classList.add('span-is-active')
        active = 'us'
    }
    return active
}

export function displayError(error){
    successContainer.classList.add('hidden')
    errorContainer.classList.remove('hidden')

    const errorMessage = errorContainer.querySelector('#failMessage')

    errorMessage.textContent = error
    errorContainer.append(errorMessage)
}

export function showLoader(){
    loaderContainer.setAttribute('class', 'loader')
}

export function hideLoader(){
    loaderContainer.setAttribute('class', 'hidden')
}