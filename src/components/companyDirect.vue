<template>
<div class="section" v-if="recommend_company.length">
	<div class="sectionTit">
		企业直通
		<span class="titleLink">更多<img src="../assets/img/lo@2x.png" alt="" /></span>
	</div>
	<div class="sectionContent" style="padding:15px 0;" v-if="recommend_company.length">
		<table cellspacing="0" cellpadding="0" border="0">
			<tbody>
				<tr class="companyList" v-for="items in recommend_company">
					<td v-for="item in 3">
						<router-link :to="{ name: 'IntroduceCom', params: { id: items[item-1].id }}" v-if="items[item-1]">
							<img v-lazy="$store.state.baseUrl + items[item-1].company_logo "/>
							{{items[item-1].name}}
						</router-link>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>

<script>
	

	export default {
  		name: 'companyDirect',
  		data() {
			return {
				recommend_company:[]
			}
		},
  		mounted() {
			this.init();
		},
		methods: {
			init(){
				var _this = this;
				var tempRecomCompany = _this.$store.state.recommendCompany;
				_this.domain = _this.$store.state.domain;
				// _this.domain = 'http://baixiu.io/Admin/';

				if(tempRecomCompany.length){
					_this.recommend_company = tempRecomCompany;
				}else{
					_this.$axios.get(_this.domain+'company/recommend_company').then(function(res) {
						var tempData = res.data.data.data;
						
						for(var i=0,len=tempData.length;i<len;i+=3){
							_this.recommend_company.push(tempData.slice(i,i+3));
							
						}
						_this.$store.commit('updateRecommendCompany',_this.recommend_company);
					}).catch(function(error) {
						console.log(error);
					});
				}
			    
				
			    $(document).on("click",".titleLink", function(){
					$("html,body").animate({scrollTop: 0});
				});  
			},
		}
	}
</script>