/*
 * @Author: YZQ
 * @Description: 正则文件
 * @Date: 2020-09-24 15:15:52
 * @LastEditors: YZQ
 * @LastEditTime: 2020-09-24 15:18:46
 */
var HandlerReg = function () {
	var resType = {
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
		name: /^[\u4e00-\u9fa5]{2,20}$/i, //姓名
		email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i, //邮箱
		money: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/i, //金钱
	}
	var repformatting = {
		// 银行卡号 每四位 一个空格
		SpaceBankCode: function (val) {
			return (val + "").replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
		},
		//银行卡号 显示四三位和后三位
		encryptBankCode: function (val) {
			return (val + "").replace(/^(.{4}).*(.{3})$/, "$1 **** **** *$2")
		},
		//手机号码 显示前三位和后三位
		phone: function (val) {
			return (val + "").replace(/^(.{3}).*(.{3})$/, "$1*****$2")
		},
		// 更改姓名显示，只显示最后一个
		userName: function (val) {
			var strArr = val.split(""),
				len = strArr.length - 1,
				i = 0;
			for (; i < len; i++) {
				strArr[i] = strArr[i].replace(strArr[i], "*");
			}
			return strArr.join("");
		},
		// 判断数值为0或者-0
		isNegZero: function (val) {
			val = Number(val);
			return (n === 0) && (1 / n === -Infinity);
		},
		// 判断NaN
		isNaN: function (val) {
			if (!Number.isNaN) {
				return val !== val;
			} else {
				return Number.isNaN(val);
			}
		},
		// 判断两个值是否绝对相等
		isEquality(val1, val2) {
			if (!Object.is) {
				switch (true) {
					case val1 === 0 && val2 === 0:
						return 1 / val1 == 1 / val2
					case val1 !== val2:
						return val2 !== val2;
					default:
						return val1 === val2;
				}
			} else {
				return Object.is(val1, val2)
			}
		}
	}
	//验证方法
	function isVerify(type, val) {
		return resType[type].test(val);
	}
	//替换方法
	function replaceType(type, val) {
		return repformatting[type](val);
	}
	//暴露方法对象
	return {
		isVerify: isVerify,
		replaceType: replaceType
	}
};