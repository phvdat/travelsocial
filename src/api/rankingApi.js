import axiosClient from "./axiosClient";
const rankingApi = {
	getListLeaderBoardUser: (params) => {
		const url = "/rank/get-leader-board-user";
		return axiosClient.get(url, { params });
	},
	getRankingByUserId: (payload) => {
		const url = "/rank/info-rank-user";
		return axiosClient.post(url, payload);
	}
}
export default rankingApi