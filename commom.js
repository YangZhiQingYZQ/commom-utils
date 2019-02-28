//各种正则验证方法
export const regs = {
	mobile: /^1[3456789]\d{9}$/, //手机号
	pwd: /[\d\w]{6,20}/, //密码
	code: /^\d{4}$/, //图片验证码&短信验证码均为4位数字
	name: /^[\u4e00-\u9fa5]{2,4}$/, //名字（汉字）
	msgCode: /^\d{6}$/, //手机验证码
	idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证
	email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, //邮箱
	bankNo: /^([1-9]{1})(\d{15}|\d{18})$/, //银行卡
	telPhone: /^\d{3,4}\-?\d{7,8}((\-?\d{6})|\d{0})$/, //住宅电话
	monthSalary: /^[1-9]\d*$/, //月收入;
	phoZone: /^\d{3,5}$/,
	phoneNo: /^\d{6,8}$/,
	phoExtend: /^\d{0,5}$/,
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
