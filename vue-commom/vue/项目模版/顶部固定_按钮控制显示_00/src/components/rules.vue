<template>
  <div class="rules">
   <h2 class='rule_title'>积分兑换</h2>
   <p>1、积分可以兑换成礼品、折扣劵、抵现金，也可以参加抽奖活动。相关优惠产品会定期更新，每次兑换活动奖品数量有限，先兑先得，兑完为止</p>
   <p>2、兑换成功后将从会员账户中扣减相应积分分值。</p>
   <p>3、订单一旦生成若无礼品质量问题，不予办理礼品退换货</p>
   <p>4、由于积分兑换是为会员提供的回馈性质的服务，因此在积分商城兑换的礼品均不提供发票。</p>
  </div>
</template>

<script>
export default {
  name: 'rules',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rules{
	margin:0 auto;
	padding:0.135135rem 0.405405rem 0;
	width:8.648648rem;
	height:10.675675rem;
	background:white;
	border-radius: 0.324324rem;
}
.rule_title{
	font-size:0.486486rem;
	color:#ff634a;
	line-height:0.918918rem;
	text-align: center;
}
.rules p{
	font-size:0.378378rem;
	line-height:0.675675rem;
}
</style>
