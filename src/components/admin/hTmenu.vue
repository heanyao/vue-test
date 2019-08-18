<template>
	<div>
		<div class="adminLeft">
			<ul>
				<li v-for="items in menuList">
					<span class="menuTitle">{{ items.title}}</span>
					<ul>
						<li v-for="item in items.second">
							<router-link v-bind:to="item.path" :class="$route.name.indexOf(item.pathName) != -1 ? 'active':''">
								{{ item.menuName}}
								<img class="menuIco" src="../../assets/img/gtfk@2xNo.png" alt="" />
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		
		<div class="divDialog">
			<h4 class="dialogTitle">系统信息</h4>
			<div class="dialogContent"></div>
			<div class="dialogClose">取消</div>
		</div>
	</div>
	
</template>

<script>
	var menuList = [
    {
      "title":"企业",
       "second":[
       	{
       		"menuName":"添加修改企业",
       		"path":"/admin",
       		"pathName":"adminComSet"
       	},
       	{
       		"menuName":"企业列表",
       		"path":"/admin-company-list",
       		"pathName":"adminComList"
       	},
       	{
       		"menuName":"企业类型",
       		"path":"",
       		"pathName":"trt"
       	},
       ]
    },
    {
      "title":"分析师",
      "second":[
       	{
       		"menuName":"分析师列表",
       		"path":"",
       		"pathName":"trt"
       	},
       	{
       		"menuName":"分析师列表1",
       		"path":"",
       		"pathName":"trt"
       	},
       	{
       		"menuName":"分析师列表2",
       		"path":"",
       		"pathName":"trt"
       	},
       ]
    },
  ]
	export default {
  		name: 'adminMenu',
  		 data() {
			return {
				menuList:menuList 
			}
		}
  }
</script>
<style>
	.menuTitle {display: block; padding: 10px 0px 10px 10px; border-bottom: 1px solid #716e6e;}
	.adminLeft {width: 150px; position: fixed; height: 100%; background: #515151; box-sizing: border-box; color: #fff; font-size: 15px; padding-top: 10px;top: 0;left:0;}
	.adminLeft a {color: #fff; display: block; padding: 8px 0px 8px 25px; border-bottom: 1px solid #716e6e;position:relative;}
    .adminLeft a.active {background:#373737;}
	.adminLeft li ul {font-size: 12px;margin-bottom: 5px;}
	.menuIco {position: absolute; right: 10px; top: 12px;}
</style>
