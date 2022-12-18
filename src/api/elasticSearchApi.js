import axiosClient from "./axiosClient";

const elasticSearchApi = {
	searchPost: (params) => {
		const url = 'post/search'
		return axiosClient.post(url, params)
	},
	searchUser: (params) => {
		const url = 'user/search'
		return axiosClient.post(url, params)
	}
};

export default elasticSearchApi;