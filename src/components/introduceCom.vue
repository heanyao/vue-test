<template>
	<div class="votesParents " v-if="comSummarize">

		<headercontent v-bind:headerTitle = "headerTitle"></headercontent>
		<div class="itemBlock"  >
			<div class="itemContent">
				<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>
					<td class="itemInfo">
						<img class="companyIco" v-lazy="$store.state.baseUrl + comSummarize.company_logo" alt="" />
					</td>
					<td>
						<div class="itemDetail">
							<h3><span>{{ comSummarize.name }}</span></h3>
							<div class="clearfloat">
								<div class="message l">
									<p class="info color_666">
										总获得票数 <span class="score votesNumber">{{ comSummarize.total_votes }}</span>
										企业好评率<span>{{PercentageFormate(comSummarize.praise, comSummarize.evaluate)}}%</span><img src="../assets/img/cv@2x.png" alt="" />
									</p>
									<p class="info color_999">{{ comSummarize.visits }}人已浏览咨询</p>
								</div>
							</div>
						</div>
					</td>
				</tr></tbody></table>
			</div>
		</div>
		<div class="introduceBlock">
			<h2>机构介绍</h2>
			<div class="analystInfo" style="padding-bottom: 1px;text-align: left;">
				<div class="introduceDetail color_666" >
					{{ comSummarize.introduce }}
					<div class="btnMore" v-on:click="moreInfoBtn">
						<span>查看更多</span>
					</div>
				</div>
			</div>
		</div>
		<div class="introduceBlock">
			<h2>公司风采</h2>
			<div class="introduceContent">
				<div class="swiper-container swiper4">
			      <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="(item, index) in comSummarize.style_img">
			          <img class="banner" v-bind:src="$store.state.baseUrl + item" alt="" />
			        </div>
			      </div>
			      <div class="swiper-pagination pagination4"></div>
			    </div>
			</div>
		</div>
		<div class="introduceBlock">
			<h2>企业证书 </h2>
			<div class="introduceContent" >
				<div class="slider swiper-container ">
					<div class="item2 swiper-wrapper" v-if="checkArray(comSummarize.certificate)">
						<ul  class="analysisDisplay swiper-slide" style="padding:0px;" >
							<li class="certificate" v-for="item in comSummarize.certificate">
								<img v-lazy="$store.state.baseUrl + item" alt="" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="introduceBlock">
			<h2>基本资料 </h2>
			<div class="introduceContent tableWidth color_666" v-html="comSummarize.info" >
			</div>
		</div>
		<div class="introduceBlock">
			<h2 class="inquiryList">咨询经纪人</h2>
			<div v-html="comSummarize.contacts">
			</div>
		</div>
		<div class="introduceBlock">
			<div class="scroceNumber color_666">
				服务评分
				<span class="starsList" v-if="numberFormate(comSummarize.sum_stars, comSummarize.evaluate)">
					<img src="../assets/img/78k@2x.png"  v-for="item in numberFormate(comSummarize.sum_stars, comSummarize.evaluate)" />
				</span>
				<span class="number">{{ comSummarize.service }}</span>
			</div>
		</div>
		<div class="switchSecond">
			<ul class="tabSecond clearfloat"></ul>
			<div class="tabcontent my-swiper-container">
				<div class="contentBlock swiper-wrapper">
					<div class="swiper-slide">
						<template v-if="checkArray(all_comments)">
							<table class="commentTable" border="0" cellspacing="0" cellpadding="0" v-for="list in all_comments"><tbody>
								<tr>
									<td class="itemIco"><img v-lazy="$store.state.baseUrl + list.headimg" alt="" class="personIco"></td>
									<td>
										<p class="commentTitle">{{ list.nickname }}<span>{{ list.created_time }}</span></p>
										<p>
											服务评分
											<span class="starsList">
												<img src="../assets/img/78k@2x.png" alt="" v-for="star in changeInt(list.star)" />
											</span>
										</p>
										<div class="commentInfo">{{ list.introduce }}</div>
									</td>
								</tr>
							</tbody></table>
							<div class="dropload-down">
								<div class="dropload-load" v-if="all_comments.length < all_total"><span>正在为亲加载</span></div>
								<div class="dropload-noData" v-else>已全部加载完</div>
							</div>
						</template>
						<template v-else>
							<div class="commentTable noDataDiv">没有评论 </div>
						</template>
					</div>
					<div class="swiper-slide">
						<template v-if="checkArray(praise_comments)">
							<table class="commentTable" border="0" cellspacing="0" cellpadding="0" v-for="list in praise_comments"><tbody>
								<tr>
									<td class="itemIco"><img v-lazy="$store.state.baseUrl +  list.headimg" alt="" class="personIco"></td>
									<td>
										<p class="commentTitle">{{ list.nickname }}<span>{{ list.created_time }}</span></p>
										<p>
											服务评分
											<span class="starsList">
												<img src="../assets/img/78k@2x.png" alt="" v-for="star in changeInt(list.star)" />
											</span>
										</p>
										<div class="commentInfo">{{ list.introduce }}</div>
									</td>
								</tr>
							</tbody></table>
							<div class="dropload-down">
								<div class="dropload-load" v-if="praise_comments.length < praise_total"><span>正在为亲加载</span></div>
								<div class="dropload-noData" v-else>已全部加载完</div>
							</div>
						</template>
						<template v-else>
							<div class="commentTable noDataDiv">没有评论 </div>
						</template>
					</div>
					<div class="swiper-slide">
						<template v-if="checkArray(mid_comments)">
							<table class="commentTable" border="0" cellspacing="0" cellpadding="0" v-for="list in mid_comments"><tbody>
								<tr>
									<td class="itemIco"><img v-lazy="$store.state.baseUrl + list.headimg" alt="" class="personIco"></td>
									<td>
										<p class="commentTitle">{{ list.nickname }}<span>{{ list.created_time }}</span></p>
										<p>
											服务评分
											<span class="starsList">
												<img src="../assets/img/78k@2x.png" alt="" v-for="star in changeInt(list.star)" />
											</span>
										</p>
										<div class="commentInfo">{{ list.introduce }}</div>
									</td>
								</tr>
							</tbody></table>
							<div class="dropload-down">
								<div class="dropload-load" v-if="mid_comments.length < mid_total"><span>正在为亲加载</span></div>
								<div class="dropload-noData" v-else>已全部加载完</div>
							</div>
						</template>
						<template v-else>
							<div class="commentTable noDataDiv">没有评论 </div>
						</template>
					</div>
					<div class="swiper-slide">
						<template v-if="checkArray(bad_comments)">
							<table class="commentTable" border="0" cellspacing="0" cellpadding="0" v-for="list in bad_comments"><tbody>
								<tr>
									<td class="itemIco"><img v-lazy="$store.state.baseUrl + list.headimg" alt="" class="personIco"></td>
									<td>
										<p class="commentTitle">{{ list.nickname }}<span>{{ list.created_time }}</span></p>
										<p>
											服务评分
											<span class="starsList">
												<img src="../assets/img/78k@2x.png" alt="" v-for="star in changeInt(list.star)" />
											</span>
										</p>
										<div class="commentInfo">{{ list.introduce }}</div>
									</td>
								</tr>
							</tbody></table>
							<div class="dropload-down">
								<div class="dropload-load" v-if="bad_comments.length < bad_total"><span>正在为亲加载</span></div>
								<div class="dropload-noData" v-else>已全部加载完</div>
							</div>
						</template>
						<template v-else>
							<div class="commentTable noDataDiv">没有评论 </div>
						</template>
					</div>
				</div>
			</div>
		</div>
		<div style="height:35px;"></div>
		<div class="bottomBtn clearfloat footer">
			<p class="btn btnRed l" :data-number="customer_id" :data-type="1"><img src="../assets/img/uyt@2x.png"/><span>投票</span></p>
			<p class="btn btnYell l" v-on:click="inquiryListPos"><img src="../assets/img/kf@2x.png"/><span>咨询商家</span></p>
			<p class="btn btnRed l commentBtn" :data-number="customer_id" :data-type="1"><img src="../assets/img/commentsIco.png"/><span>评论</span></p>
		</div>
	</div>
</template>

<script>
	import headercontent from './header'
	export default {
  		name: 'IntroduceCom',
  		components:{headercontent},
  		data() {
			return {
				headerTitle: "公司介绍",
				comSummarize:{},
				evaluateList:{},
				domain:"",
				swiperVote:"",
				scrollFlag:true,
				all_comments:[],
				praise_comments:[],
				mid_comments:[],
				bad_comments:[],
				all_total:"",
				praise_total:"",
				mid_total:"",
				bad_total:"",
				all_infoNext:"",
				praise_infoNext:"",
				mid_commentsNext:"",
				bad_commentsNext:"",
				customer_id :null,
        startsPerNum: [],  //平均好评星数
			}
		},
  		mounted() {
			this.init();
			// console.log(this.$route.params.id);
		},
		methods: {
			init(){

				var _this = this;
				_this.domain = _this.$store.state.domain;
				// _this.domain = 'http://baixiu.io/Admin/';
				_this.customer_id = _this.$route.params.id;

				_this.$axios.get(_this.domain+'view/'+ _this.customer_id).then(function(res) {
					console.log(res.data);//暂时没用
				}).catch(function(error) {
					console.log(error);
				});

				_this.$axios.get(_this.domain+'company/company_info/id/'+ _this.customer_id).then(function(res) {
          console.log(res.data.data);
          _this.comSummarize = res.data.data;
					// console.log(res.data.data);
					_this.$nextTick(()=>{
						var obj = $(".introduceDetail");
					    if(obj.height() > 50){
					    	obj.css("height","65px");
					    }else{
					    	$(".btnMore").hide();
					    }
					    if(res.data.data.style_img != null && res.data.data.style_img.length > 1){
					    	 var swiper = new Swiper('.swiper4', {
					          loop: true,
					            autoplay: {
					              delay: 3500
					            },
					            pagination: {
					              el: '.pagination4',
					              clickable: true,
					              renderBullet: function (index, className) {
					                return '<span class="' + className + '"></span>';
					              },
					            },
					         });

					    }
				   });

				}).catch(function(error) {
					console.log(error);
				});

			 _this.getInitData();
				var clipboard = new Clipboard('.contactMethod .clipboardTagert');
			    clipboard.on('success', function(e) {
			    	var tempType = "";
			    	if($(e.trigger).hasClass("weixin")){
			    		tempType = "微信";
			    	}else if($(e.trigger).hasClass("youxiang")){
			    		tempType = "邮箱";
			    	}
			    	 $(".usualMessage").empty().append("您已成功复制了分析师的" + tempType + "<br><span class='voteInfo'>" + e.text + "</span><br>" + "快去联系分析师吧~");
	      			_this.openDialog();
	      			_this.disapperPop();
			    });

			    clipboard.on('error', function(e) {
			    	$(".usualMessage").empty().append("<span style='color:red'>复制出错</span>");
			    	_this.openDialog();
				    _this.disapperPop();
			    });

				$(window).scroll(function() {
				    if(_this.scrollFlag && $(window).scrollTop() == $(document).height() - $(window).height()) {
				       if(_this.swiperVote != ""){
				       		_this.swiperVote.update();
				       		var item = $(".swiper-slide-active").find(".dropload-down");
				       		// console.log(_this.swiperVote.activeIndex);
				       		switch(_this.swiperVote.activeIndex){
								case 0: _this.getPageData(_this.all_infoNext,item,0);break;
								case 1: _this.getPageData(_this.praise_infoNext,item,1);break;
								case 2: _this.getPageData(_this.mid_commentsNext,item,2);break;
								case 3: _this.getPageData(_this.bad_commentsNext,item,3);break;
								default: ;
							}
				       }
				    }

				});
			},
			getInitData(){
				var _this = this;
				_this.$axios.all([
				    _this.$axios.get(_this.domain + 'company/company_evaluate_info/comment_type/1/id/'+ _this.customer_id),
				    _this.$axios.get(_this.domain + 'company/praise_company_evaluate/comment_type/1/id/'+ _this.customer_id),
				    _this.$axios.get(_this.domain + 'company/mid_comments_info/comment_type/1/id/'+ _this.customer_id),
				    _this.$axios.get(_this.domain + 'company/bad_comments_info/comment_type/1/id/'+ _this.customer_id),
				]).then(_this.$axios.spread(function (evaluateRes, praiseRes,midRes,badRes) {

					var tempEvaluate = evaluateRes.data.data;
					var tempPraise = praiseRes.data.data;
					var tempMid = midRes.data.data;
					var tempBad = badRes.data.data;

					_this.all_comments = tempEvaluate.all_info.data;
					_this.praise_comments = tempPraise.data;
					_this.mid_comments = tempMid.data;
					_this.bad_comments = tempBad.data;

					_this.all_total = tempEvaluate.all_info.total;
					_this.praise_total = tempPraise.total;
					_this.mid_total = tempMid.total;
					_this.bad_total = tempBad.total;

					_this.all_infoNext = tempEvaluate.all_info.next_page_url;
					_this.praise_infoNext = tempPraise.next_page_url;
					_this.mid_commentsNext = tempMid.next_page_url;
					_this.bad_commentsNext = tempBad.next_page_url;

					_this.$nextTick(()=>{
				      	_this.commentSwiper();
				  	});
				})).catch(function(error) {
					console.log(error);
				});
			},
			commentSwiper(){
				var _this = this;
				_this.swiperVote = new Swiper('.my-swiper-container', {
		    		autoHeight: true,
			      	pagination: {
				        el: '.tabSecond',
				        clickable: true,
				        bulletClass : 'l',
				        bulletActiveClass: 'active',
				        renderBullet: function (index, className) {
				          switch (index) {
							  case 0: name='<span>'+_this.all_total+'</span><br>(全部)';break;
							  case 1: name='<span>'+_this.praise_total+'</span><br>(好评)';break;
							  case 2: name='<span>'+_this.mid_total+'</span><br>(中评)';break;
							  case 3: name='<span>'+_this.bad_total+'</span><br>(差评)';break;
							  default: name='';
							}
					      return '<li class="' + className + '"><a href="#">' + name + '</a></li>';
					  }
			        },
				    on: {
					    slideChangeTransitionEnd: function(){
					       /* $("html,body").animate({scrollTop: $('.my-swiper-container').offset().top - 150},function(){
						     	 _this.scrollFlag = true;
						    });*/
						    _this.scrollFlag = true;
					    },
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
						  	  if(_this.all_comments.length < _this.all_total){
						  	  	_this.all_comments = _this.all_comments.concat(tempData.all_info.data);
						  	  }
							  _this.all_infoNext = tempData.all_info.next_page_url;
						  break;
						  case 1:
						  	  if(_this.praise_comments.length < _this.praise_total){
						  	  	_this.praise_comments = _this.praise_comments.concat(tempData.data);
						  	  }
						  	  _this.praise_infoNext = tempData.next_page_url;
						  break;
						  case 2:
						  	  if(_this.mid_comments.length < _this.mid_total){
						  	  	_this.mid_comments = _this.mid_comments.concat(tempData.data);
						  	  }
						      _this.mid_commentsNext = tempData.next_page_url;
						  break;
						  case 3:
						  	  if(_this.bad_comments.length < _this.bad_total){
						  	  	_this.bad_comments = _this.bad_comments.concat(tempData.data);
						  	  }
						  	  _this.bad_commentsNext = tempData.next_page_url;
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
					_this.scrollFlag = false;
					obj.empty().append('<div class="dropload-noData">已全部加载完</div>');
				}
			},
			numberFormate(sum_stars, votes){
			//   console.log(sum_stars)
			//   console.log(this.all_total)

			  var startsPer = parseInt(sum_stars/Number(this.all_total));
        console.log(startsPer);
        return startsPer;

			// 	if(votes && sum_stars){
			// 		var result = Math.round(sum_stars/votes);
          // console.log(result)
			// 		return result>5?5:result;
			// 	}else{
			// 		return 0;
			// 	}
			},
			PercentageFormate(praise, evaluate){
				console.log(praise+'---'+evaluate);
				if(praise && evaluate){
					return 100*((praise/evaluate).toFixed(2));
				}else{
					return 0;
				}
			},
			checkArray(arr){
				return Object.prototype.toString.call(arr)=='[object Array]' && arr.length >=1;
			},
			changeInt(item){
				return parseInt(item) > 0 ? parseInt(item): 0;
			},
			inquiryListPos(){
				 $("html,body").animate({scrollTop: $('.inquiryList').offset().top - 150});
				 return false;
			},
			moreInfoBtn(){
				$(".introduceDetail").css("height","auto");
				$(".btnMore").hide();
			},
		}
	}
</script>

<style>
	.info img {width:10px;margin-left:5px;}
	.introduceBlock {margin:10px 0px;background:#fff;}
	.introduceBlock h2{border-bottom: 1px solid #ddd; font-size: 1.8em; font-weight: normal; padding: 10px;color:#333;}
	.introduceContent {padding: 10px; font-size: 1.2em;line-height: 18px;}
	.introduceBlock .tableBorder {border-bottom: 1px solid #ddd;}
	.introduceBlock .tableBorder:last-child {border-bottom: none;}
	.introduceContent .tdTitle {width:56px;}
	.introduceContent .left {padding-left:10px;}
	.introduceContent tr td {vertical-align: middle;}
	.tableWidth tr td.tdContent {width:32%;}
	@media (min-width: 450px){
	    .tableWidth tr td.tdContent {width:35%;}
	}
	@media (max-width: 370px){
	    .tableWidth tr td.tdContent {width:29%;}
	}
	.tableWidth tr td {padding:4px 0;vertical-align: top;}
	.moreInfo { width: 16px; margin-left: 5px;}
	.scenery {width:100%;}
	.certificateList li {float:left;margin-right:4px;height: 82px;margin:0px 10px 10px 0px}
	.certificateList li img {height: 65px; padding: 5px; border: 1px solid #ddd;}
	.moreMessage {margin-top: 3px;}
	.introduceContent .personIco {width: 56px; border-radius: 50%;display: block;}
	td.itemPerson {width:56px;}
	.introduceContent .itemDetail h3 {margin-bottom: 5px;}
	.taskIco {height: 20px;cursor: pointer;}
	.itemName {padding-left:10px;}
	.itemName h3 {font-size: 1.6em; font-weight: normal;margin-bottom: 5px;color:#333;}
	.scroceNumber{font-size: 1.8em; padding: 10px;}
	.starsList {margin:0px 10px;}
	.starsList img {width:14px;}
	.number {color:#f39800;}
	.tabSecond {background:#fff;}
	.tabSecond li {width: 25%; text-align: center; font-size: 1.2em; line-height: 18px; padding: 10px 0;border-bottom: 1px solid #fff;}
	.tabSecond li.active {border-color:#f50500;}
	.tabSecond li span {color:#333;}
	.tabSecond li.active span {color:#f50500;}
	.tabSecond li a {display: block;border-right:1px solid #ddd;color:#666;}
	.tabSecond li:last-child a {border-right:none;}
	.commentTable {margin: 10px 0px; background: #fff;color:#999;}
	.commentTable tr td {padding:10px;vertical-align: top;}
	.commentImg li {float: left;margin-right:4px;}
	.commentImg img {height:55px;}
	.commentTable tr td:last-child {padding-left:0px;}
	.itemIco {width:45px;}
	.itemIco .personIco {width:45px;border-radius:50%;height:45px;}
	.commentTable p {font-size:1.2em;}
	.commentTable .commentTitle {margin-bottom:5px;font-size:1.4em;}
	.commentTitle span {float:right;}
	.commentInfo {margin:15px 0px;font-size: 1.2em;}
	.bottomBtn {padding: 0;border:none;}
	.bottomBtn .btn {width: 32%; text-align: center;color: #fff; font-size: 1.2em; height: 35px; line-height: 35px;position: relative;cursor: pointer;}
	.bottomBtn .btnYell {background:#F39801;margin: 0px 2%;}
	.bottomBtn .btnRed {background:#F40500}
	.bottomBtn .btn img {position: absolute; top: 8px; height: 20px;}
	.bottomBtn .btn span {padding-left:30px;}
	.contactMethod {text-align: right;height:20px;}
	.contactMethod li {display: inline-block;margin-left:10px;}
	.noDataDiv{text-align: center; height: 75px; line-height: 75px; color: red;font-size: 1.2em;}
	.certificate img {width:100%;display: block;}
</style>
