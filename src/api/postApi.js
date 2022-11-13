import axiosClient from "./axiosClient";

const postApi = {
	createPost: (data) => {
		const url = "/post/create";
		return axiosClient.post(url, data);
	},
	getAllPost: (data) => {
		const url = "/post/load-all";
		return axiosClient.post(url, data);
	},
	getAllPostByUserId: (data) => {
		const url = "/post/load-by-userId";
		return axiosClient.post(url, data);
	},
	deletePost: (params) => {
		const url = "/post/delete";
		return axiosClient.get(url, { params });
	}
}

export default postApi;