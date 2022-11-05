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
	getUserInfoApi: (params) => {
		const url = "/user/info-user";
		return axiosClient.get(url, { params });
	},
	upadateUserInfoApi: (data) => {
		const url = "/user/update-info-user";
		return axiosClient.post(url, data);
	}
}

export default authApi;