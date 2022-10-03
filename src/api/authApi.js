import axiosClient from "./axiosClient";

const authApi = {
	loginApi: (data) => {
		const url = "/login";
		return axiosClient.post(url, data);
	},
	registerApi: (data) => {
		const url = "/register";
		return axiosClient.post(url, data);
	},
}

export default authApi;