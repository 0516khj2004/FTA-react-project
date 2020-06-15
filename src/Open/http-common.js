
import axios from "axios";
import {MY_UPLOAD_URL} from '../constants';


export default axios.create({
  baseURL: MY_UPLOAD_URL,
  headers: {
    "Content-type": "application/json"
  }
});

