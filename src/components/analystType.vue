<template>
<div class="section" v-if="analystVoteList.length">
	<div class="sectionTit">分析师投票</div>
	<div class="sectionContent">
		<div class="sectionBlock">
			<ul class="clearfloat">
				<li v-bind:class="index%2==0?'l':'r'" class="voteBlock" v-for="(item, index) in analystVoteList">
					<router-link :to="{ name: 'AnalystVote', params: { id: item.id }}">
						<img v-lazy="$store.state.baseUrl + item.img" :title="item.analyst_type" />
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
	export default {
  		name: 'analystType',
		data() {
	      return {
	        analystVoteList:[]
	      }
	   },
	   mounted() {
			this.init();
		},
		methods: {
			init(){
				var _this = this;
				var domain = _this.$store.state.domain;
				// var domain = 'http://baixiu.io/Admin/';
				var tempList = _this.$store.state.analystVoteList;
				if(tempList.length){
					_this.analystVoteList = tempList;
				}else{
					_this.$axios.get(domain+'analyst/analyst_type_list').then(function(res) {
						var resData = res.data.data;
						_this.analystVoteList = resData;
						_this.$store.commit('updateAnalystVoteList',resData);
					}).catch(function(error) {
						console.log(error);
					});
				}
			}
		
		}
	}
</script>