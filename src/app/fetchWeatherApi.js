export async function fetchWeatherApi(location, metric){
    try{
        const weatherDataRequest = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next6days?unitGroup=${metric}&include=alerts%2Cobs%2Cremote%2Cfcst&key=6DF5W9YQ23QQ9ASEVRUCT788F&contentType=json`, {
            mode: "cors",
        })
        const weatherData = await weatherDataRequest.json()
        return {weatherData}
    }catch(error){
        console.log(error)
    }
}