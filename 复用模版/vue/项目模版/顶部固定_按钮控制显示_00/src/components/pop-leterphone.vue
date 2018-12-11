<template>
	<div class='pop_leterphone'>
		<div class='phone_header'>
			1元话费任性兑
		</div>
		<div class='user_phone_box wh5rem'>
			<input type="text" placeholder='请输入充值的手机号码' class='user_phone'/>
		</div>
		<p class='wh5rem'>*请输入正确的手机号码</p>
		<div class='verifyCode_box wh5rem'>
			<input type="text" class='verifyCode_text' placeholder='请输入验证码'/>
			<img src="../../static/images/lottery.png" alt=""  class='verifyCode_img'/>
		</div>
		<div class='btn_phone'>
			确认充值
		</div>
		<div class='btn_off' @click='leterphone_off'></div>
	</div>
</template>

<script>
	export default{
		name:'pop_leterphone',
		data:function(){
			return{
				
			}
		},
		methods:{
			leterphone_off : function(){
				this.$emit('leterphone_off');
			}
		}
	}
</script>

<style scoped>
	.wh5rem{
		margin:0 auto;
		width:6.418918rem;
	}
	.pop_leterphone{
		position:relative;
		margin:0 auto;
		margin-top:3.189189rem;
		width:7.54054rem;
		height:8.648648rem;	
		background:white;
		border-radius: 0.27027rem;
		color:#bfbfbf;
	}
	.pop_leterphone input{
		padding:0;
		padding-left:0.486486rem;
		background:#eee;
		font-size:0.378378rem;
		border:none;
	}
	.phone_header{
		height:2.27027rem;
		background:url(../../static/images/pop_phone.png) top center no-repeat;
		background-size:100% auto;
		text-align: center;
		line-height:2.27027rem;
		font-size:0.648648rem;
		color:white;
	}
	.user_phone_box{
		margin-top:0.702702rem;
		margin-bottom:0.135135rem;
		background:#eee;
		border-radius: 0.27027rem;
		height:1.081081rem;
		line-height:1.081081rem;
	}
	.user_phone{
		width:5.945945rem;
	}
	.verifyCode_box{
		margin-top:0.405405rem;
	}
	.verifyCode_text{
		height:1.081081rem;
		width:2.7rem;
		border-radius: 0.27027rem;
	}
	.verifyCode_img{
		float:right;
		height:1.081081rem;
		width:2.702rem;
		background:#eee;
		border-radius: 0.27027rem;
	}
	.btn_phone{
		margin:0.675675rem auto 0;
		width:4.216216rem;
		line-height:1.135135rem;
		background:#fe5b40;
		color:white;
		font-size:0.486486rem;
		text-align:center;
		border-radius: 0.54054rem;
	}
	.btn_off{
		position:absolute;
		top:0.135135rem;
		right:0.135135rem;
		height:0.54054rem;
		width:0.54054rem;
		background:url(../../static/images/btn_off.png) top center no-repeat;
		background-size:100% auto;
	}
</style>