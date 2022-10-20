// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_TRAVEL_SOCIAL_API,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
	// Handle token here ...
	const access_token = JSON.parse(localStorage.getItem('access_token'));
	
	if (access_token) {
		config.headers.Authorization = `Bearer ${access_token}`;
	}
	return config;
})
axiosClient.interceptors.response.use((response) => {
	if (response && response.data) {
		return response.data;
	}
	return response;
}, (error) => {
	// Handle errors
	throw error;
});
export default axiosClient;