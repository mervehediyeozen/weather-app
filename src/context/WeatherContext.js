import { createContext,useEffect,useState} from "react";
import axios from "axios";
const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
    const [weatherConditions, setWeatherConditions] = useState([]);
    const [city, setCity] = useState("Sakarya");

    const values = {weatherConditions, setCity, city}
    
    useEffect(() => {
    
        async function fetching2()
    {
      await axios(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&include=days&key=A7DJ2VZ86L5JYYLXU3KCFP97J&contentType=json`)
      .then(res => res.data)
      .then(res =>  res.days)
      .then(res => {setWeatherConditions(res)
      
    })}

    fetching2();

    },[city])
    
    return <WeatherContext.Provider value={values}> {children}</WeatherContext.Provider>
}

export default WeatherContext;