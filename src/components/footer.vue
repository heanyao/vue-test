<template>
	<div>
		<div style="height:70px;"></div>
		<div class="footer">
		<ul>
			<li v-for="item in menuList">
				<router-link v-bind:to="item.linSrc" :class="$route.name.indexOf(item.pathName) != -1 ? 'active':''">
					<img class="no" v-bind:src="item.imgNo" alt="" />
					<img class="yes" v-bind:src="item.imgYes" alt="" />
					<p>{{item.linName}}</p>
				</router-link>
			</li>
		</ul>
	</div>
	</div>
</template>

<script>
	var menuList = [
    {
      "linName":"活动详情",
      "linSrc":"/",
      "imgNo" :require("../assets/img/2_no@2x.png"),
      "imgYes" :require("../assets/img/2_yes@2x.png"),
      "pathName":"Index"
    },
    {
      "linName":"企业投票",
      "linSrc":"/CompanyTypeList",
      "imgNo" :require("../assets/img/4_no@2x.png"),
      "imgYes" :require("../assets/img/4_yes@2x.png"),
      "pathName":"Company"
    },
    {
      "linName":"分析师投票",
      "linSrc":"/AnalystTypeList",
      "imgNo" :require("../assets/img/1_no@2x.png"),
      "imgYes" :require("../assets/img/1_yes@2x.png"),
      "pathName":"Analyst"
    },
    {
      "linName":"报名获奖",
      "linSrc":"/WinPrize",
      "imgNo" :require("../assets/img/3_no@2x.png"),
      "imgYes" :require("../assets/img/3_yes@2x.png"),
      "pathName":"WinPrize"
    },
  ]
	export default {
  		name: 'footercontent',
  		 data() {
			return {
				menuList: menuList
			}
		} 
  }
</script>

<style>
	.footer {background: #fff; padding: 10px 0px 8px; border-top: 1px solid #ddd; position: fixed; bottom: 0; width: 100%; z-index: 10;}
	@media (min-width: 450px){
	    .footer {width:450px;}
	}
	.footer ul {text-align: center;}
	.footer li {display: inline-block; width: 24%; text-align: center;font-size:1.2em;}
	.footer li img {width:30%;}
	.footer li img.yes {display: none;}
	.footer li .active img.no {display: none;;}
	.footer li .active img.yes {display: inline;}
	.footer li a {display: block;color: #666;}
</style>