<template>
	<ul class="list_info">
		<!--好礼列表itme-->
		<li class='activity' v-if='prize'>
			<div class='img_box'>
				<img src="../../static/images/telephone_1.png" alt="" class='itme_img'/>
			</div>
			<div class='text_info'>
				<h3 class='text_title'>1元话费任性兑</h3>
				<p>20积分</p>
			</div>
			<div class='btn' @click = 'leterphoneShow'>
				立即兑换
			</div>
		</li>
		<li class='activity' v-if='prize'>
			<div class='img_box'>
				<img src="../../static/images/more.png" alt="" class='itme_img'/>
			</div>
			<div class='text_info'>
				<h3 class='text_title1'>更多好礼，敬请期待</h3>
			</div>
		</li>
		<!--兑换记录itme-->
		<li class='without' v-if='record_list.length==0&&record'>暂时没有相关数据</li>	
		<li class='record' v-if='record' v-for='m in record_list'>
			<div class='img_box'>
				<img src="../../static/images/telephone_1.png" alt="" class='itme_img'/>
			</div>
			<div class='text_info'>
				<h3 class='text_title'>兑换成功</h3>
				<p>20积分成功兑换<span>"1元话费任性兑"</span></p>
				<p><span>2017-11-09 15:20</span> <span>13700000036</span></p>
			</div>
		</li>
	</ul>
</template>

<script>
	export default{
		name : 'list_info',
		props:{
			/*
			 * 兑换好礼列表控制变量
			 */
			prize:'',
			/*
			 * 兑换记录列表控制变量
			 */
			record:'',
			/*
			 * 兑换记录列表
			 */
			record_list:'',
			/*
			 * 兑换好礼列表
			 */
			prize_list:""
		},
		data : function(){
			return{
			}
		},
		methods:{
			/*
			 * 绑定在兑换好礼列表中的兑换话费事件
			 * 点击立即兑换时，弹出兑换话费弹出窗口
			 */
			leterphoneShow:function(){
				this.$emit('leterphoneShow');
			}
		}
	}
</script>

<style scoped>
.list_info{
	margin:0 auto;
	width:9.459459rem;
}	
.list_info .without{
	padding-top:0.405405rem;
	text-align: center;
	color:#b8babe;
	background:#f4f5f9;
}
.list_info li{
	margin-bottom:0.405405rem;
	padding:0.608108rem 0.405405rem;
	height:2.027027rem;
	background:white;
	border-radius:0.216216rem;
}
.itme_img{
	height:2.027027rem;
	width:2.027027rem;
}
.img_box{
	float:left;
	margin-right:0.27027rem;

}
.activity .text_info{
	margin-top:0.108108rem;
	float:left;
}
.activity .text_title{
	font-size:0.486486rem;
	line-height:1.135135rem;
}
.activity .btn{
	float:right;
	padding:0 0.432432rem;
	margin-top:0.594594rem;
	line-height:0.81081rem;
	color:white;
	background:#ff634a;
	border-radius:0.405405rem;
}
.record .text_info{
	float:left;
}
.record .text_title{
	font-size:0.486486rem;
	line-height:0.918918rem;
	margin-bottom:0.081081rem;
}
.text_title1{
	position:relative;
	top:-0.108108rem;
	font-size:0.486486rem;
	line-height:2.054054rem;
}
.record .text_info p{
	color:#bdbcbc;
	line-height:1.5;
}
</style>