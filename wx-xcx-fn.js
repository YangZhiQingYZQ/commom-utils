/**
 * 获取图片并返回图片路径
 *  num : {String | Number} 图片数量 max为9
 * 	sourceType ： {Array} 图片来源：album相册，camera相机
 * 	sizeType : {Array} 图片尺寸: original原图,compressed压缩图
 */
export const getUserImg = (num = 1, sourceType = ['album', 'camera'], sizeType = ['original', 'compressed']) => {
	return new Promise((res, ret) => {
		wx.chooseImage({
			count: num,
			sizeType: sizeType,
			sourceType: sourceType,
			success(res) {
				resolve(res.tempFilePaths);
			},
			fail() {
				return reject(false);
			}
		})
	})
}

/**
 *	上传文件
 * 	url {String} 上传地址
 *  path {String} 上传的资源路径
 * 	params {Object} 附带的信息
 * 	header {Object} 请求头
 */
export const postImg = (url, path, postName, params = {}, header = {}) => {
	return new Promise((res, ret) => {
		wx.uploadFile({
			url: url,
			filePath: path,
			formData: data,
			name: postName,
			header: header,
			success(res) {
				return res;
			},
			fail(res) {
				return res;
			}
		})
	})
}

/**
 *  微信showToast弹窗
 * 	title {String} 提示文字max为7
 * 	icon {String} success成功，loading加载，none不显示，且title可提示两行
 *  image {String} 图片必须为本地路径
 *  mask {Boolean} 是否添加蒙层
 *  success {function} 成功回调函数
 *  fail {function} 失败回调函数
 *  complete {function} 通用回调函数
 */
export const showToast = (title = "成功", icon = "success", duration = 1500, image = "", mask = false, success = () => {}, fail = () => {}, complete = () => {}) => {
	wx.showToast({
		title: title,
		icon: icon,
		iamge: iamge,
		duration: duration,
		mask: mask,
		success: success,
		fail: fail,
		complete: complete
	})
}

/**
 * 
 */
