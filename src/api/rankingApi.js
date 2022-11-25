import axiosClient from "./axiosClient";
const rankingApi = {
	getListLeaderBoardUser: (params) => {
		const url = "/rank/get-leader-board-user";
		return axiosClient.get(url, { params });
	}
}
export default rankingApi