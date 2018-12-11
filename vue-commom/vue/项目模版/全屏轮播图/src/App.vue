<template>
  <div id="app">
		<swiper :options = "Options">
			<swiper-slide>
				<img src="../static/images/img_0.png" alt="" />
			</swiper-slide>
			<swiper-slide>
				<img src="../static/images/img_1.png" alt="" />				
			</swiper-slide>
			<swiper-slide>
				<img src="../static/images/img_2.png" alt="" />
			</swiper-slide>
			<swiper-slide>
				<img src="../static/images/img_3.png" alt="" />
			</swiper-slide>
		</swiper>
		<div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { swiper , swiperSlide } from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css');
export default {
	//模块名
  name: 'app',
  //使用的数据
  data:function(){
  	return{
  		Options : {
				speed : 200,
				pagination: {
			    	el: '.swiper-pagination',
				  },
  		}
  	}
  },
  components : {
  	swiper,swiperSlide
  },
  methods:{
  }
}
</script>

<style>
html,body{
	height:100%;
	font-family: arial, verdana, 'Microsoft YaHei', Tahoma, Simsun, sans-serif;
}
html,body,div,h1,h2,h3,h4,h5,h6,p{
	margin:0;
	padding:0;
}
#app{
	height:100%;
	width:100%;

}
img{
	width:100%;
	height:100%;
}
.swiper-pagination{
	bottom:0.3125rem;
	left:50%;
	transform: translate(-50%);
	z-index:999;
}
.swiper-pagination-bullet{
	margin-left:0.3125rem;
}
.swiper-pagination-bullet:nth-child(1){
		margin:0;
	}
</style>
