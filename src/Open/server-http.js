import axios from "axios";

import {MY_DEPLOY_URL} from '../constants'
export default axios.create({
  baseURL: MY_DEPLOY_URL,
  headers: {
    "Content-type": "application/json"
  }
});
