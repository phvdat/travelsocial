import authApi from "api/authApi"
import followApi from "api/followApi"

export const getUsersInfoById = async (id) => {
	try {
		const param = { userId: id }
		const response = await authApi.getUserInfoApi(param)
		if (response.status_code === 9999) {
			return response.payload
		}
		if (response.status_code === -9999) {
			console.log('not found')
		}
	} catch (error) {
		console.log(error)
	}
}

export const getFollowUser = async (id, page) => {
	const params = {
		page: page,
		size: 10,
		userId: id
	}
	try {
		const response = await followApi.getFollowUser(params)
		if (response.status_code === 9999) {
			return response.payload
		}
		if (response.status_code === -9999) {
			console.log('fail')
		}
	} catch (error) {
		console.log(error)
	}
}

export const getFollower = async (id) => {
	const params = {
		userId: id,
		page: 1,
		size: 10
	}
	try {
		const response = await followApi.getFollower(params)
		if (response.status_code === 9999) {
			return response.payload

		}
		if (response.status_code === -9999) {
			console.log('fail')
		}
	} catch (error) {
		console.log(error)
	}
}