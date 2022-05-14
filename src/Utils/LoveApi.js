import axios from "axios";

export default axios.create({
    baseURL: "https://gentle-refuge-59442.herokuapp.com/",
    responseType: "json", 
  });