<template>
	<div class="swiper-container swiper1">
	      <div class="swiper-wrapper">
	        <div class="swiper-slide" v-for="(item, index) in bannerList">
	        	<a :href="item.url">
	        		<img class="banner" v-lazy="$store.state.baseUrl + item.path" alt="" />
	        	</a>
	        </div>
	      </div>
	      <div class="swiper-pagination pagination1"></div>
	 </div>
</template>

<script>
  export default {
    name: 'bannerSlider',
    data() {
        return {
          bannerList:[],
					domain:"",
        }
      },
      mounted() {
      this.init();
    },
    methods: {
       init(){
				var _this = this;
				_this.domain = _this.$store.state.domain;
				// _this.domain = 'http://baixiu.io/Admin/';
				if(_this.$store.state.bannerList.length){
					_this.bannerList = _this.$store.state.bannerList;
					_this.swiperFun();
				}else{
					 _this.$axios.get(_this.domain + 'company/carousel_image_info').then(function(res) {
						var tempData = res.data.data;
						_this.bannerList = tempData;
						_this.$store.commit('updateBannerList',tempData);
						_this.swiperFun();
          }).catch(function(error) {
            console.log(error);
         });
				}
			 },
			swiperFun(){
				var _this = this;
				_this.$nextTick(()=>{ 
					var swiperObj = new Swiper('.swiper1', {
						autoHeight: true,
						autoplay: {
							delay: 3500
						},
						pagination: {
							el: '.pagination1',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '"></span>';
							},
						},
					}); 
					var tempTimer = setInterval(()=>{
						var temHeight = $(".swiper-slide-active img[lazy=loaded]").height();
						if(temHeight){
							$(".swiper1 .swiper-wrapper").css({"height":temHeight+'px'});
							clearInterval(tempTimer);
						}
					
					},100);
				});
			}
    }
  }
</script>
