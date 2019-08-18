<template>
	<div>
		<adminMenu></adminMenu>
		<div class="adminContent">
			<div class="search">
				<h1 class="title">企业</h1>
				<div class="container-fluid">
				    <div class="panel">
				      <div class="panel-heading">
				        <h3 class="panel-title">添加修改企业</h3>
				      </div>
				      <div class="panel-body">
				        <div class="well">
				        	<div class="clearfloat">
				        		<input type="text" class="text" :class="inputFlag ? '' : 'error' "  placeholder="请输入企业ID" v-model="companyId"/>
								<button type="button" class="adminBtn" style="width:auto;margin-right:10px;" @click="modifyFun">修改企业信息</button>
								<router-link class="adminBtn" :to="{ name: 'adminComSetDetails'}" style="width:auto;" tag="button" >添加企业</router-link>
				        	</div>
				        </div>
				      </div>
				    </div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
   	import axios from 'axios'
   	import adminMenu from '../admin/hTmenu'
   	
	export default {
  		name: 'adminIndex',
  		data(){
			return {
				companyId:"",
				inputFlag:true
			}
		},
		components:{adminMenu},
		mounted() {
			this.init();
		},
	    methods: {
	    	init(){
	    		$(".loading").hide();
	    	},
	       	modifyFun(){
	       	var _this = this;
	       	if(_this.companyId == ''){
	       		_this.inputFlag = false;
	       		$(".dialogContent").empty().append('<span style="color:red">请先输入企业ID</span>');
	       		_this.openDialog();
	       		var timer = setTimeout(()=>{
	       			_this.closeDialog();
	       			_this.inputFlag = true;
	       			clearTimeout(timer);
	       		}, 1000);
	       	}else{
	       		_this.$router.push({ name: 'adminComSetDetail', params: { id: _this.companyId}});
	       	}
	       },
	       openDialog(){
				$(".usualMessage").show();
				$(".dialogTitle").empty().append("系统消息");
				$(".dialogMask").fadeIn();
				$(".divDialog").fadeIn();
			},
			closeDialog(){
				$(".dialogMask").fadeOut();
				$(".divDialog").fadeOut();
			}
	    }
  		 
	}
</script>