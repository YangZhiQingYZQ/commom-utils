import { beforeShare, userLogin, getShareRecord,postFormId } from "./url.js";
import { setStorage } from "./util.js";
export const postFormID = (formId,app)=>{//发送formId
  if (formId != "the formId is a mock one"){
    let params = {
      openId : app.openId,
      formId: formId
    }
    return postFormId(params);
  }
}; 
export const getShareObj = (//获取分享对象
  openId,//用户ID
  taoLiJinId, //淘礼金Id
)=>{
  let shareObj = {
    title : "开始分享",
    path: `/pages/shareStart/shareStart?openId=${openId}&taoLiJinId=${taoLiJinId}`
  }
  return shareObj;
}
export const login = (app,sid)=>{//获取登录信息
  let promise = new Promise((resolved,rejeck)=>{
    if(app.openId && !sid){
      resolved(app.openId);
    }else{
      wx.login({
        success(res) {
          let code = res.code,
            params = {
              code: code,
              sid: sid || "0"
            };
          userLogin(params).then(res => {
            let openId = res.data.data.session.openid;
            setStorage('openId', { openId: openId });
            app.openId = openId;
            resolved(openId);
          });
        }
      })
    }
  })
  return promise;
}
export class GoodsList{
  constructor(arr,share_arr){
    this.goods_list = arr.map(item=>{
      share_arr.forEach(i=>{
        if (item.id == i.goodsId){
          item.progress = Math.floor(i.count *100/ item.fissionNum);
          // item.share_id = i.id;
        }
      })
      return item;
    })
  }
}