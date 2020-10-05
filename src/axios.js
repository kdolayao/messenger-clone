//create instance to retrieve data and call the backend
import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:9000",
  baseURL: "https://messenger-clone-mern.herokuapp.com",
});

export default instance;
