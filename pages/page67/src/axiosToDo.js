import axios from "axios";

const instance = axios.create({
  baseURL: "https://js7-server-default-rtdb.firebaseio.com/"
});

export default instance;
