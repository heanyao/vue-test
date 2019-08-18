<template>
	<div class="AnalystInfo ">
		
		<headercontent v-bind:headerTitle = "headerTitle"></headercontent>
		<div class="asynData" v-if="analysInfo">
			<div class="itemBlock">
				<div class="itemContent">
					<div class="analystInfo" >
						<img class="pic" v-lazy="$store.state.baseUrl + analysInfo.headimg" alt="" />
						<div class="introduceDetail" v-if="analysInfo.introduce">
							{{ analysInfo.introduce }}
							<div class="btnMore" v-on:click="moreInfoBtn">
								<span>查看更多</span>
							</div>
						</div>
						<span class="analysisBtn" :data-number="analysInfo.id" :data-type="2" ><span class="btnText">给他投票</span></span>
						<ul class="shareList">
							<li v-if="analysInfo.qq">
								<img class="clipboardTagert qq" :data-clipboard-text="analysInfo.qq" src="../assets/img/dtrkc@2x.png" alt="" />
							</li>
							<li v-if="analysInfo.wechat">
								<img class="clipboardTagert weixin" :data-clipboard-text="analysInfo.wechat" src="../assets/img/gfds@2x.png" alt="" />
							</li>
							<li v-if="analysInfo.email">
								<img class="clipboardTagert email" :data-clipboard-text="analysInfo.email" src="../assets/img/oh@2x.png" alt="" />
							</li>
							<li v-if="analysInfo.tel">
								<a v-bind:href="'tel:' + analysInfo.tel"><img src="../assets/img/okij@2x.png" alt="" /></a> 
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="introduceBlock" style="margin-bottom:0px;">
				<div class="introduceContent tableBorder" v-for="item in analysInfo.message">
					<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>
						<td class="MessageDetail">
							<p class="info">{{ item.message }}</p>
							<p class="MessageTime">{{ item.created_time }}</p>
						</td>
						<td class="itemMessage">
							<img class="MessageIco" v-lazy="$store.state.baseUrl + item.img" alt="" />
						</td>
					</tr></tbody></table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import headercontent from './header'
	export default {
  		name: 'AnalystInfo',
  		components:{headercontent},
  		data() {
			return {
				headerTitle: "专栏作家",
				analysInfo:""
			}
		},
  		mounted() {
			this.init();
		},
		methods: {
			init(){
				var _this = this;
				var _id = _this.$route.params.id;
				var domain = _this.$store.state.domain;
				_this.$axios.get(domain+'view/'+ _id).then(function(res) {}).catch(function(error) {
					console.log(error);
				});
				
				_this.$axios.get(domain+'analyst/analyst_introduce/id/'+ _id).then(function(res) {
					var resData = res.data.data;
					_this.analysInfo = resData;
					_this.$nextTick(()=>{ 
				    var obj = $(".introduceDetail");
				    if(obj.height() > 50){
				    	obj.css("height","64px");
				    }else{
				    	$(".btnMore").hide();
				    }
				   });
				}).catch(function(error) {
					console.log(error);
				});
				
				var clipboard2 = new Clipboard('.shareList .clipboardTagert');
			    clipboard2.on('success', function(e) {
			    	var tempType = "";
			    	if($(e.trigger).hasClass("weixin")){
			    		tempType = "微信";
			    	}else if($(e.trigger).hasClass("youxiang")){
			    		tempType = "邮箱";
			    	}else if($(e.trigger).hasClass("qq")){
			    		tempType = "QQ";
			    	}
			    	 $(".usualMessage").empty().append("您已成功复制了分析师的" + tempType + "<br><span class='voteInfo'>" + e.text + "</span><br>" + "快去联系分析师吧~");
	      			_this.openDialog();
	      			_this.disapperPop();
			    });
			
			    clipboard2.on('error', function(e) {
			    	$(".usualMessage").empty().append("<span style='color:red'>复制出错</span>");
			    	_this.openDialog();
				    _this.disapperPop();
			        console.log(e);
			    });
			},
			moreInfoBtn(){
				$(".introduceDetail").css("height","auto");
				$(".btnMore").hide();
			}
		}
	}
</script>
<style>
	.analystInfo {text-align:center;position: relative;}
	.analystInfo .pic {min-width:110px;border-radius: 50%;max-width:100%;max-height: 150px;}
	.analystInfo .introduceDetail { font-size: 1.2em; margin: 10px; line-height: 20px; overflow: hidden; position: relative;color:#666;}
	.btnMore {position: absolute; bottom: 0px; width: 100%; background: rgba(255, 255, 255, 0.95); height: 25px;color:#999;text-align:center;}
	.btnMore span {background: url('../assets/img/bnn@2x.png') no-repeat center right; background-size: contain; padding-right: 25px;}
	.analysisBtn { border: 1px solid #f5492d; color: #f5492d; display: block; height: 30px; line-height: 30px; font-size: 1.4em; width: 70%; margin: 10px auto;border-radius: 8px;;}
	.analysisBtn span {background: url('../assets/img/dtftyu@2x.png') no-repeat center left; background-size: contain; padding-left: 30px;}
	.shareList {margin: 20px 0 15px;}
	.shareList li {display: inline-block;margin:0px 5px;}
	.shareList li img {height:30px;cursor: pointer;}
	.AnalystInfo .tableBorder tr td {vertical-align: top;}
	td.itemMessage,.itemMessage .MessageIco {width:75px;}
	.itemMessage .MessageIco {display: block;}
	.MessageTime {margin-top:10px;color:#999;}
	.MessageDetail .info {padding-right:5px;max-height:55px;overflow: hidden;color:#333;min-height:45px;}
</style>