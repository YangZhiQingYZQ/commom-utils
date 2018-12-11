 axios.get("http://www.adzhongdian.com/imp/commonController!queryJSAPITicket.action",{params:{
		'signatureUrl':window.location.href,
		"mp" : "qdsk"
	}}).then((res)=>{
		if(res.status>=200&&res.status<300){
		//返回数据，看数据结构
				var data = res.data.data;
				wx.config({
					debug : false,//开启调试模式，调用所有api的返回值会在alert出来，若要查看传入的参数，可以在PC端打开，参数信息会通过log打出，仅在pc端会打印
					appId : data.appId,//必填，公众号的唯一标识
					timestamp : data.signatureDetail.timestamp,//必填，生成签名的时间戳
					nonceStr : data.signatureDetail.noncestr,//必填，生成签名的随机串
					signature : data.signatureDetail.signature,//必填，签名，见附录1
					//必填，需要使用的JS接口列表，所有JS接口见附录2
					jsApiList : [
						"onMenuShareTimeline",
						"onMenuShareAppMessage"
					]
				})
		}
	}).then(()=>{
			wx.onMenuShareTimeline({
			    title: '贝壳街商品福利券', // 分享标题
			    link:  window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
			    imgUrl: 'http://dataoke.shenbianwang.net/activities/shellstreet/userguide/static/iamges/logo.png', // 分享图标
			    success: function () {
	
			    },
			    cancel: function () {
			        // 用户取消分享后执行的回调函数
			    }
			});
			wx.onMenuShareAppMessage({
			    title: '贝壳街商品福利券', // 分享标题
			    desc: '海量淘宝天猫品牌高额优惠券，全场商品免费领内部券还包邮哦，能省的绝不多花！来看看我是怎么做到的~', // 分享描述
			    link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
	      	imgUrl: 'http://dataoke.shenbianwang.net/activities/shellstreet/userguide/static/images/logo.png', // 分享图标
			    type: 'link', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () {
	
			    },
			    cancel: function () {
			        // 用户取消分享后执行的回调函数
			    }
			});
		})