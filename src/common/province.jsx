import { PROVINCE } from "constants/common"

const { default: axiosClient } = require("api/axiosClient")

async function getProvince() {
	const url = 'https://provinces.open-api.vn/api/p/'
	try {
		const response = await axiosClient.get(url)
		return response.map((item) => item.name)
	} catch (error) {
		return PROVINCE.map((item) => item.name)
	}
}

export const LIST_PROVINCE = getProvince()