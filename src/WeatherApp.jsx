import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import "./WeatherApp.css"
import CloudIcon from '@mui/icons-material/Cloud';
export default function WeatherApp(){
    const [weatherInfo, setWeatherInfo] = useState({
        city: "City name",
        feelsLike: 22.36,
        temp: 25.23,
        tempMin: 25.22,
        tempMax: 25.24,
        humidity: 49,
        weather: "cloudy",
        sunrise: 5,
        sunset: 4,
        lon: 65,
        lat: 89
    })

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo)
    }
    return(
        <div>
            <h1>Weatherio<CloudIcon className="weatherIcon"/></h1>
            <div className="WeatherApp">
            <SearchBox updateInfo={updateInfo} className="SearchBox" info={weatherInfo}/>
            {/* <InfoBox info={weatherInfo}/> */}
            </div>
        </div>
    )
}