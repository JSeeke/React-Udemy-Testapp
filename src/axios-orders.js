import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-b4800.firebaseio.com/'
});

export default instance