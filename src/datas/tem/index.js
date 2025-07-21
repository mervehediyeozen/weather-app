import { Flex, Box, Image, Text, HStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import sun from "../../images/sun1.jpg";
import rain from "../../images/rain.jpg";
import snow from "../../images/snow.jpg";
import cloud from "../../images/cloud.jpg";

function Temp({ weather, index, date }) {
  const main = useSelector((state) => state.weather.main);
  const today = new Date().toISOString().split('T')[0]; 
  const isToday = date === today;  
  const isMain = main === index;  

  const showBigCard = (main === "" && isToday) || (main !== "" && isMain);


  const max = weather.data.daily.temperature_2m_max[index];
  const min = weather.data.daily.temperature_2m_min[index];
  const precipitation = Number(weather.data.daily.precipitation_sum[index]);
  const average = ((max + min) / 2).toFixed(1);


  let weatherIcon = null;
  let weatherAlt = "";
  let weatherText = "";

  if (min < -1) {
    weatherIcon = snow;
    weatherAlt = "snowy";
    weatherText = "Snowy";
  } else if (precipitation > 0) {
    weatherIcon = rain;
    weatherAlt = "rainy";
    weatherText = "Rainy";
  } else if (average <= 10) {
    weatherIcon = cloud;
    weatherAlt = "cloudy";
    weatherText = "Cloudy";
  } else {
    weatherIcon = sun;
    weatherAlt = "sunny";
    weatherText = "Sunny";
  }

  return (
    <Flex
      flexDirection={showBigCard ? "column" : "row"} 
      w={showBigCard ? "400px" : "200px"}  
      fontFamily="monospace"
      color="#394242"
      alignItems="center"
      justifyContent="center"
    >
      <HStack w="full" justifyContent="space-evenly">
        <Text
          fontSize={showBigCard ? "30px" : "22px"} 
          fontWeight="bold"
          textDecoration="underline"
        >
          {average}°C
        </Text>
        <Box textAlign="center">
          <Image
            src={weatherIcon}
            alt={weatherAlt}
            boxSize={showBigCard ? "80px" : "40px"}  
            mt={1}
          />
          <Text fontSize={showBigCard ? "18px" : "13px"} fontWeight="medium">
            {weatherText}
          </Text>
        </Box>
      </HStack>
    </Flex>
  );
}

export default Temp;
