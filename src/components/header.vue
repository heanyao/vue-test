<template>
	<div class="heaerIndex">
		<h1 class="tit">
			<img class="backArrow" src="../assets/img/gtfk@2x.png" v-on:click="goBack" alt="arrow">
			{{ headerTitle }}
			<a href="./static/plugins/h5Plus/share.html" v-if="plusFlag"><img class="share" src="../assets/img/gfd@2x.png"></a>
			<img class="share" src="../assets/img/gfd@2x.png" v-else>
		</h1>
		<div class="divDialog">
			<h4 class="dialogTitle">分享到</h4>
			<div class="dialogContent">
				<div class="usualMessage">
				</div>
				<div class="bdsharebuttonbox">	
					<div v-if="!plusFlag">
						<share :config="config"></share>
					</div>
				</div>
			</div>
			<div class="dialogClose">取消</div>
		</div> 
	</div>
	
</template>

<script>
	export default {
  		name: 'headercontent',
		props:{
			headerTitle:{
				type:String,
				required:true
			}
		},
		data() {
	      return {
	        config: {
	        	url                 : 'http://demo.ansion.cc', // 网址，默认使用 window.location.href
				source              : 'http://demo.ansion.cc', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
				title               : '2018深圳金融商博会企业与分析师投票活动', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
				description         : '2018深圳金融商博会企业与分析师投票活动', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
				image               : 'http://www.ceofx.com/Public/upload/img/1525572206_601219889.jpg', // 图片, 默认取网页中第一个img标签
				sites               : ['qzone', 'qq', 'weibo','wechat'], // 启用的站点				
				wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
				wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
	        },
	        plusFlag:false,
	        height:350,
	      }
	    },
	    mounted() {
			this.init();
		},
		methods: {
			init(){
				var _this = this;
				try {
				   	if(plus){
				   		_this.plusFlag = true;
				   	}
				    
				}
				catch(err) {
				    _this.plusFlag = false;
				}
				_this.height = window.innerHeight / 2 + 100;
			},
			 goBack (){
		      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
		    }
			
		}
	}
</script>
<style src="../../node_modules/social-share.js/dist/css/share.min.css"></style>
<style>
	.tit { font-size: 1.9em; width: 100%; height: 2.2em; line-height: 2.2em; background: #fff; text-align: center; color: #090909; font-weight: 500; position: relative; font-family: "microsoft Yahei";}
	img.backArrow {width: 10px; display: block; position: absolute; left: 15px; top: 12px;cursor: pointer;}
	img.share { width: 20px; position: absolute; right: 15px; top: 10px;}
	.divDialog .dialogContent{ padding: 15px 10px; text-align: center;font-size:1.2em;}
	.divDialog .bdshare-button-style1-32 a {float: none;display: inline-block;}
	.bdsharebuttonbox {display: none;}
</style>