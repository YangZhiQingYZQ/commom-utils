<template>
	<div class="pop" @touchmove.prevent>
		
	</div>
</template>

<script>
export default {
	name : 'pop',
	data : function(){
		return {
			
		}
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