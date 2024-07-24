import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import "./InfoBox.css"
import Loader from './Loader';
import { useState, useEffect } from 'react';
export default function InfoBox({info, loading}) {
    const HOT_URL = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D"
    const COLD_URL = "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D"
    const RAIN_URL = "https://images.unsplash.com/photo-1572455857811-045fb4255b5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhaW55JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D"


    return(
        <div className="InfoBox">
            
            <Card sx={{ maxWidth: 400 }}>
      <CardMedia className='imgBox'
        sx={{ height: 140 }}
        image={info.humidity > 80 ? RAIN_URL : info.temp > 15 ? HOT_URL : COLD_URL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.city.toUpperCase()}&nbsp;&nbsp;{info.humidity > 80 ? <ThunderstormIcon/> : info.temp > 15 ? <WbSunnyIcon/> : <AcUnitIcon/>}
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"span"}>
          <div>Temperature : {info.temp}&deg;C</div>
          <div>Feels Like : {info.feelsLike}&deg;C</div>
          <div>
            <span>Min Temp: {info.tempMin}&deg;C</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>Max Temp: {info.tempMax}&deg;C</span>
          </div>
          <div>Humidity: {info.humidity}</div>
          <div>
            <span>Sunrise: {
            new Date(info.sunrise*1000).getHours() +':' + new Date(info.sunrise*1000).getMinutes()+":"+ new Date(info.sunrise*1000).getSeconds() + " AM(IST)"
            }</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>Sunset: 
                {
                     new Date(info.sunset*1000).getHours() - 12 +':' + new Date(info.sunset*1000).getMinutes()+":"+ new Date(info.sunset*1000).getSeconds() + " PM(IST)"
                }
            </span>
          </div>
          <p>The weather can described as {info.weather}</p>
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
        </div>
    )
            
}