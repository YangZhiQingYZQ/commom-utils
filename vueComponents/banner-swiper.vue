<template>
	<swiper :options='Options' @click = "getIdx">
		<swiper-slide v-for='(item,idx) in swiper_list' :key="item">
			<slot>
				<img :src="item" alt="" class='swiper-item' :data-idx = "idx"/>
			</slot>
		</swiper-slide>
	</swiper>
</template>
<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	require('swiper/dist/css/swiper.css');
	export default {
		name: 'banner-swiper',
		props: {
			swiper_list: {
				type: Array,
				default: () => {
					return []
				}
			},
			Options : {
				type : Object,
				require:true
			},
		},
		data(){
			return {
				times: null
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		methods:{
			getIdx(e){
				clearTimeout(this.times);
				this.times = setTimeout(()=>{
					return this.getSwiperIdx ? this.$emit(this.getSwiperIdx,e.target.getAttribute("data-idx")) : "";
				},100)
			}
		}
	}
</script>

<style lang='scss' scoped>
	.swiper-item {
		width: 100%;
		height: 100%;
	}
</style>