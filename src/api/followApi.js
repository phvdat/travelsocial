import axiosClient from "./axiosClient";

const followApi = {
	follow: (userIdTarget) => {
		const url = '/follow/follow-user';
		return axiosClient.post(url, userIdTarget);
	},
	unFollow: (userIdTarget) => {
		const url = '/follow/follow-user';
		return axiosClient.post(url, userIdTarget);
	},
	getFollower: (params) => {
		const url = '/follow/get-follower';
		return axiosClient.get(url, { params });
	},
	getFollowUser: (params) => {
		const url = '/follow/get-follow-user';
		return axiosClient.get(url, { params });
	}
}
export default followApi;