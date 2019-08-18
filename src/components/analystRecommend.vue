<template>
<div class="section" v-if="analystArray.length">
	<div class="sectionTit">分析师推荐</div>
	<div class="sectionContent">
		<div class="slider swiper-container swiper2" style="padding:8px 0 7px 0;">
			<div class="item2 swiper-wrapper">
				<ul v-for="(items, index) in analystArray" class="analysisDisplay swiper-slide" style="padding:0px;">
					<li v-for="(item, index) in items">
						<div class="displayDiv votesParents analysVoteList">
							<router-link :to="{ name: 'AnalystInfo', params: { id: item.id }}">
								<img class="pic" v-lazy="$store.state.baseUrl + item.headimg"/>
							</router-link>
							<p class="name">{{ item.name }}</p>
							<span class="btn redBtn" :data-number="item.id" :data-type="2" href="#"><img class="btnIco" src="../assets/img/ghfoi@2x.png" alt="" />给TA投票</span>
							<div class="visitNumber clearfloat">
								<p class="l"><img class="ico" src="../assets/img/fens@2x.png" alt="" />{{ item.visits }}</p>
								<p class="r"><img class="ico" src="../assets/img/jii@2x.png" alt="" /><span class="votesNumber">{{ item.total_votes}}</span></p>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="swiper-pagination pageStyle pagination2" v-if="analystArray.length > 1"></div>
		</div>
	</div>
</div>
</template>

<script>
	export default {
  		name: 'analystRecommend',
		data() {
	      return {
	        analystArray: []
	      }
	   },
	   mounted(){
  			var _this = this;
			_this.init();
		},
		methods: {
			init(){
				var _this = this;
				var domain = _this.$store.state.domain;
				// var domain = 'http://baixiu.io/Admin/';
				var tempArray = _this.$store.state.analystArray;
				if(tempArray.length){
					_this.analystArray = tempArray;
					if(tempArray.length > 1){
						_this.swiperFun();
					}
				}else{
					_this.$axios.get(domain+'analyst/recommend_analyst').then(function(res) {
						var resData = res.data.data;
						if(resData.length){
							/*把数组重新排版, 改为二维数组,每三个为一个个值*/
							for(var i=0,len=resData.length;i<len;i+=3){
								_this.analystArray.push(resData.slice(i,i+3));
							}
							_this.$store.commit('updateAnalystArray',_this.analystArray);
							if(resData.length > 3){
								_this.swiperFun();
							}
						}	
					}).catch(function(error) {
						console.log(error);
					});
				}
			},
			swiperFun(){
				this.$nextTick(()=>{ 
				var swiper = new Swiper('.swiper2', {
					autoplay: {
					delay: 3500
				},
				pagination: {
					el: '.pagination2',
					clickable: true,
					renderBullet: function (index, className) {
					return '<span class="' + className + '"></span>';
					},
				},
				});
			});
			}
		}
	}
</script>