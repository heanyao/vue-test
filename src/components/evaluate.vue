<template>
	<div class="userInfo " :style="{minHeight:height+'px'}">
		
		<headercontent v-bind:headerTitle = "headerTitle"></headercontent>
		<div class="winPrize">
			<form id="commentForm" class="inputDiv smart-green">
				<label>服务评价<span class="starNumber">({{star}}星)</span></label>
				<div class="text textDiv">
					<ul>
						<li class="stars" v-for="star in 5">
							<img class="yes" src="../assets/img/78k@2x.png" alt=""/>
							<img class="no" src="../assets/img/78k@2xNo.png" alt="" />
						</li>
					</ul>
				</div>
				<input type="hidden" name="star" v-model="star">
				<input type="hidden" name="customer_id" v-model="customer_id">
				<input type="hidden" name="account_id" v-model="account_id">
				<input type="hidden" name="comment_type" v-model="comment_type">
				<label>评论内容</label>
				<textarea name="introduce" class="text" v-model="introduce"></textarea>
				<label>评论等级</label>
				<select name="vote_grade" class="text" v-model="vote_grade">
					<option value="好评">好评</option>
					<option value="中评">中评</option>
					<option value="差评">差评</option>
				</select>
				<button type="button" class="btn" @click="submitFun('#commentForm')">提交</button>
			</form>
		</div>
		<footercontent v-once></footercontent>
	</div>
</template>

<script>
	import headercontent from './header'
	import footercontent from './footer'
	export default {
  		name: 'Evaluate',
  		components:{headercontent,footercontent},
  		data() {
			return {
				headerTitle: "评论",
				domain:"",
				customer_id:"",
				account_id:"",
				star:0,
				introduce:"",
				vote_grade:"好评",
				height:450,
				comment_type:""
			}
		},
  		mounted() {
			this.init();
		},
		methods: {
			init(){
				var _this = this;
				_this.height = window.innerHeight;
				_this.domain = _this.$store.state.domain;
				_this.customer_id = _this.$route.params.customer_id;
				_this.account_id = _this.$route.params.account_id;
				_this.comment_type = _this.$route.params.comment_type;
				
				$(document).on("click",".textDiv .stars",function(){
					var item = $(this).index();
					_this.star = item + 1;
					$(".textDiv .stars").removeClass("active");
					$(".textDiv li.stars:lt("+_this.star+")").addClass("active");
				});
			},
		
			submitFun(item){
				var _this = this;
				var data = $(item).serialize();
				$(".dialogContent .usualMessage").empty().append('<div class="dropload-load"><span>正在处理,请稍后</span></div>');
				_this.openDialog();
				_this.$axios.post(_this.domain + 'other/evaluate', data).then(function (res) {
					var tempData = res.data;
					if(tempData.result == "1"){
						tempData.data ='<span style="color:red">您已评论</span';
					}else if(tempData.result == "0"){
						var timer1 = setTimeout(()=>{
							_this.closeDialog();
							_this.$router.push({ name: 'IntroduceCom', params: { id: _this.customer_id }});
							clearTimeout(timer1);
						},1000);
					}
				    $(".dialogContent .usualMessage").empty().append(tempData.data);
				    _this.disapperPop();
				}).catch(function (error) {
					$(".dialogContent .usualMessage").empty().append('<span style="color:red">评论失败</span>');
					 _this.disapperPop();
				    console.log(error);
				});
				return false;
			}
		}
	}
</script>
<style>
	#commentForm .textDiv {cursor: auto;line-height:36px;}
	#commentForm .textDiv .stars {cursor: pointer;margin-right:10px;width:16px;height:15px;position: relative;display: inline-block;}
	.textDiv .stars .yes {display: none;}
	.textDiv .stars .no {display: block;}
	.textDiv .stars.active .yes {display: block;}
	.textDiv .stars.active .no {display: none;}
	.textDiv .stars img {width:100%;position: absolute;top:0;left:0}
	.starNumber { margin-left: 5px; color: #F39800;}
</style>