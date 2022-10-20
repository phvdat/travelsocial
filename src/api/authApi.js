import axiosClient from "./axiosClient";

const authApi = {
	loginApi: (data) => {
		const url = "/user/login";
		return axiosClient.post(url, data);
	},
	registerApi: (data) => {
		const url = "/user/register";
		return axiosClient.post(url, data);
	},
	getUserInfoApi: () => {
		const url = "/user/info-user";
		return axiosClient.get(url);
	}
}

export default authApi;