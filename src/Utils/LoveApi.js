import axios from "axios";

export default axios.create({
    baseURL: "http://localhost/ServiceWeb-SiteAPI-ProjetFinal-2037188-/",
    responseType: "json", 
  });