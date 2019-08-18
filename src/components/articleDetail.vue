<template>
	<div class="articleDetail ">
		
		<headercontent v-bind:headerTitle = "headerTitle"></headercontent>
		<div class="content">
			<h2 class="title">{{newsInfo.title}}</h2>
			<p class="notes">{{newsInfo.created_time}}</p>
			<div class="articleMessage" v-html="newsInfo.message"></div>
		</div>
	</div>
</template>

<script>
	import headercontent from './header'
	export default {
  		name: 'articleDetail',
  		components:{headercontent},
  		data() {
			return {
				headerTitle: "",
				domain:"",
				newsId:'',
				newsInfo:""
			}
		},
  		mounted() {
			this.init();
		},
		methods: {
			init(){
				var _this = this;
				var pageTitle = _this.$route.params.title;
				_this.newsId = _this.$route.params.id;
				if(pageTitle != undefined){
					_this.headerTitle = pageTitle;
					let expireDays = 1000 * 60 * 60 * 24 * 2;
		      		_this.setCookie('newsTitle', pageTitle, expireDays);
				}else if(_this.getCookie('newsTitle') != ""){
					try {
						_this.headerTitle = unescape(_this.getCookie('newsTitle'));
					}
					catch(err){
						console.log(err);
					}
				}

				_this.domain = _this.$store.state.domain;
				// _this.domain = 'http://baixiu.io/Admin/';
				
				$(".loading").show();
				_this.$axios.get(_this.domain+'other/get_news_message/news_id/' + _this.newsId).then(function(res) {
					var temData = res.data.data;
					temData.message = temData.message.replace('src="/Public/upload/','src="http://www.ceofx.com/Public/upload/');
					_this.newsInfo =temData;
					$(".loading").hide();
				}).catch(function(error) {
					$(".loading").hide();
					console.log(error);
				});
			}
		}
	}
</script>

<style>
	.articleDetail{background:#fff;}
	.articleDetail .content {border-top: 1px solid #ddd; color: #666; padding: 15px; font-size: 1.2em; line-height: 20px;}
	.articleDetail .title {font-size: 1.4em; line-height: 25px; margin-bottom: 10px;}
	.articleDetail .notes {color: #999; margin-bottom: 10px; font-size: 0.9em;}
	.articleMessage {font-size:14px;line-height:25px;}
	.articleMessage img {width:100%;display: block;}
	.articleMessage p {margin-bottom: 10px;}
</style>



