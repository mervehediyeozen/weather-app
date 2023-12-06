import './App.css';
import  { WeatherProvider } from './context/WeatherContext';
import  {CityProvider } from './context/CityContext';
import Container from './components/Container';

function App() {
        
  return (
    <div className="App">
      <CityProvider>
          <WeatherProvider>
                           <Container/>
          </WeatherProvider>
      </CityProvider>
     
    </div>
  );
}

export default App;


