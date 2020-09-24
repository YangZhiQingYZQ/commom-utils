import axios from 'axios';
import wx from 'weixin-js-sdk';
/**
 * 获取公众号授权及其开放的功能
 * url : {String} 请求的接口
 * params : {Objeck} 请求的的参数
 * list : {Array} 需要使用的功能
 */
export const wxAjax = (url, params, list) => {
	return axios.get(url, {
		params: params
	}).then((res) => {
		if(res.status >= 200 && res.status < 300) {
			let data = res.data;
			wx.config({
				debug: false, //开启调试模式，调用所有api的返回值会在alert出来，若要查看传入的参数，可以在PC端打开，参数信息会通过log打出，仅在pc端会打印
				appId: data.appId, //必填，公众号的唯一标识
				timestamp: data.timestamp, //必填，生成签名的时间戳
				nonceStr: data.noncestr, //必填，生成签名的随机串
				signature: data.signature, //必填，签名，见附录1
				jsApiList: list
			})
		}
	})
}

/**
 * 公众号分享功能
 * title {String} 分享的标题
 * imgUrl {String} 分享的图片链接
 * info {String} 分享的详情
 */
export const initShare = (title, imgUrl, info) => {
	wx.onMenuShareTimeline({
		title: title, // 分享标题
		link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
		imgUrl: imgUrl, // 分享图标
		success: function() {

		},
		cancel: function() {
			// 用户取消分享后执行的回调函数
		}
	});
	wx.onMenuShareAppMessage({
		title: title, // 分享标题
		desc: info, // 分享描述
		link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
		imgUrl: imgUrl, // 分享图标
		type: 'link', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function() {

		},
		cancel: function() {
			// 用户取消分享后执行的回调函数
		}
	});
}

/**
 * 判断用户手机系统
 */
export const isMobile = ()=>{
	let ua = window.navigator.userAgent.toLowerCase();
	switch(true){
		case ua.indexOf("iphone") > 0 || ua.indexOf("ipad") > 0 || ua.indexOf("ipod") > 0 :	
			return "iphone";
		case ua.indeOf("android") > 0 :
			return "android";
		default:
			return ""
	}
}