<template>
	<div class="companyVote">
		<headercontent v-bind:headerTitle = "type_name"></headercontent>
		<bannerSlider v-once></bannerSlider>
		<div class="section voteSection" v-if="companyVoteInfo">
			<div class="sectionVote">
				<table class="voteListTime"><tbody><tr>
					<td>
						<p class="color_666">报名/投票时间</p>
						<i class="ico"></i>
						<p class="color_999 ">{{ companyVoteInfo.votetime }}</p>	
					</td>
					<td>
						<p class="color_666">颁奖时间</p>
						<i class="ico"></i>
						<p class="color_999">{{ companyVoteInfo.prizetime }}</p>
					</td>
					<td>
						<p class="color_666">颁奖地点</p>
						<i class="ico"></i>
						<p class="color_999">{{ companyVoteInfo.prizeplace }}</p>	
					</td>
				</tr></tbody></table>
			</div>
			<div class="sectionContent">
				<table class="voteResult"><tbody><tr>
					<td>
						<p class="number">{{ companyVoteInfo.signupNumber }}</p>
						<p class="color_999">报名人数</p>	
					</td>
					<td style="border:1px solid #ddd;border-top:none;border-bottom: none;;">
						<p class="number">{{ companyVoteInfo.voteNumber }}</p>
						<p class="color_999">总投票总数</p>	
					</td>
					<td>
						<p class="number">{{ companyVoteInfo.visitNumber }}</p>
						<p class="color_999">总访问数</p>	
					</td>
				</tr></tbody></table>
			</div>
		</div>
		<div class="section">
			<div class="defaultShow">
				<div class="searchCompany clearfloat">
					<div class="searchInput l">
						<input class="text" type="text" v-model="companyNameSearch" name="companyName" placeholder="搜索公司"/>
						<img src="../assets/img/it@2x.png" alt="" class="ico" />
					</div>
					<button class="r" type="button"  v-on:click="onsubmitBtn">搜 索</button>
				</div>
				<div class="switchContent my-swiper-container" v-show="companyListArrayFlag">
					<div class="clearfloat" style="background: #fff;">
						<ul class="tabSwitch1 tabSwitch"></ul>
						<!--<ul class="tabSwitch r"><li><span v-on:click="moreController(true)"><img src="../assets/img/confont_@2x.png" alt="" /></span></li></ul>-->
					</div>
					<div class="tabcontent swiper-wrapper">
						<!--票数最多-->
						<div class="contentBlock swiper-slide">
							<template v-if="votesList.length">
								<div class="itemBlock" v-for="(item,index) in votesList">
									<div class="itemContent">
										<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>
											<td class="itemInfo">
												<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}" style="display: block;">
													<img class="companyIco" v-lazy="$store.state.baseUrl + item.company_logo" alt="" />
													<!-- <div class="stars"> -->
														<!-- 星星的逻辑 -->
														<!-- <img src="../assets/img/78k@2x.png" alt="" v-for="index in numberFormate(item.sum_stars,item.total_votes)" />
													</div> -->
													<p class="voteInfo">({{ item.evaluate }}条评价)</p>
												</router-link>
											</td>
											<td>
												<div class="itemDetail votesParents">
													<h3>
														<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}">
															<span>{{ item.name }}</span>
															<img v-if="item.is_authentication == 1" src="../assets/img/identification_yes.png" alt="" />
															<img v-else src="../assets/img/identification_no.png" alt="" />
														</router-link>
													</h3>
													<div class="clearfloat">
														<div class="message l">
															<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}" style="display: block;">
															<p class="info color_666">
																总获得票数 <span class="score votesNumber">{{ item.total_votes }}</span>
																企业好评率<span>{{ PercentageFormate(item.praise, item.evaluate) }}%</span>
															</p>
															<p class="info color_999">{{ item.visits }}人已浏览咨询</p>
															</router-link>
														</div>
															<!-- 投票的逻辑不清楚 -->
														<span class="btn r voteBtn" :data-number="item.id" :data-type="1">投票</span>
													</div>
												</div>
											</td>
										</tr></tbody></table>
									</div>
								</div>
								<div class="dropload-down"> 
									<!-- 加载的逻辑不清楚 -->
									<div class="dropload-load" v-if="votesList.length < votesTotal"><span>正在为亲加载</span></div>
									<div class="dropload-noData" v-else>已全部加载完</div>
								</div>
							</template>
							<template v-else>
								<div class="itemBlock">
									<div class="commentTable noDataDiv">暂无数据 </div>
								</div>
							</template>
						</div>
						
						<!--评论最多-->
						<div class="contentBlock swiper-slide">
							<template v-if="evaluateList.length">
								<div class="itemBlock" v-for="(item,index) in evaluateList">
									<div class="itemContent">
										<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>
											<td class="itemInfo">
												<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}" style="display: block;">
													<img class="companyIco" v-lazy="$store.state.baseUrl + item.company_logo" alt="" />
													<div class="stars">
														<img src="../assets/img/78k@2x.png" alt="" v-for="index in numberFormate(item.sum_stars,item.total_votes)" />
													</div>
													<p class="voteInfo">({{ item.evaluate }}条评价)</p>
												</router-link>
											</td>
											<td>
												<div class="itemDetail votesParents">
													<h3>
														<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}">
															<span>{{ item.name }}</span>
															<img v-if="item.is_authentication == 1" src="../assets/img/identification_yes.png" alt="" />
															<img v-else src="../assets/img/identification_no.png" alt="" />
														</router-link>
													</h3>
													<div class="clearfloat">
														<div class="message l">
															<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}" style="display: block;">
															<p class="info color_666">
																总获得票数 <span class="score votesNumber">{{ item.total_votes }}</span>
																企业好评率<span>{{ PercentageFormate(item.praise, item.evaluate) }}%</span>
															</p>
															<p class="info color_999">{{ item.visits }}人已浏览咨询</p>
															</router-link>
														</div>
														<span class="btn r voteBtn" :data-number="item.id" :data-type="1">投票</span>
													</div>
												</div>
											</td>
										</tr></tbody></table>
									</div>
								</div>
								<div class="dropload-down">
									<div class="dropload-load" v-if="evaluateList.length < evaluateTotal"><span>正在为亲加载</span></div>
									<div class="dropload-noData" v-else>已全部加载完</div>
								</div>
							</template>
							<template v-else>
								<div class="itemBlock">
									<div class="commentTable noDataDiv">暂无数据 </div>
								</div>
							</template>
						</div>
						
						<!--;最新加入-->
						<div class="contentBlock swiper-slide">
							<template v-if="newjoinList.length">
								<div class="itemBlock" v-for="(item,index) in newjoinList">
									<div class="itemContent">
										<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>
											<td class="itemInfo">
												<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}" style="display: block;">
													<img class="companyIco" v-lazy="$store.state.baseUrl + item.company_logo" alt="" />
													<div class="stars">
														<img src="../assets/img/78k@2x.png" alt="" v-for="index in numberFormate(item.sum_stars,item.total_votes)" />
													</div>
													<p class="voteInfo">({{ item.evaluate }}条评价)</p>
												</router-link>
											</td>
											<td>
												<div class="itemDetail votesParents">
													<h3>
														<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}">
															<span>{{ item.name }}</span>
															<img v-if="item.is_authentication == 1" src="../assets/img/identification_yes.png" alt="" />
															<img v-else src="../assets/img/identification_no.png" alt="" />
														</router-link>
													</h3>
													<div class="clearfloat">
														<div class="message l">
															<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}" style="display: block;">
															<p class="info color_666">
																总获得票数 <span class="score votesNumber">{{ item.total_votes }}</span>
																企业好评率<span>{{ PercentageFormate(item.praise, item.evaluate) }}%</span>
															</p>
															<p class="info color_999">{{ item.visits}}人已浏览咨询</p>
															</router-link>
														</div>
														<span class="btn r voteBtn" :data-number="item.id" :data-type="1">投票</span>
													</div>
												</div>
											</td>
										</tr></tbody></table>
									</div>
								</div>
								<div class="dropload-down">
									<div class="dropload-load" v-if="newjoinList.length < newjoinTotal"><span>正在为亲加载</span></div>
									<div class="dropload-noData" v-else>已全部加载完</div>
								</div>
							</template>
							<template v-else>
								<div class="itemBlock">
									<div class="commentTable noDataDiv">暂无数据 </div>
								</div>
							</template>
						</div>
						
						<!--已认证-->
						<div class="contentBlock swiper-slide">
							<template v-if="authenticationList.length">
								<div class="itemBlock" v-for="(item,index) in authenticationList">
									<div class="itemContent">
										<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>
											<td class="itemInfo">
												<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}" style="display: block;">
													<img class="companyIco" v-lazy="$store.state.baseUrl + item.company_logo" alt="" />
													<div class="stars">
														<img src="../assets/img/78k@2x.png" alt="" v-for="index in numberFormate(item.sum_stars,item.total_votes)" />
													</div>
													<p class="voteInfo">({{ item.evaluate }}条评价)</p>
												</router-link>
											</td>
											<td>
												<div class="itemDetail votesParents">
													<h3>
														<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}">
															<span>{{ item.name }}</span>
															<img v-if="item.is_authentication == 1" src="../assets/img/identification_yes.png" alt="" />
															<img v-else src="../assets/img/identification_no.png" alt="" />
														</router-link>
													</h3>
													<div class="clearfloat">
														<div class="message l">
															<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}" style="display: block;">
															<p class="info color_666">
																总获得票数 <span class="score votesNumber">{{ item.total_votes }}</span>
																企业好评率<span>{{ PercentageFormate(item.praise, item.evaluate) }}%</span>
															</p>
															<p class="info color_999">{{ item.visits }}人已浏览咨询</p>
															</router-link>
														</div>
														<span class="btn r voteBtn" :data-number="item.id" :data-type="1">投票</span>
													</div>
												</div>
											</td>
										</tr></tbody></table>
									</div>
								</div>
								<div class="dropload-down">
									<div class="dropload-load" v-if="authenticationList.length < authenticationTotal"><span>正在为亲加载</span></div>
									<div class="dropload-noData" v-else>已全部加载完</div>
								</div>
							</template>
							<template v-else>
								<div class="itemBlock">
									<div class="commentTable noDataDiv">暂无数据 </div>
								</div>
							</template>
						</div>
						<!--企业列表结束-->
					</div>
				</div>
				<div v-show="searchFlag">
					<div v-if="searchDataArray.length">
						<div class="itemBlock" v-for="(item,index) in searchDataArray">
							<div class="itemContent">
								<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>
									<td class="itemInfo">
										<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}" style="display: block;">
											<img class="companyIco" v-lazy="$store.state.baseUrl + item.company_logo" alt="" />
											<div class="stars">
												<img src="../assets/img/78k@2x.png" alt="" v-for="index in numberFormate(item.sum_stars,item.total_votes)" />
											</div>
											<p class="voteInfo">({{ item.evaluate }}条评价)</p>
										</router-link>
									</td>
									<td>
										<div class="itemDetail votesParents">
											<h3>
												<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}">
													<span>{{ item.name }}</span>
													<img v-if="item.is_authentication == 1" src="../assets/img/identification_yes.png" alt="" />
													<img v-else src="../assets/img/identification_no.png" alt="" />
												</router-link>
											</h3>
											<div class="clearfloat">
												<div class="message l">
													<router-link :to="{ name: 'IntroduceCom', params: { id: item.id }}" style="display: block;">
													<p class="info color_666">
														总获得票数 <span class="score votesNumber">{{ item.total_votes }}</span>
														企业好评率<span>{{ PercentageFormate(item.praise, item.evaluate) }}%</span>
													</p>
													<p class="info color_999">{{ item.visits }}人已浏览咨询</p>
													</router-link>
												</div>
												<span class="btn r voteBtn" :data-number="item.id" :data-type="1">投票</span>
											</div>
										</div>
									</td>
								</tr></tbody></table>
							</div>
						</div>
						<div class="dropload-down dropload2 ">
							<div class="dropload-load" v-if="searchDataArray.length < searchTotal"><span>正在为亲加载</span></div>
							<div class="dropload-noData" v-else>已全部加载完</div>
						</div>
					</div>
					<div v-else>
						<div class="itemBlock">
							<div class="commentTable noDataDiv">暂无数据 </div>
						</div>
					</div>
				</div>
				
			</div>
			<!--<div class="moreSelect" style="display: none;">
				<h3>搜索公司</h3>
				<div class="switchContent">
					<ul class="tabSwitch clearfloat" style="background:#fff;">
						<li class="l" style="padding-left:10px;"><span>筛选</span></li>
						<li class="r"><span v-on:click="moreController(false)"><img src="../assets/img/confon@2x.png" alt="" /></span></li>
					</ul>
					<div class="tabcontent">
						<div class="itemBlock moreContent">
							<h4 class="smallTitle">类别</h4>
							<ul class="companyTypeList clearfloat">
								<template v-for="(item, index) in companyType">
								<li v-bind:class="{active: item == companyTypeValue}">
									<label><input name="companyType" type="radio" v-model="companyTypeValue" v-bind:value="item"/>{{ item }}</label>
								</li>
								</template>
							</ul>
							<h4 class="smallTitle">热门公司</h4>
							<ul class="companyTypeList clearfloat">
								<template v-for="(item, index) in companyNameList">
								<li v-bind:class="{active: item == companyNameValue}">
									<label><input name="companyName" type="radio" v-model="companyNameValue" v-bind:value="item"/>{{ item }}</label>
								</li>
								</template>
							</ul>
						</div>
					</div>
				</div>
			</div>	-->
		
		</div>
		<router-link :to="{ name: 'WinPrize'}" class="signUpBtn clearfloat">我要报名</router-link>
		<footercontent v-once></footercontent>
	</div>
</template>
<script>
	import headercontent from './header'
	import footercontent from './footer'
	import bannerSlider from './bannerSlider'
	var companyType = [
		"外汇经纪",
		"软件提供",
		"支付平台",
		"资产管理平台",
		"贵金属",
		"解决方案",
		"区块链",
		"培训机构"
	];
	var companyNameList = [
		"富家天使基金会",
		"康华区块链"
	];
	export default {
  		name: 'CompanyVote',
  		components:{headercontent,footercontent,bannerSlider},
  		data() {
			return {
				companyVoteInfo:{},
				votesList:[],
				evaluateList:[],
				newjoinList:[],
				authenticationList:[],
				votesTotal:"",
				evaluateTotal:"",
				newjoinTotal:"[]",
				authenticationTotal:"",
				votesNext:"",
				evaluatNext:"",
				newjoinNext:"",
				authenticationNext:"",
				companyListArrayFlag:false,
				companyType:companyType,
				companyTypeValue:"",
				companyNameList:companyNameList,
				companyNameValue:"",
				companyNameSearch:"",
				searchFlag:false,
				searchDataUrl:"",
				searchDataArray:[],
				searchTotal:0,
				domain:"",
				swiperVote:"",
				scrollFlag:true,
				typeId:"",
				type_name:"",
				searchChange:"",
			}
		},
		watch:{
	        companyTypeValue(val, oldVal){
	        	 this.dataChange();
	        },
	        companyNameValue(val, oldVal){
	        	this.dataChange();
	        }
	   },
  		mounted() {
			this.init();
		},
		methods:{
			init(){
				var _this = this;
				var tempSearch =  _this.$route.params.search;
				_this.domain = _this.$store.state.domain;
				// _this.domain = 'http://baixiu.io/Admin/';
				_this.typeId = _this.$route.params.id;

				_this.$axios.get(_this.domain + 'company/eventinfo/type/'+_this.typeId).then(function(res) {
					_this.companyVoteInfo = res.data.data; // 获取时间地点等数据
					_this.type_name = res.data.data.type_name;//获取外汇经纪title的分类名
				}).catch(function(error) {
					console.log(error);
				});

				_this.companyListArrayFlag = true;
				_this.companySearchFormSubmit();

				if(tempSearch != undefined){
					_this.companyNameSearch =  tempSearch;
					_this.searchChange = tempSearch;//searchChange不知何用
					_this.searchAxiosFun();
				}

				$(window).scroll(function() {  
				    if(_this.scrollFlag && $(window).scrollTop() == $(document).height() - $(window).height()) {  
				       if(_this.swiperVote != ""){
				       		_this.swiperVote.update();
				       		var item = $(".swiper-slide-active").find(".dropload-down");
				       		switch(_this.swiperVote.activeIndex){
								case 0: _this.getPageData(_this.votesNext,item,0);break;
								case 1: _this.getPageData(_this.evaluatNext,item,1);break;
								case 2: _this.getPageData(_this.newjoinNext,item,2);break;
								case 3: _this.getPageData(_this.authenticationNext,item,3);break;
								default: ;
							}
				       		
				       }else if(_this.searchChange != ""){
				       		_this.getPageData(_this.searchDataUrl,$(".dropload2"),4);
				       }
				    }
				    
				});
			},
			getPageData(url,obj,index){
				var _this = this;
				_this.scrollFlag = false;
				if(url != null){
					_this.$axios.get(url).then(function(res) {
						var tempData = res.data.data;
						switch (index) {
						  case 0:
						  	  if(_this.votesList.length < tempData.total){
						  	  	_this.votesList = _this.votesList.concat(tempData.data);
						  	  }
							  _this.votesNext = tempData.next_page_url;
						  break;
						  case 1:
						  	  if(_this.evaluateList.length < tempData.total){
						  	  	_this.evaluateList = _this.evaluateList.concat(tempData.data);
						  	  }
						  	  _this.evaluatNext = tempData.next_page_url;
						  break;
						  case 2:
						  	  if(_this.newjoinList.length < tempData.total){
						  	  	_this.newjoinList = _this.newjoinList.concat(tempData.data);
						  	  }
						      _this.newjoinNext = tempData.next_page_url;
						  break;
						  case 3:
						  	  if(_this.authenticationList.length < tempData.total){
						  	  	_this.authenticationList = _this.authenticationList.concat(tempData.data);
						  	  }
						  	  _this.authenticationNext = tempData.next_page_url;
						  break;
						  case 4:
						  	 if(_this.searchDataArray.length < tempData.total){
						  	  	_this.searchDataArray = _this.searchDataArray.concat(tempData.data);
						  	 }
						  	  _this.searchDataUrl = tempData.next_page_url;
						  break;
						  default: ;
						}
						_this.$nextTick(()=>{
							if(_this.swiperVote){
								_this.swiperVote.update();
							}
					  	});
					  	_this.scrollFlag = true;
					}).catch(function(error) {
						console.log(error);
						_this.scrollFlag = true;
					});
					
				}else{
					obj.empty().append('<div class="dropload-noData">已全部加载完</div>');
				}
			},
			companySearchFormSubmit(){
				var _this = this;
				_this.$axios.all([
				    _this.$axios.get(_this.domain + 'company/company_list/type_id/'+_this.typeId+'/votes/1'),
				    _this.$axios.get(_this.domain + 'company/company_list/type_id/'+_this.typeId+'/evaluate/1'),
				    _this.$axios.get(_this.domain + 'company/company_list/type_id/'+_this.typeId+'/new_join/1'),
				    _this.$axios.get(_this.domain + 'company/company_list/type_id/'+_this.typeId+'/praise/1')
				]).then(_this.$axios.spread(function (votesRes, evaluateRes,newJoinRes,praiseRes) {
					
					var tempVotes = votesRes.data.data;
					var tempEvaluate = evaluateRes.data.data;
					var tempNewJoinRes = newJoinRes.data.data;
					var tempPraiseRes = praiseRes.data.data;
					// console.log(tempVotes);
					_this.votesList = tempVotes.data;
					_this.evaluateList = tempEvaluate.data;
					_this.newjoinList = tempNewJoinRes.data;
					_this.authenticationList = tempPraiseRes.data;
				
					_this.votesTotal = tempVotes.total;
					_this.evaluateTotal = tempEvaluate.total;
					_this.newjoinTotal = tempNewJoinRes.total;
					_this.authenticationTotal = tempPraiseRes.total;
					
					_this.votesNext = tempVotes.next_page_url;
					_this.evaluatNext = tempEvaluate.next_page_url;
					_this.newjoinNext = tempNewJoinRes.next_page_url;
					_this.authenticationNext = tempPraiseRes.next_page_url;
					
					_this.useCompanySwiper();
				})).catch(function(error) {
					console.log(error);
					_this.useCompanySwiper();
				});
				
			},
			useCompanySwiper(){
				var _this = this;//companyListArrayFlag在文中的作用
				_this.$nextTick(()=>{ 
					if(_this.companyListArrayFlag){
						_this.companyListSwiper();
					}
				});
			},
			companyListSwiper(){
			    var _this = this;
			    $(".tabSwitch1").empty();
				_this.swiperVote = new Swiper('.my-swiper-container', {
					autoHeight: true,
			      	pagination: {
				        el: '.tabSwitch1',
				        clickable: true,
				        bulletClass : 'l',
				        bulletActiveClass: 'active',
				        renderBullet: function (index, className) {
				          switch (index) {
							  case 0: name='票数最多';break;
							  case 1: name='评论最多';break;
							  case 2: name='最新加入';break;
							  case 3: name='好评数量';break;
							  default: name='';
							}
					      return '<li class="' + className + '"><span>' + name + '</span></li>';
					  }
			        },
				    on: {
					    slideChangeTransitionEnd: function(){
							_this.scrollFlag = true;
					    }
					}
			    });
			    
			},
			onsubmitBtn(){
				var _this = this;
				var pat=new RegExp("[^a-zA-Z0-9\-\_\ \u4e00-\u9fa5]","i");  //explain 
			    if(pat.test(_this.companyNameSearch)){
			    	$(".dialogContent .usualMessage").empty().append('<span style="color:red">请输入正确的公司名.</span>');
			    	_this.openDialog();
			    	return false; 
			    }else{
			    	if(_this.companyNameSearch != _this.searchChange){
			    		_this.dataChange();
			    	}
			    	
	        	}
			},
			dataChange(){
				var _this = this;
	        	_this.moreController(false);
	        	$(".dialogContent .usualMessage").empty().append('<div class="dropload-load"><span>正在为亲加载</span></div>');
	        	_this.openDialog();
	        	_this.searchChange = _this.companyNameSearch;
	        	if(_this.companyNameSearch != ""){
					_this.searchAxiosFun();
	        	}else{
	        		 _this.disapperPop();
	        		 _this.searchDataArray = [];
	        		 _this.companyListArrayFlag = true;
					 _this.searchFlag = false;
					  console.log(_this.swiperVote);
					  if(_this.swiperVote == ""){
						  _this.useCompanySwiper();
					  }
	        	}
			},
			searchAxiosFun(){
				var _this = this;
				_this.$axios.get(_this.domain + 'analyst/search/type/1/type_id/'+_this.typeId+'/name/'+ _this.searchChange).then(function(res) {
					_this.searchDataArray = [];
					var tempData = res.data.data;
					var tempTimer = setTimeout(()=>{
						_this.searchDataUrl = tempData.next_page_url;
						_this.searchDataArray = tempData.data;
						_this.searchTotal = tempData.total;
						clearTimeout(tempTimer);
					},500);
					_this.companyListArrayFlag = false;
					_this.searchFlag = true;
					_this.disapperPop();
				}).catch(function(error) {
					console.log(error);
					_this.companyListArrayFlag = false;
					_this.searchFlag = true;
					_this.disapperPop();
				});
				_this.companyNameSearch = _this.searchChange;
			},
			numberFormate(sum_stars, votes){
				if(votes && sum_stars){
					var result = Math.round(sum_stars/votes);
					return result>5?5:result;
				}else{
					return 0;
				}
			},
			PercentageFormate(praise, evaluate){
				if(praise && evaluate){
					return 100*((praise/evaluate).toFixed(2));
				}else{
					return 0;
				}
			},
			moreController(flag){
				if(flag){
					$(".defaultShow").hide();
					$(".moreSelect").show();
				}else{
					$(".defaultShow").show();
					$(".moreSelect").hide();
				}
				return false;
			}
		}
	}
</script>

<style>
	.sectionVote {background:#fff;padding:10px 15px;}
	.voteListTime {background:url(../assets/img/lineico.png) no-repeat center;}
	.voteListTime .color_999 {min-height:16px;}
	.color_666 {color:#666;}
	.color_999 {color:#999;}
	.voteSection .sectionContent {margin:10px 0px;padding:15px 0px;}
	.voteSection tr td {text-align: center;font-size: 1.2em;}
	.voteResult .number {font-size: 1.7em; color: #f50500; line-height: 15px; margin-bottom: 5px;}
	.voteResult p {margin:0px;}
	.voteListTime .ico {display: inline-block;width:10px;height:10px;border:1px solid #ddd;border-radius:50%;background: #fff;margin-top:5px;}
	.searchCompany {padding: 0 10px 10px;}
	.searchInput {position:relative;width: 80%;}
	.searchCompany .text {text-indent: 20px;}
	.searchInput .ico {position: absolute; left: 10px; top: 8px; width: 16px;}
	.searchCompany button{height: 33px; background: red; color: #fff; border: none; border-radius: 5px; width: 17%;}
	.tabSwitch {padding:0 10px 0 0px}
	.tabSwitch li {font-size:1.2em;border-bottom: 1px solid #fff;color: #999;cursor: pointer;}
	.tabSwitch1 li {margin: 0px 10px;}
	.tabSwitch li.active {border-color:red;}
	.tabSwitch li span {line-height: 40px; display: -ms-flexbox;display: flex; display: -webkit-flex; -ms-flex-align: center; align-items: center;}
	.tabSwitch li img {width:18px;margin-top:10px;}
	.itemBlock {border-top:1px solid #ddd;background: #fff;}
	.stars img {width:16%;}
	.voteInfo {color:#f39800;font-size: 1.3em;}
	.itemDetail {padding-left: 10px;}
	.itemDetail h3 {font-size: 1.7em; font-weight: normal;margin-bottom:10px;color:#333;}
	.itemDetail h3 span {margin-right:10px;overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; max-width: 45%;}
	.itemDetail h3 img {height: 16px;}
	.itemDetail .info {font-size:1.2em;margin-bottom: 2px;}
	.itemDetail .info span{color:#f39800;margin-left:2px;}
	.info .score {margin-right:10px;}
	.voteBtn {background:url("../assets/img/uyt@2x.png") no-repeat 8px 4px #f50500; padding: 0px 10px 0px 30px; color:#fff;font-size: 1.3em; border-radius: 5px; background-size: 16px; height: 25px; line-height: 25px;}
	.moreSelect h3 {font-size:1.6em;font-weight: normal;padding:0px 10px 10px;}
	.companyTypeList input {opacity: 0;position: absolute;}
	.smallTitle {font-size: 1.1em; font-weight: normal; padding: 10px;}
	.companyTypeList {padding:0px 10px;font-size:1.1em;}
	.companyTypeList li {float:left;padding: 5px 10px; border-radius: 5px; margin: 0 8px 8px 0; border: 1px solid #ddd;}
	.companyTypeList li.active {background: #E3E3E3; color: #656565;}
	.moreContent {padding-bottom: 20px;}
	.my-swiper-container {margin: 0 auto; position: relative; overflow: hidden; list-style: none; padding: 0; z-index: 1;}
	.signUpBtn { position: fixed; z-index: 999; right: -5px; top: 33%;color: #F61E1B; font-size: 1.3em;line-height:35px;background:url("../assets/img/signUpBtn.png") no-repeat ; background-size: contain; height: 40px; width: 95px; text-align: right; padding-right: 23px; box-sizing: border-box;}
	.tabcontent .dropload-down {background:#f9f9f9;}
	.btn {cursor: pointer;}
	@media (min-width: 450px){
	    .signUpBtn {right: auto; margin-left: 355px;}
	}
</style>