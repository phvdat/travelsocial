import axiosClient from "./axiosClient";

const postApi = {
	createPost: (data) => {
		const url = "/post/create";
		return axiosClient.post(url, data);
	},
	updatePost: (data) => {
		const url = "/post/update";
		return axiosClient.post(url, data);
	},
	getAllPost: (data) => {
		const url = "/post/load-all";
		return axiosClient.post(url, data);
	},
	getAllPostRelated: (data) => {
		const url = "/post/load-related";
		return axiosClient.post(url, data);
	},
	getPostById: (param) => {
		const url = "/post/get";
		return axiosClient.post(url, param);
	},
	getAllPostByUserId: (data) => {
		const url = "/post/load-by-userId";
		return axiosClient.post(url, data);
	},
	deletePost: (params) => {
		const url = "/post/delete";
		return axiosClient.get(url, { params });
	},
	getTopPost: (params) => {
		const url = "rank/get-leader-board-post";
		return axiosClient.get(url, { params });
	},
}

export default postApi;