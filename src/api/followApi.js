import axiosClient from "./axiosClient";

const followApi = {
	follow: (userIdTarget) => {
		const url = '/follow-user';
		return axiosClient.post(url, { userIdTarget });
	},
	unFollow: (userIdTarget) => {
		const url = '/follow-user';
		return axiosClient.post(url, { userIdTarget });
	}
}
export default followApi;