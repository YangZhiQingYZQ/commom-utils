export default{		
		//基本地址
		base:"http://www.adzhongdian.com",
		//基本接口
		imp:"/imp",
		// 获取 调用微信接口 所需的接口参数
        "queryJSAPITicket" : "/commonController!queryJSAPITicket.action",
        //商品列表
        "getlist" : "/pointsShopController!getlist.action",
        //商品详情
        "getDetail" : "/pointsShopController!getDetail.action",
        //获取用户地址列表
        "getUserAddrList" :  "/userAddrController!getUserAddrList.action",
        //保存或修改用户信息(修改传id)
        "doSave" : "/userAddrController!doSave.action",
        //删除地址
        "doDelete" : "/userAddrController!doDelete.action",
        //用户确认兑换
        "pointsExchange" : "/pointsExchangeController!doSave.action",
        //获取用户头像信息
        "queryUserInfo" : "/usercenterController!queryUserInfo.action",
        //获取用户头像信息线上
        "initOpenId" : "/usercenterController!initOpenId.action",
        //用户兑换记录列表
        "getPointsExchangeList" :  "/pointsExchangeController!getPointsExchangeList.action",
        //用户订单详情
        "getPointsExchangeById" : "/pointsExchangeController!getPointsExchangeById.action",
        //获取签到数据
        "getSignIn" : "/userSigninController!getSignIn.action"

}