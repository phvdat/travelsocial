import axiosClient from "./axiosClient";
const rankingApi = {
	getListLeaderBoardUser: (params) => {
		const url = "/rank/get-leader-board-user";
		return axiosClient.get(url, { params });
	},
	getRankingByUserId: (userId) => {
		const url = "/rank/get-leader-board-user";
		return axiosClient.post(url, {
			userId: userId,
			page: 1,
			size: 1
		});
	}
}
export default rankingApi