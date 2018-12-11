<template>
	<swiper :options = 'swiperOption' ref = 'mySwiper'>
		<swiper-slide v-for = 'itme in swiper_list'>
			<div @click="games_href(itme.url,itme.id)">
				<img :src="baseUrl+itme.banner" alt="" class='img_box'/>
			</div>			
		</swiper-slide>
		<div class="swiper-pagination" slot="pagination"></div>
	</swiper>
</template>

<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')
export default{
	name:'swiperList',
	props:{
		swiper_list:'',
		baseUrl:''
	},
	data(){
		return {
			swiperOption:{
			 	notNextTick: true, 
				pagination  : '.swiper-pagination',
				paginationType : "bullets",
				loop:true,
	  			speed:1500,
				autoplay:2000,
				autoplayDisableOnInteraction:false,
				uniqueNavElements :false
	  		},			
		}
	},
	components:{
		swiper,swiperSlide	
	},
	methods:{
		games_href : function(_url,_id){
			this.$emit('games_href',_url,_id)
		}
	},
	created:function(){
	}
}
</script>

<style>
	.img_box{
		width:100%;
		height:3.135135rem;
	}
	
</style>