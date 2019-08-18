<template>
	<div>
		<adminMenu></adminMenu>
		<div class="adminContent">
			<div class="search">
				<h1 class="title">企业</h1>
				<div class="container-fluid">
				    <div class="panel">
				      <div class="panel-heading">
				        <h3 class="panel-title">企业列表</h3>
				      </div>
				      <div class="panel-body">
				        <div class="well">
				        	<form class="clearfloat" action="">
				        		<input type="text" class="text" placeholder="请输入企业名称" />
								<select name="" id="" class="text" >
									<option value="">请选择企业类型</option>
								</select>
								<button type="button" class="adminBtn">搜索</button>
				        	</form>
				        </div>
				        <div class="result">
				            <table class="table">
								<thead>
									<tr>
										<td>test</td>
										<td>test</td>
										<td>test</td>
										<td>test</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>test</td>
										<td>test</td>
										<td>test</td>
										<td>test</td>
									</tr>
									<tr>
										<td>test</td>
										<td>test</td>
										<td>test</td>
										<td>test</td>
									</tr>
									<tr>
										<td>test</td>
										<td>test</td>
										<td>test</td>
										<td>test</td>
									</tr>
								</tbody>
							</table>
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
  		name: 'adminComList',
  		data(){
			return {
				
			}
		},
		components:{adminMenu},
  		mounted() {
	      this.init();
	    },
	    methods: {
	       init(){
		        
		     	
	       },
	      
	    }
  		 
	}
</script>

<style>
	.adminContent {position: absolute; left: 150px; width: calc(100% - 150px);height:100%;background: #fff;min-width:660px;overflow: auto;}
	.adminContent .search .text {width:200px;float: left;margin-right:15px;border-bottom: 1px solid #ddd;margin-bottom: 15px;}
	.adminContent .search .text.error {border-color:red;}
	.adminContent .search {padding: 15px;font-size:14px;}
	.adminBtn {height: 33px; background: red; color: #fff; border: none; border-radius: 5px; width:70px;outline:none;cursor: pointer;}
	.result tr td {border:1px solid #ddd;padding:5px;color:#333;}
	.search .title {font-weight: 400; font-size: 28px; color: #333; margin-bottom: 15px;}
	.result thead tr td {font-weight: bold;}
	.search .panel{ background-color: #fff; -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05); box-shadow: 0 1px 1px rgba(0, 0, 0, .05); border: 1px solid #e8e8e8; border-top: 2px solid #bfbfbf; border-color: #ddd;}
	.search .panel-heading { position: relative; color: #595959; background: #fcfcfc; padding: 10px 15px; border-bottom: 1px solid #e8e8e8;}
	.search .panel-body {padding:15px;}
	.search .well {min-height: 20px; padding: 19px 19px 4px 19px; margin-bottom: 20px; background-color: #f5f5f5; border: 1px solid #e3e3e3; border-radius: 3px; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05); box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);}
	.panel-title {font-size: 16px; font-weight: 500;}
</style>