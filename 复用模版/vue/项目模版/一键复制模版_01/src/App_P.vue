<template>
  <div id="app">
		<div class='main'>
			<p>聚划算双11大牌半价、5折封顶。宝贝集合，提前加购超划算！复制这条信息，￥PCJA0h1T05T￥，打开【手机淘宝即可查看】</p>
			<div class='btn' :data-clipboard-text="tkl"  @click='starCopy' ref="mycopy"></div>
			<div v-if='suc' class='suc'>复制成功，打开手机淘宝领取吧</div>
			<div v-if='err1' class='err1'>复制失败，请手动复制</div>
		</div>
  </div>
</template>

<script>
	import Clipboard from 'clipboard'
export default {
  name: 'app',
	data:function(){
		return{
			//需要复制的淘口令
			tkl:"￥PCJA0h1T05T￥",
			//复制成功控制变量
			suc:false,
			//复制失败控制变量
			err1:false
		}		
	},
	methods:{
		/*
		 * 检测用户使用的是什么手机和运行系统
		 */
		ismobile : function(){
			/*
			 * 创建变量u来获取用户设备信息
			 * 创建变量app获取用户浏览器的类型和版本信息
			 */
			var u = navigator.userAgent,app = navigator.appVersion;
			/*
			 * 判断用户是否是智能手机，或者是否属于以下的牌子的手机
			 */
			if(/AppleWebKit.*Mobile/i.test(navigator.userAgent)||(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
				/*
				 * 判断连接中是否有？mobile字符串，（不确定，如果有的话那么就是iPad或其他设备）
				 */
				if(window.location.href.indexOf("?mobile")<0){
					/*
					 * 如果有，检测用户是什么设备，如果是iphone则返回0，否者返回1
					 */
						try{
							if(/iPhone|mac|iPod|iPad/i.text(navigator.userAgent)){
								return '0';
							}else{
								return '1';
							}
						}catch(e){}
				}
				/*
				 * 如果用户设备为iPad，返回0，否则返回1
				 */
			}else if(u.indexOf('iPad')>-1){
				return '0';
			}else{
				return '1';
			}
		},
		/*
		 * 当点击按钮时触发
		 */
		starCopy : function(){
			/*
			 * 调用查询用户设备方法，安卓手机返回1，苹果手机返回0
			 */
			let num = this.ismobile(1);
			if(num == '0'){
				if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
					this.CopyMain();
				}
			}else if(!Clipboard.isSupported()){
				if(num == '1'){
					this.err2();
				}
			}
		},
		CopyMain : function(){
			/*
			 * document.querSelector(类似jq的选择器)；用于选择节点
			 */
			var copyDOM = document.querySelector('#data');
			/*
			 * document.createRange();
			 * 创建一个Range对象
			 * Range 对象表示文档的连续范围区域，如用户在浏览器窗口中用鼠标拖动选中区域
			 */
			var range = document.createRange();
			/*
			 * 选中复制的节点信息
			 */
			range.selectNode(copyDOM);
			/*
			 * 浏览器获得当前选中的节点对象
			 */
			window.getSelection().addRange(range);
			/*
			 * document.execCommand('copy');
			 * 将选中的文本复制到剪切板
			 */
			try{
				/*
				 * 如果document.execCommand存在赋予successful，不存在赋予unsuccessful
				 */
				var msg = successful ? 'successful' : 'unsuccessful';
			}catch(err){
				/*
				 * 复制出错后，显示复制失败窗口，让用户手动复制
				 */
				this.err2();
			}
			if(msg){
				/*
				 * 当复制成功时，提示用户复制成功
				 */
				this.suc2();
			}
			/*
			 * IE中通过document.selection.empty()清除选中内容
			 * 其他浏览器通过window.getSelection.removeAllRanges()清除选中内容
			 */
			window.getSelection().removeAllRanges();
		},
		getRef : function(){
			let num = this.ismobile(1);
			if(true){
				const clipboard = new Clipboard('.btn');
				if(Clipboard.isSupported()){
					clipboard.on('success',(e)=>{
						/*
						 * 提示用户复制成功
						 */
						this.suc2();
					});
					clipboard.on('err',(e)=>{
						/*
						 * 提示用户复制失败
						 */
						this.err2();
					});
				}
			}
		},
		suc2:function(){
			this.suc = true;
			setTimeout(()=>{
				this.suc = false
			},1000)
		},
		err2 : function(){
			this.err1 = true;
			setTimeout(()=>{
				this.err1 = true;
			})
		}
	},
	created:function(){
		this.getRef();
	}
}
</script>

<style>
html,body{
	width:100%;
	height:100%;
}
html,body,div,p{
	margin:0;
	padding:0;
}
#app {
	position:fixed;
	top:0;
	right:0;
	bottom:0;
	left:0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background:url(../static/images/bg.png) top center no-repeat;
 	background-size:100% auto;
}
.main{
	position:relative;
	padding-top:6.378378rem;
	margin-left:2.216216rem;
	font-size:0.378378rem;
	color:white;
	line-height:2;
	/*background:red;*/
	width:6rem;
}
.btn{
	margin:0.54054rem auto 0;
	width:4.594594rem;
	height:1.135135rem;
	background:url(../static/images/btn.png) center center no-repeat;
	background-size:100% auto;
}
.suc{
	position: absolute;
	top:8.108108rem;
	right:0;
	left:0;
	text-align:center;
	height:1rem;
	color:white;
	line-height:1rem;
	background:rgba(0,0,0,0.6);
	border-radius: 0.3125rem;
}
.err1{
	position: absolute;
	top:8.108108rem;
	right:0;
	left:0;
	text-align:center;
	height:1rem;
	color:white;
	line-height:1rem;
	background:rgba(0,0,0,0.6);
	border-radius: 0.3125rem;
}
</style>
