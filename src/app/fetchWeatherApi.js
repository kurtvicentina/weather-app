export async function fetchWeatherApi(location){
    try{
        const weatherDataRequest = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&include=stats%2Cobs%2Cremote%2Cfcst&key=6DF5W9YQ23QQ9ASEVRUCT788F&contentType=json`, {
            mode: "cors",
        })
        const weatherData = await weatherDataRequest.json()
        return {weatherData}
    }catch(error){
        console.log(error)
    }
}
