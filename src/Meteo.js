import { faWineGlassEmpty } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getMeteo from './ServiceMeteo'
import { useEffect,useState } from "react";

import {faLocationPin ,faMagnifyingGlassLocation, faLeftLong} from '@fortawesome/free-solid-svg-icons'
import MySVGComponent from './Svg'; 

import './meteo.css';
function Meteo()
{
    const [ville,setVille]=useState('Diourbel');
    const [weatherData,setWeatherData] = useState({
        
            location: {
              name: "",
              region: "",
              country: "",
              lat: 0,
              lon:0,
              tz_id: "",
              localtime_epoch:0,
              localtime: ""
            },
            current: {
              last_updated_epoch: 0,
              last_updated: "",
              temp_c: 0,
              temp_f: 0.0,
              is_day: 1,
              condition: {
                text: "",
                icon: "",
                code: 0
              },
              wind_mph: 0.0,
              wind_kph: 0,
              wind_degree: 0,
              wind_dir: "",
              pressure_mb: 0,
              pressure_in: 0.0,
              precip_mm: 0.0,
              precip_in: 0.00,
              humidity: 0,
              cloud: 0,
              feelslike_c: 0.0,
              feelslike_f: 0.0,
              vis_km: 0,
              vis_miles: 0,
              uv: 0,
              gust_mph: 0.0,
              gust_kph: 0.0
            }
          
        
    });

useEffect(()=>
{
  const dataMetho=async()=>{
    try {
      const resp =await getMeteo(ville);
      setWeatherData(resp.data);
    } catch (error) {
      console.log('Erreur lors de la recuperation des donnees de weather API');
      setWeatherData(null);
    }
  };
  dataMetho();
  },[ville]);


const handleSearch=(e)=>{
  e.preventDefault();
  getMeteo(ville).then(resp=>{
    setWeatherData(resp.data);
  }).catch((error)=>{
    console.log("erreur lors de la recuperation de donnees", error);
    weatherData(null);
  });
}


return (
    <body>
        <div>
        <form onSubmit={handleSearch}>
                <div className='row g-2'>
                    <div className='col-auto'>
                    <input
          type="text"
          placeholder="Entrez le nom de la ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        /> </div>
                    <div className='col-auto'>
                  
                    </div>
                </div>
               
            </form>
        </div>
        <div>
    <h2>La Meteo   {weatherData && weatherData.location && weatherData.location.name} </h2>
    {weatherData && (
      <div className="grid-container">
        <div className="location">
        <h3 className="city"><FontAwesomeIcon icon={faLocationPin}  />  {weatherData && weatherData.location&& weatherData.location.name} </h3>
        <h3>Pays : {weatherData&&weatherData.location&&weatherData.location.country}</h3>
        <h3>Region : {weatherData&&weatherData.location&&weatherData.location.region}</h3>
        <h3>Latitude: {weatherData&&weatherData.location&&weatherData.location.lat}</h3>
        <h3>Longitude : {weatherData&&weatherData.location&&weatherData.location.lon}</h3>
        <h3>fuseau horaire: {weatherData&&weatherData.location&&weatherData.location.tz_id}</h3>
        
        <h3>heure locale : {weatherData&&weatherData.location&&weatherData.location.localtime}</h3>
        </div>
        <div className="current">
        <h3 className="city "><MySVGComponent></MySVGComponent> {weatherData&&weatherData.current&&weatherData.current.temp_c}°C</h3>
        <h3>Humidité : {weatherData&&weatherData.current&&weatherData.current.humidity}%</h3>
        <h3>Condition : {weatherData&&weatherData.current&&weatherData.current.condition&&weatherData.current.condition.text}</h3>
        <h3>Vitesse du vent : {weatherData&&weatherData.current&&weatherData.current.wind_kph} km/h</h3>
       
       
        
       
   
       
        </div>
        
        <div className="condition">
          <img src={weatherData&&weatherData.current&&weatherData.current.condition.icon}></img>.
          <h3> ciel: {weatherData&&weatherData.current&&weatherData.current.condition.text} </h3>
          <h3>Nuage: {weatherData&&weatherData.current&&weatherData.current.cloud} </h3>
      
      <h3>precipitation: {weatherData&&weatherData.current&&weatherData.current.precip_mm} </h3></div>
      </div>
    )}
  </div>   
    </body>
);
}
export default Meteo;