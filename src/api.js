// src/API.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', // ❗️NO /books here
});

export default API;

