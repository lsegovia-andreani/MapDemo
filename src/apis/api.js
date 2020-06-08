import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 100000,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        'Accept': 'application/json'
    }
});