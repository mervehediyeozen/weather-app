import React, { useContext, useState,useEffect } from 'react'
import CityContext from '../context/CityContext';
import WeatherContext from '../context/WeatherContext';


function Container() {

    const cities = useContext(CityContext);
    const {weatherConditions, setCity, city} = useContext(WeatherContext);

    
    const[dateTimes, setDateTimes] = useState([]);
    const [day,setDay] = useState();
    

    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    useEffect(() =>{
        weatherConditions.forEach((item) => setDateTimes(current => [...current,item.datetime])
        
        );
        const day = new Date(dateTimes[0]);
        setDay(day.getDay());
        
    
    
      },[weatherConditions])

      function handleCity(e)
      {
       setCity(e.target.value);
      }

      

  return (
  <div className="container">
    <div >
      <select name="city-names" id="city-names" onChange={handleCity} value={city}  >
        {cities.map((city,i) => 
        <option key={i} value={city.name}>
          {city.name}
        </option>
        )}
      </select>
    </div>

    <div className='container2'>
        
        {weatherConditions.map((weather,i)=>
      <div className='container3' key={i}> 
        <div className='flexbox'>
          { days[(day+i)%7]}
        </div>
        <div className='flexbox'> 
          <img style={{width:"130px"}} src={require(`../svg/${weather.icon}.svg`)} alt="" />
        </div>

        <div className='flexbox' >
          <span style={{marginRight:"10px"}}> {weather.tempmax}° </span>
          <span style={{marginLeft:"10px"}}> {weather.tempmin}°</span>
        </div>
      </div> )}
       

    </div>
      
  </div>
  )
}

export default Container;