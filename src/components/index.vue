<template>
	<div class="indexSection ">
		<voteTop v-bind:type = "type"></voteTop>
		<div class="section">
			<div class="sectionTit first">金融企业投票</div>
			<div class="sectionContent">
				<companyVoteType v-once></companyVoteType>
				<div v-if="newsAarry.length" class="news clearfloat">
					<div class="l">
						<img style="height:45px;" src="../assets/img/xinwen@2x.png" alt="" />
					</div>
					<div class="l swiper-vertical" style="width:75%">
						<ul class="newList" :class="newsAarry.length > 2?'swiper-wrapper':''">
							<li v-for="(item, index) in newsAarry" class="swiper-slide" :style="{ marginTop: marginTop }">
								<router-link :to="{ name: 'ArticleDetail', params: { id: item.id,title:'头条新闻' }}">
									<!--<span>{{ item.title }}</span>-->{{ item.title }}
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<analysttype></analysttype>
		<div class="section" v-if="get_news.length">
			<div class="sectionTit">深圳金融商博会专栏</div>
			<div class="sectionContent">
				<div class="sectionBlock" >
					<ul class="clearfloat">
						<li class="voteBlock " v-bind:class="index%2==0?'l':'r'" v-for="(item, index) in get_news">
							<router-link :to="{ name: 'ArticleDetail', params: { id: item.id,title:'深圳金融商博会专栏' }}">
								<img v-lazy="$store.state.baseUrl + item.img" alt="" />
								<p class="voteBlockfont clearfloat">
									<span class="l">《</span>
									<span class="l title">{{item.title}}</span>
									<span class="l">》</span>
								</p>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<companyDirect></companyDirect>
		<analystRecommend></analystRecommend>
		<footercontent v-once></footercontent>
	</div>
</template>
<script>
	import voteTop from './voteTop'
	import analysttype from './analysttype'
	import analystRecommend from './analystRecommend'
	import companyVoteType from './companyVoteType'
	import companyDirect from './companyDirect'
	import footercontent from './footer'
	export default {
  		name: 'home',
  		data() {
			return {
				type: "1",
				newsAarry:[],
				domain:"",
				marginTop:"",
				get_news:[],
				
			}
		},
  		components:{voteTop,analysttype,analystRecommend,companyDirect,companyVoteType,footercontent},
  		
  		mounted(){
  			var _this = this;
			_this.init();
		},
		
		methods: {
			init(){
				var _this = this;
				_this.domain = _this.$store.state.domain;
				// _this.domain = 'http://baixiu.io/Admin/';
				_this.$axios.get(_this.domain+'other/top_news').then(function(res) {
					_this.newsAarry = res.data.data;
					if(_this.newsAarry.length > 2){
						_this.$nextTick(()=>{ 
							var swiperV = new Swiper('.swiper-vertical', {
						      direction: 'vertical',
						      loop: true,
						      slidesPerView: 2,
						      autoplay: {
						        delay: 3500,
						        disableOnInteraction: false,
						      }
						    });
					  });
					}else if(_this.newsAarry.length == 1){
						_this.marginTop = 15+'px';
					}else{
						_this.marginTop = 0;
					}
					// console.log(_this.newsAarry.length);
				}).catch(function(error) {
					console.log(error);
				});
				
				_this.$axios.get(_this.domain+'other/get_news').then(function(res) {
					_this.get_news = res.data.data;
				}).catch(function(error) {
					console.log(error);
				});
				
				
			}
		}
	}
</script>
<style>
	.sectionTit {text-align: center; line-height: 45px; font-size: 1.9em; height: 45px; margin: 10px 0px;background-color:#fff;position: relative;}
	.sectionTit.first {background:url('../assets/img/tex@3x.png') no-repeat #fff center; background-size: contain;margin-top:0px;}
	.sectionContent{background: #fff; padding:0px 10px;margin-bottom: 5px;}
	.sectionContent .item li {width:19%;display: inline-block;text-align: center;margin-top:15px;}
	.sectionContent p {margin:5px 0px;font-size:1.2em;}
	.sectionContent li img {width:60%;}
	.news {padding:15px 5px;}
	.newList li {overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 22px;font-size:1.2em;height:22px;}
	.newList li a {color: #575757;}
	.newList span {color: red; border: 1px solid red; border-radius: 5px; padding: 0px 5px;margin-right:5px;}
	.sectionBlock {padding:10px 0px;}
	.sectionBlock li {width: 48%;margin: 5px 2px;}
	.sectionBlock li.voteBlock {position: relative;background:red;}
	.sectionBlock li.voteBlock img {width:100%;display: block;}
	.sectionBlock .voteBlock a {display: block;}
	.titleLink { font-size: 0.7em; position: absolute; right: 15px; top: 4px;}
	.titleLink img { width: 8px; float: right; margin: 15px 0px 0px 3px;}
	.companyList td {border:1px solid #ddd;border-right:none;border-left:none;padding:5px 0px;}
	.companyList td:first-child {padding-left:5px;}
	.companyList td:last-child {padding-right:15px;}
	.companyList img {width:30px;padding:0px 10px;}
	.companyList a {display: flex; display: -webkit-flex; align-items: center;font-size:1.2em;color:#9D9D9D;}
	 .name {margin:2px 0px;}
	.clearfloat .ico {width:13px; margin-right: 2px; float: left; margin-top: 1px;}
	.analysisList .clearfloat {padding:0px 6px;}
	.visitNumber {padding:15px 10px 0;height: 16px;overflow: hidden;}
	.displayDiv .visitNumber p {margin:0px;color:#A4A4A4;}
	.searchCompany .imgBtn,td.ImgTd {width:20px;}
	.indexSection {position: relative;}
	.indexSection .searchCompany {position: absolute; width: 100%; box-sizing: border-box; top: 10px;z-index:10;}
	.swiper-pagination.pageStyle {position: static;}
	.pageStyle .swiper-pagination-bullet {background:#c3c3c3;margin:0px 4px;}
	.pageStyle .swiper-pagination-bullet-active {background:red;width:8px;}
	.swiper-wrapper .banner {width:100%;display: block;}
	.swiper-vertical {height: 50px;overflow: hidden;}
	.voteBlockfont {position: absolute;left: 3px;color:#fff;bottom: 10%;}
	.sectionContent p.voteBlockfont {font-size:1.4em;width:98%;}
	.voteBlockfont .title {overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; max-width: 70%;margin:0px 5px;}
</style>