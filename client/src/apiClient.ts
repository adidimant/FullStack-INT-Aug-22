import axios from 'axios';

const axiosClient = axios.create(); // we have created specific instance of axios so we can define on it middlewears (interceptors)

export default axiosClient;
