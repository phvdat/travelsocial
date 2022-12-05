import axiosClient from "./axiosClient";

const notifyApi = {
	getNotifications: (params) => {
		const url = '/notify/load';
		return axiosClient.post(url, params);
	},
}
export default notifyApi;