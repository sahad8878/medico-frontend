import axios from 'axios';
import baseUrl from '../Api/Api';

const instance = axios.create({
  baseURL: baseUrl,
});


export default instance;
