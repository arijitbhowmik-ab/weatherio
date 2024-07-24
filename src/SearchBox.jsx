import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Search';
import "./SearchBox.css"
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import "./InfoBox.css"
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Loader from './Loader';
import useGeolocation from "react-hook-geolocation";
export default function SearchBox({updateInfo, info}) {
    let [city, setCity] = useState("")
    let [error, setError] = useState(false)
    let [pos, setPos] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const API_URL = "https://api.openweathermap.org/data/2.5/weather"
    const API_KEY = "23a66db112ae91232162cbdffe560848"

    let getWeatherInfo = async () => {
      try{
        setIsLoading(true)
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
      let jsonResponse = await response.json()
      setIsLoading(false)
      console.log(jsonResponse)
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        sunrise: jsonResponse.sys.sunrise,
        sunset: jsonResponse.sys.sunset,
        weather: jsonResponse.weather[0].description,
      }
      console.log(result)
      let unixSunrise = result.sunrise
      let sunRise = new Date(unixSunrise*1000)
      let unixSunset = result.sunset
      let sunSet = new Date(unixSunset*1000)
      // console.log(sunRise.getHours()+":"+sunRise.getMinutes()+":"+sunRise.getSeconds()+"hours")
      return result;
      }catch(err){
        throw err
      }
    }

    //  useEffect(()=>{
    //     const geolocation = useGeolocation();
       
    //   async function getCurrentWeather() {
    //     function getLocation() {
    //       if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(showPosition);
    //       }
    //     }
    //     getLocation()
    //     async function showPosition(position) {
    //     try{
    //     setIsLoading(true)
    //     let response = await fetch(`${API_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`)
    //     let jsonResponse = await response.json()
    //     setIsLoading(false)
    //     console.log(jsonResponse)
    //     let result = {
    //       city: city,
    //       temp: jsonResponse.main.temp,
    //       tempMin: jsonResponse.main.temp_min,
    //       tempMax: jsonResponse.main.temp_max,
    //       humidity: jsonResponse.main.humidity,
    //       feelsLike: jsonResponse.main.feels_like,
    //       sunrise: jsonResponse.sys.sunrise,
    //       sunset: jsonResponse.sys.sunset,
    //       weather: jsonResponse.weather[0].description,
    //       lon: jsonResponse.coord.lon,
    //       lat: jsonResponse.coord.lat,
    //     }
    //     console.log(result)
    //     let unixSunrise = result.sunrise
    //     let sunRise = new Date(unixSunrise*1000)
    //     let unixSunset = result.sunset
    //     let sunSet = new Date(unixSunset*1000)
    //     console.log(sunRise.getHours()+":"+sunRise.getMinutes()+":"+sunRise.getSeconds()+"hours")
    //     return result;
    //     }catch(err){
    //       throw err
    //     }
    //   }
    //   }
    //   getCurrentWeather()
    // })

    let handleChange =(event) => {
        setCity(event.target.value)
    }
    let handleSubmit = async (event) => {
        try{
        event.preventDefault()
        console.log(city)
        setCity("")
        let newInfo = await getWeatherInfo()
        updateInfo(newInfo)
        setIsLoading(false)
        setError(false)
        }catch(err){
            setError(true)
        }
    }
    return(
        <div className='SearchBox'>
        <form onSubmit={handleSubmit}>
        <TextField id="city" className='inputBox' label="City name" variant="outlined" required value={city} onChange={handleChange}/> &nbsp;
        <Button variant="contained" endIcon={<SendIcon />} className='SearchBtn' type='submit'>
        Search
      </Button>
      {
        // error && <p style={{color: "red"}}>No such place in our API</p>
        // error ? <p style={{color: "red"}}>No such place in our API</p> : <InfoBox info={info}/>
        error ? <div className='InfoBox'>
            <CardContent style={{color: "red"}}>No such city available, Try again!</CardContent>
            <CardMedia className='imgBox'
        sx={{ height: 140 }}
        image="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVycm9yfGVufDB8fDB8fHww"
        title="green iguana"
      /></div> : (isLoading ?  <Loader/> : <InfoBox info={info} loading={setIsLoading}/>)
      }
        </form>
        </div>
    )
}