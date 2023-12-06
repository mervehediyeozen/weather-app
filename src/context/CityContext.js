import axios from "axios";
import { createContext, useEffect, useState } from "react";

const CityContext = createContext();

export const CityProvider = ({children}) => {
    const [cities, setCities] = useState([]);

    useEffect(() =>{
        async function fetching()
        {
          await axios('https://turkiyeapi.cyclic.app/api/v1/provinces?fields=name')
          .then(res => res.data)
          .then(res => res['data'])
          .then((res) => 
          {
            setCities(res);
            
          })
        }

        fetching();
    },[])

    return <CityContext.Provider value={cities}> {children} </CityContext.Provider>
}

export default CityContext;