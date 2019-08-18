<template>
	<div class="swiper-container swiper3" style="text-align: center;">
		<div class="slider swiper-wrapper" >
			<template v-if="listFlag">
				<div class="item swiper-slide" v-for="(item, index) in companyVoteList">
					<ul>
						<li v-for="(obj, index) in item">
							<router-link :to="{ name: 'CompanyVote', params: { id: obj.id }}">
								<img v-lazy="$store.state.baseUrl + obj.img" alt="" />
								<p>{{obj.company_type }}</p>
							</router-link>
						</li>
					</ul>
				</div>
			</template>
			<template v-else>
				<div class="item swiper-slide">
					<ul>
						<li v-for="(item, index) in companyVoteList">
							<router-link :to="{ name: 'CompanyVote', params: { id: item.id }}">
								<img v-lazy="$store.state.baseUrl + item.img" alt="" />
								<p>{{item.company_type }}</p>
							</router-link>
						</li>
					</ul>
				</div>
			</template>
		</div>
		<div class="swiper-pagination pageStyle pagination3"></div>
	</div>
	<!-- =多了一个template的写法explain -->
</template>



<script>
	export default {
  		name: 'companyVoteType',
		data() {
	      return {
	        companyVoteList:[],
	        domain:"",
	        listFlag:true
	      }
	   },
	   mounted(){
  			var _this = this;
			_this.init();
		},
		methods: {
			init(){
				var _this = this;
				var stateVoteList = _this.$store.state.companyVoteList;
				_this.domain = _this.$store.state.domain;
				// _this.domain = 'http://baixiu.io/Admin/';
				if(stateVoteList.length){
					_this.companyVoteList = stateVoteList;
					if(stateVoteList.length > 10){
						_this.swiperFun();
						_this.listFlag = true;
					}else{
						_this.listFlag = false;
					}
				}else{
					_this.$axios.get(_this.domain+'company/company_type_list').then(function(res) {
						var tempData = res.data.data;
						
						if(tempData.length > 10){
							/*把数组重新排版, 改为二维数组,每十个为一个值*/
							for(var i=0,len=tempData.length;i<len;i+=10){
							_this.companyVoteList.push(tempData.slice(i,i+10));
							}
							_this.listFlag = true;
							_this.swiperFun();
						}else{
							_this.companyVoteList = tempData;
							_this.listFlag = false;
						}
					   _this.$store.commit('updateCompanyVoteListt',tempData);
					}).catch(function(error) {
						console.log(error);
					});
				}
				
				
			},
			swiperFun(){
				var _this = this;
				_this.$nextTick(()=>{ // 解释整个流程顺序
					var swiper = new Swiper('.swiper3', {
						loop: true,
						autoplay: {
						delay: 3500
					},
					pagination: {
						el: '.pagination3',
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
