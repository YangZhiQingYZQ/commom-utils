<template>
  <div id="app">
  	<!--头部-->
  	<div class='header'>
  		<!--用户头像-->
  		<div class='fl user_img'>
  			<!--<img src="../static/images/user_img.png" alt="" class='userImg'/>-->
  			<img :src="img_src" alt="" class='userImg'/>
  		</div>
  		<!--用户昵称和积分-->
  		<div class='fl user_info'>
  			<h3 class='user_name'>{{nickName}}</h3>
  			<p>积分<span>{{adPoints}}</span></p>
  		</div>
  		<!--积分签到跳转-->
  		<div class='fr btn_sign'>积分签到</div>
  	</div>
  	<!--功能条-->
  	<ul class='nav'>
  			<li class='fl ml0' @click='prizeList' :class='{activate:prize}'>兑换好礼</li>
  			<li class='fl' @click='recordList' :class='{activate:record}'>兑换记录</li>
  			<li class='fl' @click='rule_info' :class='{activate:rule}'>兑换规则</li>
  	</ul>
  	<!--显示的列表-->
  	<div class='list'>
  		 <rules v-if='rule'></rules>
   		 <list-info :prize = 'prize' :record='record'  @leterphoneShow="leterphoneShow" :prize_list = 'prize_list' :record_list ='record_list'></list-info>
  	</div>  
  	<!--弹出层-->
  	<div class='pop' v-if='pop'>
  		<pop-leterphone v-if='leterphone_show' @leterphone_off = 'leterphone_off'></pop-leterphone>
  	</div>
  	<!--用户提示-->
  	<div class='hint' v-if='hint'>亲爱的用户，您的积分不足</div>
  </div>
</template>

<script>
/*
 * 引入axios进行ajax请求插件
 */
import axios from 'axios'
/*
 * 引入兑换规则模块
 */
import Rules from './components/rules'
/*
 * 引入展示列表模块
 */
import ListInfo from './components/listInfo'
/*
 * 引入话费充值模块
 */
import popLeterphone from './components/pop-leterphone'
/*
 * 引入基本地址与ajax请求地址信息
 */
import _url from '../static/js/_url'
export default {
  name: 'app',
  data:function(){
  	return{
  		/*
  		 * 话费弹出层控制变量
  		 */
  		leterphone_show:false,
  		/*
  		 * 弹出层控制变量
  		 */
  		pop:false,
  		/*
  		 * 兑换好礼样式控制变量
  		 */
  		prize:true,
  		/*
  		 * 兑换记录样式控制变量
  		 */
  		record:false,
  		/*
  		 * 兑换规则样式控制变量
  		 */
  		rule:false,
  		/*
  		 * 用户提示控制变量
  		 */
  		hint:false,
  		/*
  		 * 显示的活动列表
  		 */
  		prize_list:[],
  		/*
  		 * 显示的兑换记录
  		 */
  		record_list:[],
  		/*
  		 * 拼接基本url
  		 */
  		baseUrl:_url.base+_url.imp,
  		/*
  		 * 用户头像图片的url地址
  		 */
  		img_src:'',
  		/*
  		 * 用户积分
  		 */
  		adPoints:0,
  		/*
  		 * 用户名
  		 */
  		nickName:'',
  		/*
  		 * 从链接获取的参数值
  		 */
  		mp:''
  	}
  },
  methods:{
  	/*
  	 * 从链接中获取参数值
  	 */
	 	getParam : function(param){
	        //创建一个正则对象，大小写敏感，返回一个正则规则
	        var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
	        //window.location.search：取出url？后的参数
	        //substr（下标，长度）:取出获得从下标开始，获取多少个值
	        //match（正则对象）：从获取的数值匹配正则对象
	        //使用创建的正则对象reg进行取值
	        var r = window.location.search.substr(1).match(reg);
	        //unescape():对通过 escape() 编码的字符串进行解码。
	        if (r != null) return unescape(r[2]); return '';
	 	},
	 	/*
	 	 * 兑换好礼绑定的点击事件
	 	 * 显示兑换好礼列表，隐藏其他列表
	 	 */
  	prizeList : function(){
  		this.prize = true;
  		this.record = false;
			this.rule = false;
  	},
  	/*
  	 * 兑换记录绑定的点击事件
  	 * 显示兑换记录列表，隐藏其他列表
  	 */
  	recordList : function(){
  		this.prize = false;
  		this.record = true;
  		this.rule = false;
  	},
  	/*
  	 * 兑换规则绑定的点击事件
  	 * 显示兑换规则，隐藏其他列表
  	 */
  	rule_info : function(){
  		this.prize = false;
  		this.record = false;
  		this.rule = true;
  	},
  	/*
  	 * 兑换话费活动点击事件
  	 */
  	leterphoneShow : function(){
  		if(this.adPoints>=20){
  			this.pop = true;
  			this.leterphone_show = true;
  		}else{
  			this.hint = true;
  			setTimeout(()=>{
  				this.hint = false;
  			},1000)
  		}  		
  	},
  	/*
  	 * 兑换话费弹出层隐藏事件
  	 * 点击隐藏按钮时，触发
  	 */
  	leterphone_off : function(){
  		this.pop = false;
  		this.leterphone_show = false;
  	},
  	/*
  	 * 获取用户信息
  	 */
  	gainData : function(){
  		axios.get(this.baseUrl+_url.queryUserInfo,{params:{
					"mp" : this.mp
			}}).then((res)=>{
  			var data  = res.data.data;
  			console.log(data);
  			this.img_src = data.headImgUrl;
  			this.nickName = data.nickName;
  			this.adPoints = data.adPoints;
  		})
  	}
  },
  created : function(){
  	/*
  	 * 获取链接参数中的mp值
  	 */
  	this.mp = this.getParam('mp');
  	/*
  	 * 获取用户信息
  	 */
  	this.gainData();
  },
  components: {
    Rules,ListInfo,popLeterphone
  }
}
</script>

<style>
	html,body{
		height:100%;
		width:100%;
	}
	html,body,div,h1,h2,h3,h4,h5,h6,p,ul{
		margin:0;
		padding:0;
	}
	li{
		list-style:none;
	}
	::-webkit-scrollbar {    
	width: 0px;
	}	
	::-webkit-scrollbar {
	display: none;
	}
	.fl{
		float:left;
	}
	.fr{
		float:right;
	}
/*
 * 页面主体
 */
#app {
	-webkit-overflow-scrolling: touch;
	position:absolute;
	top:0;
	right:0;
	bottom:0;
	left:0;
	overflow: auto;
	background:#f4f5f9;
}
/*
 * 页面头部
 */
.header{
	padding:0.7rem 0;
	width:100%;
	height:1.756756rem;
	background:url(../static/images/user_bg.png) top center no-repeat;
	background-size:100% auto;
	color:white;
}
.user_img{
	padding-left:0.689189rem;
	margin-right:0.27027rem;
	border-radius: 50%;
}
.userImg{
	height:1.729729rem;
	width:1.729729rem;
	border-radius: 50%;
}
.user_info{
	padding-top:0.081081rem;
}
.user_name{
	font-size:0.486486rem;
	line-height:1.027027rem;
}
.btn_sign{
	margin:0.459459rem 0.702702rem 0 0;
	padding:0 0.405405rem;
	line-height:0.756756rem;
	border:1px solid white;
	border-radius: 0.432432rem;
}
/*
 * 页面功能栏
 */
.nav{
	overflow: hidden;
	margin-bottom:0.405405rem;
}
.nav li{
	width:33%;
	height:1.216216rem;
	margin-left:0.5%;
	background:white;
	line-height:1.216216rem;
	text-align:center;
	font-size:0.378378rem;
}
.nav .ml0{
	margin-left:0;
}
.nav .activate{
	color:white;
	background:#ff634a;
}
.list{
	overflow: auto;
	position:absolute;
	top:4.864864rem;
	bottom:0;
	width:100%;
}
/*
 * 页面弹出层
 */
.pop{
	position:absolute;
	top:0;
	right:0;
	bottom:0;
	left:0;
	background:rgba(0,0,0,0.6);
	border:0.027027rem solid rgba(0,0,0,0.6);
}
.hint{
	margin: 0 auto;
	position:absolute;
	top:6.756756rem;
	left:20%;
	width:60%;
	color:white;
	line-height:40px;
	text-align:center;
	border-radius: 20px;
	background:rgba(0,0,0,0.6);
}
</style>
