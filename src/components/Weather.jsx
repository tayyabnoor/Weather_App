import React, {useEffect, useRef, useState} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {

  const inputRef = useRef();
  const[weatherData,setWeatherData] = useState(false);
  //const[city,setCity]= useState("");

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  }

  const search = async (city) => {

      if ( city === "" ) {
        alert("Enter a City Name");
        return;
      }
    
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear;
        setWeatherData({
          humidity: data.main.humidity,
          windspeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      }
      catch(error) {
        setWeatherData(false);
        console.error('Error fetching weather data:', error);
      }
  }
  


  useEffect(()=>{
    search("London");
  },[])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type='text' ref={inputRef} placeholder='Enter City Name'/>
            <img src={search_icon} onClick={()=>search(inputRef.current.value)} alt="" />
        </div>
        {weatherData?<>
          <img src={weatherData.icon} alt="" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C </p>
          <p className='location'>{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="" />
              <div>
                <p>{weatherData.windspeed}km/h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>:<></>}
        
        <div className="dev_by">
          <p>Develope By : <a href="https://www.linkedin.com/in/tayyab-noor-khan/" target='_blank'>Tayyab Noor</a></p>
        </div>
        
      
    </div>
  )
}

export default Weather
