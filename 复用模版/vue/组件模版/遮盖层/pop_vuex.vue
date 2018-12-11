<template>
	<div class="pop" @touchmove.prevent>
		
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name : 'pop',
	data : function(){
		return {
			
		}
	},
	computed : {
		...mapGetters({
			popCommon : 'popCommon',
			textInfo : 'textInfo'
		})
	}
}
</script>

<style lang = 'scss' scoped>
.pop{
	position:absolute;
	top:0;
	right:0;
	bottom:0;
	left:0;
	background:rgba(0,0,0,0.6);
}
</style>