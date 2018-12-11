<template>
	<!--页面主体-->
  <div id="app">
  	<!--头部背景部分-->
  	<div class='main'>
  		<div class='center'>
  			<p>天天有惊喜</p>
  		</div>
  		<!--开抢红包-->
	  	<div class='btn' @click = 'pop_show'></div>
	  	<!--游戏说明-->
	  	<div class='rules'>
	  		<h3>怎样抢红包</h3>
	  		<div class='rule'>
	  			<p>1、点击抢红包按钮(或者手动复制红包口令)</p>
	  			<p>2、打开手机淘宝</p>
	  			<p>3、抽红包</p>
	  		</div>
	  		<!--游戏规则-->
	  		<h3>活动规则</h3>
	  		<div class='rules_info'>
	  			<p>1、单个红包面额最高1212元！红包总量超过1亿个</p>
	  			<p>2、活动时间：12月6日00：00——12月11日23：59，每天都可领红包</p>
	  			<p>3、1个订单最多可使用10个红包,1个双十二红包可拆分多次使用</p>
	  			<p>4、双12红包仅限在2017年12月12日00：00至2017年12月12日23：59期间使用,逾期未用作废</p>
	  			<p>5、双12红包在天猫和淘宝网都可使用</p>
	  			<p>6、红包数量及更多红包详情请登录"手机淘宝-我的淘宝-卡券包-红包"进行查看</p>
	  		</div>
	  	</div>
  	</div>
  	<!--弹出窗口-->
  	<div class='pop'  @touchmove.prevent v-if='pop' @click.self = 'pop_off'>
  		<div class='pop_HB'>
  			<div class='pop_pic'>
  				<p>淘宝现金红包大派送</p>
  				<p class='pop_text'>{{kl}}</p>
  				<span id='data' class='dpn'>{{kl}}</span>
  			</div>
  			<div class='pop_btn' :data-clipboard-text = 'kl' @click='starCopy' ref='mycopy'>点击复制</div>
  		</div>
  		<!--关闭弹窗icon-->
  		<div class='btn_off' @click.self = 'pop_off'></div>
  		<!--复制提示-->
  		<div class='suc' v-if='suc'>{{info}}</div>
  	</div>
  </div>
</template>

<script>
	/*
	 * 引入clipboard复制插件
	 */
import Clipboard from 'clipboard'
export default {
	//模块名
  name: 'app',
  //使用的数据
  data:function(){
  	return{
  		/*
  		 * 控制复制弹窗的显示隐藏变量
  		 */
  		pop:false,
  		/*
  		 * 控制复制提示显示隐藏变量
  		 */
  		suc:false,
  		/*
  		 * 需要复制的口令
  		 */
  		kl:'￥dQmD0RTd0ij￥',
  		/*
  		 * 复制描述
  		 */
  		info:'复制成功,请打开手机淘宝领取吧',
  	}
  },
  methods:{
  	/*
  	 * 点击关闭复制弹窗绑定事件
  	 * 点击关闭icon时，触发
  	 */
  	pop_off : function(){
  		this.pop = false;
  	},
  	/*
  	 * 复制弹窗绑定事件
  	 * 点击开抢红包时触发
  	 */
  	pop_show : function(){
  		this.pop = true;
  	},
  	ismobile : function(test){
	  	/*
	  	 * u获取用户设备信息
	  	 * app获取用户浏览器类型和版本信息
	  	 */
	  	var u = navigator.userAgent,app = navigator.appVersion;
	  	/*
	  	 * 判断用户是否是智能手机，或者是否属于以下牌子的手机
	  	 */
	    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
				/*
				 * 判断连接中是否有？mobile字符串（不确定，如果有的话就是iPad或其他设备）
				 */
				if(window.location.href.indexOf("?moblie")<0){
					/*
					 * 如果有，检测用户是什么设备，如果是iphone则返回0，否则返回1
					 */				
					 try{
			        if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
			        	return '0';
			        }else{
			        	return '1';
			        }
			    }catch(e){}
				}
				/*
				 * 如果用户设备是iPad,返回0，否者返回1
				 */
	    }else if(u.indexOf('iPad')>-1){
	    	return '0';
	    }else{
	    	return '1';
	    }
    },
    /*
     * 当点击packetShow的按钮时触发，进行复制
     */
    starCopy:function(){
    	/*
    	 * 调查用户设备方法，安坐手机返回1，苹果手机返回0
    	 */
    	let num = this.ismobile(1);
    	if(num == '0'){
    		if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    			this.CopyMain();
    		}
  	  }else if(!Chipboard.isSupported()){
	    	if(num == '1'){
	    		this.info = '复制失败,请手动复制';
	    		this.suc = true;
	    		setTimeout(()=>{
	    			this.suc = false;
	    		},1000);
	    	}
	    }
   	},
   	CopyMain : function(){
   		/*
   		 * document.querySelector(类似jq的选择器)；用于选择节点
   		 */
   		var copyDOM = document.querySelector("#data");
   		/*
   		 * document.createRange();
   		 * 创建一个Range对象
   		 * Range对象表示文档的连续范围区域，如用户在浏览器窗口中用鼠标拖动选中的区域。
   		 */
   		 var range = document.createRange();
   		 /*
   		  * 选中需要复制的节点信息
   		  */
   		 range.selectNode(copyDOM);
   		 /*
   		  * 浏览器获得当前选中的节点对象
   		  */
   		 window.getSelection().addRange(range);
   		 /*
   		  * document.execCommand("copy")
   		  * 将选中的文本复制到剪切板
   		  */
   		 var successful = document.execCommand('copy');
   		 /*
   		  * 判断document.execCommand是否存在，即浏览器是否支持
   		  */
   		 try{
   		 	/*
   		 	 * 如果document.execCommand存在赋予successful，不存在赋予unsuccessful
   		 	 */
   		 	var msg = successful ? 'successful':'unsuccessful';
   		 }catch(err){
   		 	/*
   		 	 * 复制出错后，显示复制失败窗口，让用户手动复制
   		 	 */
	 	   		this.info = '复制失败,请手动复制';
	    		this.suc = true;
	    		setTimeout(()=>{
	    			this.suc = false;
	    		},1000);
   		 }
   		 if(msg){
   		 	/*
   		 	 * 复制成功时，显示复制成功窗口
   		 	 */
   				this.info = '复制成功,请打开手机淘宝领取吧';
	    		this.suc = true;
	    		setTimeout(()=>{
	    			this.suc = false;
	    		},1000);
   		 }
   		 /*
   		  * IE通过document.selection.empty()清除内容
   		  * 其他浏览器通过window.getSelection.removeAllRanges()清除选中内容
   		  */
   		 window.getSelection().removeAllRanges(); 
   	},
   	getRef:function(){
   		let num = this.ismobile(1);
   		if(true){
   			const clipboard = new Clipboard('.pop_btn');
   			if(Clipboard.isSupported()){
   				clipboard.on('success',(e)=>{
					   		this.info = '复制成功,请打开手机淘宝领取吧';
				    		this.suc = true;
				    		setTimeout(()=>{
				    			this.suc = false;
				    		},1000);
   				});
   				clipboard.on('error',(e)=>{
				   			this.info = '复制失败,请手动复制';
				    		this.suc = true;
				    		setTimeout(()=>{
				    			this.suc = false;
				    		},1000);
   				});
   			};
   		}
   	}
 	},
  created:function(){
  	/*
  	 * 初始化clipboard复制插件
  	 */
		this.getRef();
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
h3{
	margin:0 auto 0.46875rem;
	width:3.90625rem;
	height:0.9375rem;
	text-align:center;
	font-size:0.432432rem;
	line-height:0.9375rem;
	background:#d92302;
}
.fl{
	float:left;
}
.fr{
	float:right;
}
#app{
	padding-bottom:0.46875rem;
	background: #e42400;
}
.main{
	padding-top:7rem;
	width:100%;
	background:url(../static/images/bg.jpg) top center no-repeat;
	background-size:100% auto;
}
#app .center{
	margin:0 auto 1.25rem;
	padding-top:2rem;
	width:7.5rem;
	height:2.125rem;
	line-height: 1.6875rem;	
	font-size: 0.81081rem;
	color: yellow;
	text-align:center;
	background:url(../static/images/center_bg.png) top center no-repeat;
	background-size:100% auto;
}
#app .btn{
	margin:0 auto 1.25rem;
	width:8.1875rem;
	height:1.3125rem;
	background:url(../static/images/btn.png) top center no-repeat;
	background-size:100% auto;
}
.rules{
	margin:0 auto;
	width:9.25rem;
	font-size:0.378378rem;
	color:white;
	line-height:0.756756rem;
}
.rules .rule,.rules_info{
	margin:0 auto 0.375rem;
	padding:0.405405rem 0.40625rem;
	background:#d92302;
}
.pop{
	padding-top:2.0625rem;
	position:fixed;
	top:0;
	right:0;
	bottom:0;
	left:0;
	background:rgba(0,0,0,0.6);
}
.pop .pop_HB{
	margin:0 auto;
	padding-top:5.78125rem;
	width:8.75rem;
	height:5.40625rem;
	background:url(../static/images/pop_HB_bg.png) top center no-repeat;
	background-size:100% auto;
}
.pop .pop_HB .pop_pic{
	margin:0 auto 0.71875rem;
	padding-top:0.375rem;
	width:6.34375rem;
	height:2.09375rem;
	font-size:0.5rem;
	color:white;
	text-align:center;
	background:url(../static/images/pop_pic.png) top center no-repeat;
	background-size:100% auto;
}
.pop .pop_HB .pop_pic .pop_text{
	margin-top:0.3125rem;
	font-size:0.46875rem;
}
.pop .pop_HB .pop_btn{
	margin:0 auto;
	width:3.90625rem;
	height:1.21875rem;
	font-size:0.5rem;
	color:#ff4d00;
	line-height:1.0625rem;
	text-align:center;
	background:url(../static/images/pop_btn.png) top center no-repeat;
	background-size:100% auto;
}
.btn_off{
	position:absolute;
	top:2.09375rem;
	right:1.1875rem;
	width:0.59375rem;
	height:0.59375rem;
	background:url(../static/images/btn_off.png) top center no-repeat;
	background-size:100% auto;
}
.dpn{
	display:none;
}
.suc{
	position:absolute;
	top:50%;
	left:1.3125rem;
	width:7.5rem;
	font-size:0.375rem;
	color:white;
	line-height:0.9375rem;
	text-align:center;
	background:rgba(0,0,0,0.6);
	border-radius:0.46875rem;
}
</style>
