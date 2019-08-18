<template>
	<div class="analystVote ">
		
		<headercontent v-bind:headerTitle = "type_name"></headercontent>
		<bannerSlider v-once></bannerSlider>
		<div class="section voteSection">
			<div class="sectionVote">
				<table class="voteListTime">
					<tbody>
						<tr>
							<td>
								<p class="color_666">报名/投票时间</p>
								<i class="ico"></i>
								<p class="color_999">{{ analystVoteInfo.votetime }}</p>	
							</td>
							<td>
								<p class="color_666">颁奖时间</p>
								<i class="ico"></i>
								<p class="color_999">{{ analystVoteInfo.prizetime }}</p>
							</td>
							<td>
								<p class="color_666">颁奖地点</p>
								<i class="ico"></i>
								<p class="color_999">{{ analystVoteInfo.prizeplace }}</p>	
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="sectionContent">
				<table class="voteResult">
					<tbody>
						<tr>
							<td>
								<p class="number">{{ analystVoteInfo.signupNumber }}</p>
								<p class="color_999">报名人数</p>	
							</td>
							<td style="border:1px solid #ddd;border-top:none;border-bottom: none;;">
								<p class="number">{{ analystVoteInfo.voteNumber }}</p>
								<p class="color_999">总投票总数</p>	
							</td>
							<td>
								<p class="number">{{ analystVoteInfo.visitNumber }}</p>
								<p class="color_999">总访问数</p>	
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="section">
			<div class="defaultShow">
				<form class="searchCompany clearfloat" action="#" method="get">
					<div class="searchInput l">
						<input class="text" type="text" v-model="analystNameSearch" name="companyName" placeholder="请输入编号与名字"/>
						<img src="../assets/img/it@2x.png" alt="" class="ico" />
					</div>
					<button class="r" type="button"  v-on:click="onsubmitBtn">搜 索</button>
				</form>
				<div v-show="analystVoteArrayFlag">
					<div class="analysisDisplay" v-if="analystVoteArray.length">
						<ul class="clearfloat">
							<li v-for="item in analystVoteArray">
								<div class="displayDiv votesParents">
									<router-link :to="{ name: 'AnalystInfo', params: { id: item.id }}">
										<img class="pic" v-lazy="$store.state.baseUrl + item.headimg" alt="" />
										<p class="name">{{ item.name }}</p>
									</router-link>
									<!-- 判断登陆与否的JS在哪 -->
									<span class="btn redBtn" :data-number="item.id" :data-type="2"><img class="btnIco" src="../assets/img/ghfoi@2x.png" alt="" />给TA投票</span>
									<span class="btn yellBtn"><span class="votesNumber">{{ item.total_votes}}</span>票</span>
									<span class="numberList">{{ item.id }}</span>
								</div>
							</li>
						</ul>
						<div class="dropload-down dropload1">
							<div class="dropload-load" v-if="analystVoteArray.length < analystVoteTotal"><span>正在为亲加载</span></div>
							<div class="dropload-noData" v-else>已全部加载完</div>
						</div>
					</div>
					<div v-else>
						<div class="commentTable noDataDiv" style="margin-top:0;">暂无数据 </div>
					</div>
				</div>
				<div v-show="searchFlag">
					<div class="analysisDisplay" v-if="searchDataArray.length">
						<ul class="clearfloat">
							<li v-for="item in searchDataArray">
								<div class="displayDiv votesParents">
									<router-link :to="{ name: 'AnalystInfo', params: { id: item.id }}">
										<img class="pic" v-lazy="$store.state.baseUrl + item.headimg" alt="" />
										<p class="name">{{ item.name }}</p>
									</router-link>
									<span class="btn redBtn" :data-number="item.id"><img class="btnIco" src="../assets/img/ghfoi@2x.png" alt="" />给TA投票</span>
									<span class="btn yellBtn"><span class="votesNumber">{{ item.votes}}</span>票</span>
									<span class="numberList">{{ item.id }}</span>
								</div>
							</li>
						</ul>
						<div class="dropload-down dropload2">
							<div class="dropload-load" v-if="searchDataArray.length < searchDataTotal"><span>正在为亲加载</span></div>
							<div class="dropload-noData" v-else>已全部加载完</div>
						</div>
					</div>
					<div v-else>
						<div class="commentTable noDataDiv" style="margin-top:0;">暂无数据 </div>
					</div>
				</div>
			</div>
		</div>
		<footercontent v-once></footercontent>
	</div>
</template>

<script>
	import headercontent from './header'
	import footercontent from './footer'
	import bannerSlider from './bannerSlider'
	export default {
  		name: 'AnalystVote',
  		components:{headercontent,footercontent,bannerSlider},
  		data(){
			return {
				analystVoteArray:[],
				analystVoteArrayFlag:true,
				analystVoteTotal:0,
				analystVoteNext:"",
				analystVoteInfo:{},
				analystNameSearch:"",
				nameSearchOld:"",
				type:"",
				domain:"",
				searchDataUrl:"",
				searchDataArray:[],
				searchDataTotal:1,
				searchFlag:false,
				scrollFlag:false,
				obj:"",
				type_name:""
			}
		},
		watch:{
	        scrollFlag(val, oldVal){
				console.log(oldVal);
	        	if(oldVal){
	        		if(this.searchFlag){
			     		this.getPageData(this.searchDataUrl,$(".dropload2").find(".dropload-down"),"searchVote");
			    	 }else{
		    		 	this.getPageData(this.analystVoteNext,this.obj,"analystVote");
					}
	        	}
	        },
	       
	   	},
  		mounted() {
			this.init();
		},
		methods: {
			init(){
				var _this = this;
				var tempSearch =  _this.$route.params.search;
				_this.type = _this.$route.params.id?_this.$route.params.id:1;
				_this.domain = _this.$store.state.domain;
				// _this.domain = 'http://baixiu.io/Admin/';
				_this.obj = $(".dropload1").find(".dropload-down");
				
				if(tempSearch != undefined){
					_this.analystNameSearch =  tempSearch;
					_this.nameSearchOld = tempSearch;
					_this.searchAxiosFun();
				}

				_this.$axios.get(_this.domain+'analyst/eventinfo/type/'+ _this.type).then(function(res) {
					_this.analystVoteInfo = res.data.data;
					console.log(_this.analystVoteInfo);
				}).catch(function(error) { 
					console.log(error);
				});
				
				_this.analystVoteNext = _this.domain+'analyst/analyst_list/type_id/'+ _this.type;
				_this.getPageData(_this.analystVoteNext,_this.obj,"analystVote");
					
			   $(window).scroll(function() { 
				    if(_this.scrollFlag && $(window).scrollTop() == $(document).height() - $(window).height()) {
				    	_this.scrollFlag = false;
				    }
				});
			},
			getPageData(url,obj,type){
				var _this = this;
				if(url != null){
					_this.$axios.get(url).then(function(res) {
						// console.log(res);
						var tempData = res.data.data;
						if(type == "searchVote"){
							if(_this.searchDataArray.length < tempData.total){
				  	  		_this.searchDataArray = _this.searchDataArray.concat(tempData.data);
					  	  	}else{
					  	  		_this.searchDataArray = tempData.data;
					  	  	}
						  	_this.searchDataUrl = tempData.next_page_url;
						  	
						}else if(type == "analystVote"){
							if(_this.analystVoteArray.length < tempData.total){
				  	  		_this.analystVoteArray = _this.analystVoteArray.concat(tempData.data);
					  	  	}else{
					  	  		_this.analystVoteArray = tempData.data;
					  	  	}
							if(_this.type_name == ""){
								_this.type_name = tempData.type_name;
							}
							if(_this.analystVoteTotal == 0){
								_this.analystVoteTotal = tempData.total;
							}
						  	_this.analystVoteNext = tempData.next_page_url;
						}
			
						_this.$nextTick(()=>{
							var timer4 = setTimeout(()=>{
								_this.scrollFlag = true;
								clearTimeout(timer4);
							},500);
						    
						});
					  	
					}).catch(function(error) {
						console.log(error);
					});
				
				}else{
					obj.empty().append('<div class="dropload-noData">已全部加载完</div>');
				
				}
			},
			onsubmitBtn(){
				var _this = this;
				var pat=new RegExp("[^a-zA-Z0-9\-\_\ \u4e00-\u9fa5]","i"); 
			    if(pat.test(_this.analystNameSearch)){
			    	$(".dialogContent .usualMessage").empty().append('<span style="color:red">请输入正确的公司名或人名.</span>');
			    	_this.openDialog();
			    	return false; 
			    }else{
			    	if(_this.nameSearchOld != _this.analystNameSearch){
			    		_this.refreshPage();
			    	}
	        	}
			},
			refreshPage(){
				var _this = this;
				_this.scrollFlag = true;
				if(_this.analystNameSearch == ""){
		     	 	_this.analystVoteArrayFlag = true; 
		     	 	_this.searchFlag = false; 
				    _this.searchDataArray = [];
		     	 }else{
		     	 	$(".dialogContent .usualMessage").empty().append('<div class="dropload-load"><span>正在为亲加载</span></div>');
		     	 	 _this.openDialog();
		     	 	 _this.searchAxiosFun();
		     	 }
		     	 _this.nameSearchOld = _this.analystNameSearch;

			},
			searchAxiosFun(){
				var _this = this;
				// 2指分析师的大分类,1是公司的大分类,type是分析师的小分类 
				_this.$axios.get(_this.domain+'analyst/search/type/2/type_id/' + _this.type + '/name/'+_this.analystNameSearch).then(function(res) {
					_this.searchDataArray = [];
					var tempData = res.data.data;
					var tempTimer = setTimeout(()=>{
						_this.searchDataUrl = tempData.next_page_url;
						_this.searchDataArray = tempData.data;
						_this.searchDataTotal = tempData.total;
						_this.disapperPop();
						clearTimeout(tempTimer);
					},500);
					_this.searchFlag = true; 
					_this.analystVoteArrayFlag = false;
					_this.scrollFlag = true;
					console.log(_this.scrollFlag);
				}).catch(function(error) {
					console.log(error);
					_this.disapperPop();
					_this.searchFlag = true; 
					_this.analystVoteArrayFlag = false; 
				});
			}
		}
	}
</script>
<style>
	.analysisDisplay {padding:0px 10px;}
	.analysisDisplay li {float: left; width: 32%;margin: 1% 2% 1% 0;}
	.analysisDisplay li:nth-child(3n+3) {margin-right:0px;}
	.analysisDisplay .pic {max-width: 70%; border-radius: 50%; height: 95px;}
	.displayDiv {background:#fff;border:1px solid #ddd;text-align:center;padding: 10px 0; position: relative;}
	.displayDiv .name { font-size: 1.2em;color:#333;height:16px;}
	.numberList { position: absolute; top: 5px; left: 5px; color: #f30401; font-size: 1.2em; border: 1px solid; border-radius: 50%; min-width: 20px; height: 20px; line-height: 20px;}
	.displayDiv .btn{color: #fff; width: 80%; display: block; margin: 5px auto 0px; height: 22px; line-height: 22px; position: relative; font-size: 1.2em; border-radius: 16px;box-sizing: border-box;}
	.displayDiv .redBtn{padding-left: 10px;background: #f50500;}
	.displayDiv .yellBtn{background: #ff8a00;}
	.displayDiv .btnIco {position: absolute; width: 15px; left: 4px; top: 3px;}
	.dropload-load span {background:url(../assets/img/loading.gif) no-repeat center right;padding-right:20px;background-size:contain;font-size:1.2em;}
</style>