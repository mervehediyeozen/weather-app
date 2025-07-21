import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './redux/weatherSlice';
import { Box, Text, Spinner, Flex, Select , Button, Heading} from '@chakra-ui/react';
import { cities } from './datas/cities';
import bg from "./images/clouds.jpg"
import Temp from './datas/tem';
import { setMain } from './redux/weatherSlice';
function App() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  const today = new Date().toISOString().split('T')[0]; 


  const changeMain= (id) => {
    dispatch(setMain(id))
  }
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  useEffect(() => {
    dispatch(fetchWeather(selectedCity));
  }, [dispatch, selectedCity]);

  const handleChange = (e) => {
    const city = cities.find((c) => c.name === e.target.value);
    setSelectedCity(city);
    
  };

  return (
    <Flex flexDirection="column" w="full" h="700px" justifyContent="center" maxH="1500px"  bgImage={`url(${bg})`}
  bgSize="cover"
  bgRepeat="no-repeat"
  bgPosition="center" >
        
     
      <Flex justifyContent="center">
         <Box  border="1px" w="1200px" h="auto" bg="#edf5f4" p="20px" rounded="45px" borderColor="#899fa3" boxShadow="2xl">
        {weather.status === 'loading' && 
              <>
              <Flex justifyItems="center" justifyContent="center" p="50px">
                <Box
              m={4}
              p={4}
              w="400px"
              bg="inherit"
              borderColor="blue.500"
            >
               <Text color="white" fontSize="25px"> Waiting..</Text>
               <Spinner color="white"/>
                </Box>
               </Flex>
              
              </>}
    {weather.status === 'succeeded' && weather.data && weather.data.daily && (
      <>
         <Box justifyItems="center" mt="10px">
        <Heading fontSize="50px" color="#475559" fontFamily="cursive"> Weather Forecast</Heading>
      </Box>
  <Flex justifyContent="center"> 
    <Box mt="15px">
    {weather.data.daily.time.map((date, index) => {
      if ((weather.main !== "" && index === weather.main) || (weather.main === "" && date === today)) {
        return (
          <Flex  key={index}>
            <Box
              
              m={4}
              ml="100px"
              p={4}
              w="400px"
              borderWidth="2px"
              rounded="20px"
              bg="white"
              borderColor="#b4cfcf"
              boxShadow="2xl"
            >
           
              <Temp weather={weather} index={index} date={date} />
              <Box justifyItems="flex-end" color="#445454">
              <Text ><strong> Max:</strong> {weather.data.daily.temperature_2m_max[index]}°C</Text>
              <Text> <strong>Min: </strong> {weather.data.daily.temperature_2m_min[index]}°C</Text>
              <Text> <strong>Rain:</strong> {weather.data.daily.precipitation_sum[index]} mm</Text>
              </Box>
            </Box>
          </Flex>
        );
      }
      
      return null;
    })}
    </Box>
    <Flex>
        <Box   w="200px" h="100px" display="flex" ml="20px" mt="150px"  bg="#d3e2e3" rounded="10px" flexDirection="column" p="20px" >
          <Text textDecoration="underline" fontWeight="medium"> Select any city</Text>
      <Select  onChange={handleChange} value={selectedCity.name} mb={4} variant="flushed"   w="170px" textAlign="flex-end" alignItems="flex-end">
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>
        </Box>
        </Flex>
  </Flex>
  </>
)}
    
    
   {weather.status === 'succeeded' && weather.data && weather.data.daily && (
  <Flex wrap="wrap" justify="center">
    {weather.data.daily.time.map((date, index) => {
         if ((weather.main == "" && index !== weather.main) || (weather.main !== "" && date !== today)) {
        return (
          <>
           <Box>
          <Button
            
            key={index}
            h="120px"
            m={3}
            p="20px"
            w="220px"
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            borderColor="gray.200"
            boxShadow="lg"
            onClick={() => changeMain(index) }
            _hover={{boxShadow:"2xl" , borderColor:"#232626"}}
          >
            
            <Temp weather={weather} index={index} />
            </Button>
          </Box>
          </>
        );
      }
      return null;
    })}
    
  </Flex>
)}
          
              </Box>
              </Flex>
      {weather.status === 'failed' && <Text>Veri alınamadı.</Text>}
   
    </Flex>
  );
}

export default App;
