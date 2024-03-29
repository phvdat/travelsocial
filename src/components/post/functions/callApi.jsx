import { message } from "antd"
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
export const loadCommentPost = async (params) => {
	try {
		const response = await reactPostApi.loadComment(params)
		return response.payload
	} catch (error) {
		console.log(error)
	}
}
export const createComment = async (params) => {
	try {
		const response = await reactPostApi.postComment(params)
		if (response.status_code === 9999) {
			message.success('Bình luận thành công!')
		}
		if (response.status_code === -9999) {
			message.warning('Tạo bình luận không thành công!')
		}
	} catch (error) {
		console.log(error)
	}
}

export const createRate = async (params) => {
	try {
		const response = await reactPostApi.postRate(params)
		if (response.status_code === 9999) {
			console.log('Đánh giá thành công!')
		}
		if (response.status_code === -9999) {
			console.log('Đánh giá không thành công!')
		}
	} catch (error) {
		console.log(error)
	}
}

export const updateRate = async (params) => {
	try {
		const response = await reactPostApi.updateRate(params)
		if (response.status_code === 9999) {
			console.log('Đánh giá thành công!')
		}
		if (response.status_code === -9999) {
			console.log('Đánh giá không thành công!')
		}
	} catch (error) {
		console.log(error)
	}
}