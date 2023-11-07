import axios from "axios";

export const meteoAPI = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
});

const API_KEY = 'c8f3807c1c0b4286813144641232410';

export default function getMeteo (ville){
  return meteoAPI.get(`/current.json?key=${API_KEY}&q=${ville}`);
}

    

