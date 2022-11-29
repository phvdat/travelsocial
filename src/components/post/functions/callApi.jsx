import reactPostApi from "api/reactPostApi"

export const getListLike = async (params) => {
	try {
		const response = await reactPostApi.getListLikesApi(params)
		if (response.status_code === 9999) {
			return response.payload || []
		}
		if (response.status_code === -9999) {
			console.log(false)
		}
	} catch (error) {
		console.log(error)
	}
}
export const getAllRate = async (params) => {
	try {
		const response = await reactPostApi.loadRate(params)
		return response.payload || []
	} catch (error) {
		console.log(error)
	}
}
export const deteleCommentPost = async (params) => {
	try {
		const response = await reactPostApi.deleteComment(params)
		if (response.status_code === 9999) {
			console.log("delete comment succcess", response)
		}
		if (response.status_code === -9999) {
			console.log("delete comment fail", response)
		}
	} catch (error) {
		console.log(error)
	}
}
export const loadCommentPost = async (params) => {
	try {
		const response = await reactPostApi.loadComment(params)
		return response.payload
		// setListComment(response.payload)
	} catch (error) {
		console.log(error)
	}
}