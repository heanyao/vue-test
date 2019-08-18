<template>
	<transition name="fade" mode="out-in" >
		 <div :class="$store.state.indexClass">
			<div class="dialogMask"></div>
		 	<router-view></router-view>
		 	<div class="loading">
				 <div class="loadContent">
					<img src="./assets/img/loading.gif" alt="" />
					<p>正在加载,请稍后</p>
				 </div>
			</div>
		 </div>
	</transition>
</template>
<script>
    import './assets/css/base.css'
    import 'vue-croppa/dist/vue-croppa.css'
    export default {
    	name:"Index",
    	data(){
			return {
			accountId:null,
			domain:"",
			votes:"",
			clickItem:"",
			adminFlag:false
			}
		},
		
    	mounted() {
			this.init();
		},
	    methods:{
	    	init(){
	    		var _this = this;
				_this.domain = _this.$store.state.domain;
				// _this.domain = 'http://baixiu.io/Admin/';
			
	    		$(document).on("click",".redBtn,.voteBtn,.btnRed,.analysisBtn,.userinfoBtn",function(){
					var obj = $(this);
					var item = obj.data("number");
					var vote_type = obj.data("type");
					_this.accountId = _this.getCookie('token');
					// 这里的accountid要改为token
					if(!_this.accountId){
				        _this.$router.push('/login');
				   }else{
				   		if(!item){
				   			_this.$router.push('/UserInfo');
				   			return false;
				   		}
				   		_this.clickItem = obj;
				   		if(obj.hasClass("commentBtn")){
				   		   _this.$router.push({ name: 'Evaluate', params: { account_id: _this.accountId,customer_id:item, comment_type:vote_type}});
				   		}else{
				   			_this.votes = "";
				   			$(".usualMessage").empty().append('<div class="dropload-load"><span>正在投票请稍后</span></div>');
					    	_this.openDialog();
					      	_this.$axios.get(_this.domain+'analyst/vote/analyst_id/'+ item + '/token/'+ _this.accountId + '/vote_type/'+ vote_type).then(function(res) {
					      		var tempData = res.data;
					      		if(tempData.result == "0"){
					      			$(".usualMessage").empty().append('投票成功');
									  _this.votes = tempData.votes;
									if(obj.parents(".analysVoteList").length){
										_this.$store.commit('updateAnalystArray',[]);
									}					
					      		}else if(tempData.result == "1"){
					      			$(".usualMessage").empty().append('<span style="color:red;">今天已投</span>');
					      		}
					      		if(_this.votes ){
									_this.clickItem.parents(".votesParents").find(".votesNumber").empty().append(_this.votes);
								}
					      		_this.disapperPop();
					      		
							}).catch(function(error) {
								$(".usualMessage").empty().append('<span style="color:red;">投票失败</span>');
								_this.disapperPop();
								console.log(error);
							});
				   		}
				    	
				    }
				    return false;
				});
				
				$(document).on("click",".divDialog .dialogClose",function(){
					$(".text").removeClass("error");
					if(_this.votes ){
						_this.clickItem.parents(".votesParents").find(".votesNumber").empty().append(_this.votes);
					}
				    return false;
				});
				
				
	    	}
	    }
	   
	}
</script>
<style >
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to{
	  opacity: 0;
	}
	.frontContainer { max-width: 450px; margin: 0px auto; position: relative;}
	.loading {position: fixed;background: rgba(255, 255, 255, 0.7); top: 0; left: 0; width: 100%; height: 100%; z-index: 999;display: none;}
	.loading .loadContent { font-size: 14px; text-align: center; width: 150px; position: absolute; top: 50%; left: 50%; height: 56px; margin: -28px 0 0 -75px;color:#999;}
</style>