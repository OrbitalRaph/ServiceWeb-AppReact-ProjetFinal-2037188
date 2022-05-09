import axios from "axios";


const token = 'd2ef3ce017msh83680f8d2c474a1p18bad7jsn8bba84b4cb1a'

export default axios.create({
    baseURL: "https://love-calculator.p.rapidapi.com",
    responseType: "json", 
    headers: {
        'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
        'X-RapidAPI-Key': token
      }   
  });