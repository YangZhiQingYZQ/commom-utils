<template>
  <div id="app">
  	<!--顶部轮播图部分-->
		<swiper-list  :swiper_list = "swiper_list" :baseUrl = 'baseUrl' @games_href='games_href'></swiper-list>
		<!--玩过的游戏-->
		<div class='played' v-if = 'record_show'>
				<div class='played_box'>
					<h3 class='title fl'>玩过</h3>
					<ul class='played_list fl'>
						<li class='fl' v-for='itme in record_list' @click='games_href(itme.url,itme.id)'>
							<img :src="baseUrl+itme.icon" alt="" />
						</li>
					</ul>
				</div>
		</div>
		<!--推荐游戏的主体部分-->
		<div class='main'>
			<!--<div class="must">
				<h3 class="title">必玩爆款</h3>
				<ul class='must_list'>
					<li class="fl" v-for='itme in middle_list'  @click = 'games_href(itme.url,itme.id)'><img :src="baseUrl+itme.poster" alt="" /></li>
				</ul>
			</div>-->
			<!--娱乐充电站、热门游戏-->
			<div class='hot_game'>
				<!--<h3 class='tilte'>娱乐充电站</h3>-->
				<h4 class='hot_title'>热门游戏</h4>
				<ul class='hot_game_list'>
					<li v-for = 'itme in down_list'>
						<img :src="baseUrl+itme.icon" alt="" class='fl'/>
						<div class='hot_info fl'>
							<div class='hot_text fl'>
								<h3>{{itme.name}}</h3>
								<p>{{itme.desc}}</p>
							</div>
							<div class='fr games_btn'  @click ='games_href(itme.url,itme.id)'>打开</div>
							<div class='fl games_info'><span>{{itme._count}}</span>在玩</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
  </div>
</template>

<script>
/*
 * 引入轮播模块
 */
import swiperList from './components/swiper_list'
/*
 * 移入axios进行ajax请求模块
 */
import axios from 'axios'
/*
 * 引入链接模块
 */
import interfaces from '../static/js/interfaces.js'
/*
 * 引入微信模块
 */
import wx from 'weixin-js-sdk'
export default {
	//模块名
  name: 'app',
  //使用的数据
  data:function(){
  	return{
  		/*
  		 * banner轮播数组
  		 */
  		swiper_list:'',
  		/*
  		 * 必玩爆款数组，已废弃
  		 */
  		middle_list:'',
  		/*
  		 * 热门游戏数组
  		 */
  		down_list:'',
  		/*
  		 * 玩过游戏数组
  		 */
  		record_list:'',
  		/*
  		 * 玩过游戏模块控制变量
  		 */
  		record_show:false,
  		/*
  		 * 从链接中获取的mp参数值
  		 */
  		mp:'',
  		/*
  		 * 发送至后天的游戏id
  		 */
  		_id:'',
  		/*
  		 * 基本链接
  		 */
  		baseUrl:'',
  		/*
  		 * 玩过人数变量值
  		 */
  		count:''
  	}
  },
  methods:{
  	/*
  	 * 用于获取连接中的各个参数
  	 */
  	getParam : function(param){
  		/*
  		 * 创建一个正则对象，大小写敏感，返回一个正则规则
  		 */
  		var reg = new RegExp("(^|&)" + param + '=([^&]*)(&|$)','i');
  		/*
  		 * window.location.search:取出url？后面的参数
  		 * substr（下标，长度）：取出获得从下标开始，获取多少个值
  		 * match(正则对象)：从获取的数值匹配正则对象
  		 * 使用创建的正则对象reg进行取值
  		 */
  		var r = window.location.search.substr(1).match(reg);
  		/*
  		 * unescape():对通过escape()编码的字符串进行解码
  		 */
  		if(r != null) return unescape(r[2]);return '';
  	},
  	/*
  	 * 当点击banner轮播板块或玩过游戏的icon或游戏列表中的开始后游戏时触发
  	 * 获取游戏id，和游戏Url
  	 * 发送ajax至后台统计点击次数
  	 * 打开游戏链接
  	 */
  	games_href : function(_url,_id){
  		this._id = _id
  		this.playGame();
  		window.open(_url);
  	},
  	/*
  	 * 调用微信接口
  	 */
  	wxAjax : function(){
  		/*
  		 * 发送ajax请求，获取微信所需要的参数
  		 */
  		axios.get(interfaces.baseUrl+interfaces.queryJSAPITicket,{
  			params:{
  				'signatureUrl':window.location.href
  			}}).then((res)=>{
  				if(res.status>=200&&res.status<300){
  					var data = res.data.data;
  					wx.config({
  						debug: false,                               // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					        appId: data.appId,                          // 必填，公众号的唯一标识
					        timestamp: data.signatureDetail.timestamp,  // 必填，生成签名的时间戳
					        nonceStr: data.signatureDetail.noncestr,    // 必填，生成签名的随机串
					        signature: data.signatureDetail.signature,  // 必填，签名，见附录1
					        // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					        jsApiList: [
//					        'scanQRCode',
//									'onMenuShareTimeline',
//									'onMenuShareAppMessage',
//									'hideAllNonBaseMenuItem',
//									'hideMenuItems'
								]                         
  					});
  					return res.data
  				}
  				/*
  				 * 返回错误信息：Promis.reject错误才会调用的内容
  				 */
  				return Promise.reject(new Error(res.status));
  			});
  	},
  	/*
  	 * 获取游戏的各个数组信息
  	 */
  	getGames : function(){
  		axios.get(interfaces.baseUrl+interfaces.getGames,{
  			params:{
  				"mp":this.mp,
  			}}).then((res)=>{
  				console.log(res);
  				var data = res.data.data;
  				this.swiper_list = data.up;
  				this.middle_list = data.middle;
  				this.down_list = data.down;
  				for(var i = 0 ; i < this.down_list.length ; i++){
  					this.count = this.down_list[i].count;
  					this.down_list[i]._count = this._count;
  				}
  			});
  	},
  	/*
  	 * 后天统计游戏点击次数
  	 */
  	playGame : function(){
  		axios.get(interfaces.baseUrl+interfaces.playGames,{
  			params:{
  				'mp':this.mp,
  				'id':this._id
  			}}).then((res)=>{
  				console.log(res);
  			});
  	},
  	/*
  	 * 获取玩过数组信息
  	 */
  	getRecord : function(){
  		axios.get(interfaces.baseUrl+interfaces.getRecodr,{
  			params:{
  				"mp":this.mp
  			}}).then((res)=>{
  				var data = res.data.data;
  				this.record_list = data.record;
  				console.log(res);
  				if(this.record_list.length>0){
							this.record_show = true;
  				}
  			});
  	}
  },
  /*
   * 引入模块在此模块中实例化
   */
  components: {
   swiperList
  },
  computed:{
  	/*
  	 * 玩过游戏人数变量
  	 * 超过万时，修改显示数据
  	 */
  	_count(){
  		if(this.count>10000){
  			return (this.count/10000).toFixed(2)+'万';
  		}else{
  			return this.count;
  		}
  	}
  },
  /*
   * 获取链接参数值及其进行各种ajax请求
   */
  created:function(){
		this.mp = this.getParam('mp');
		this.baseUrl = interfaces.baseUrl;
		this.wxAjax();
		this.getGames();
		this.getRecord();		
  }
}
</script>

<style>
/*
 * 初始化配置
 */
html,body{
	height:100%;
}
html,body,div,h1,h2,h3,h4,h5,h6,p,ul{
	margin:0;
	padding:0;
}
li{
	list-style:none;
}
.fl{
	float:left;
}
.fr{
	float:right;
}
/*
 * 玩过的游戏
 */
.played{
	width:100%;
	height:1.486486rem;
	background:#f9f9ff;
	font-size:0.378378rem;
	color:#bdbdc9;
	line-height:1.486486rem;
}
.played .played_box{
	margin:0 auto;
	width:6.324324rem;
	height:100%;
}
.played .played_box .played_list{
	overflow:hidden;
	position:relative;
	top:0.243243rem;
	margin-left:0.378378rem;
}
.played .played_box .played_list li{
	margin-left:0.189189rem;
	height:1rem;
	width:1rem;
}
.played .played_box .played_list li img{
	width:100%;
	height:100%;
	/*background:red;*/
	border-radius: 0.1875rem;
}
/*
 * 主体内容
 */
.main{
	margin:0 auto;
	width:9.135135rem;
}
/*
 * 必玩爆款
 */
/*.main .must{
	width:100%;
	height:5.459459rem;
}
.main .must{
	font-size:0.432432rem;
	line-height:1.027027rem;
	color:#919195;
}
.main .must .must_list{
	width:100%;
	height:3.837837rem;
}
.main .must .must_list li{
	-webkit-tap-highlight-color:transparent;
	margin-left:0.135135rem;
	width:2.945945rem;
	height:100%;
}
.main .must .must_list li:nth-child(1){
	margin:0;
}
.main .must .must_list li img{
	width:100%;
	height:100%;
	border-radius:0.324324rem;
	box-shadow:0px 0px 0.135135rem rgba(0,0,0,0.5);
}*/
/*
 * 娱乐充电站，热门游戏
 */
.main .hot_game{
	width:100%;
	font-size:0.432432rem;
	color:#919195;
}
.main .hot_title{
	margin:0.351351rem 0 0.513513rem;
	font-size:0.783783rem;
	color:black;
}
.main .hot_game_list{
	width:100%;
}
.main .hot_game_list li{
	 /*-webkit-tap-highlight-color:transparent;*/
	padding-top:0.243243rem;
	height:1.837837rem;
}
.main .hot_game_list li img{
	width:1.459459rem;
	height:1.459459rem;
	border-radius:0.405405rem;
}
.main .hot_game_list .hot_info{
	margin-left:0.405405rem;
	height:1.702702rem;
	width:7.054054rem;
	border-bottom:0.027027rem solid #d4d5da;
}
.main .hot_game_list .hot_info h3{
	font-size:0.486486rem;
	line-height:0.972972rem;
	color:black;
}
.main .hot_game_list .hot_info p{
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
	width:4.864864rem;
	font-size:0.351351rem;
	color:#919195;
}
.main .hot_game_list .hot_info .games_btn{
	position:relative;
	top:0.135135rem;
	width:2.162162rem;
	text-decoration:none;
	text-align:center;
	font-size:0.405405rem;
	font-weight:bolder;
	color:#067aff;
	line-height:0.81081rem;
	background:#f1f1f8;
	border-radius:0.405405rem;	
}
.games_info{
	margin-top:0.297297rem;
	width:2.162162rem;
	text-align:center;
	font-size:0.297297rem;
}
.games_info span{
	color:red;
}
</style>
