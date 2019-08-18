<template>
	<div>
		<adminMenu></adminMenu>
		<div class="adminContent">
			<div class="search">
				<h1 class="title">企业</h1>
				<div class="container-fluid">
				    <div class="panel">
				      <div class="panel-heading">
				        <h3 class="panel-title">修改企业信息</h3>
				      </div>
				      <div class="panel-body">
				        <div class="result detail">
				          <form id="companyFormAction">
				          		<div class="section inputDiv clearfloat">
				          			<input type="hidden" name="company_id" v-model="customer_id"/>
						           <label class="titler l">公司姓名</label>
						           <input type="text" name="company_name" placeholder="请输入公司姓名" class="text" :value="companyInfo.name">
						           <label class="titler l">投票数</label>
						           <input type="text" name="votes" placeholder="请输入投票数" class="text" :value="companyInfo.votes">
						           <label class="titler l">浏览人数</label>
						           <input  type="text" name="view" placeholder="请输入浏览人数" class="text" :value="companyInfo.view">
						           <label class="titler l">公司分类</label>
						           <select class="text" name="company_type_id">
						           		<option value="">请选择类型</option>
									    <option :value="item.id" v-for="item in company_type_list" :selected="item.id == type_id">{{item.company_type}}</option>
								   </select>
						           <label class="titler l">公司Logo</label>
						           <div class="uploadDiv l" style="width: 215px;overflow: hidden;">
							           	<div class="text textDiv">
											点击选择图片
											<input type="file" id="uploadImg" accept="image/*" data-type="logo">
								        </div>
								        <div class="tempView" v-if="companyInfo_img" style="height:205px;width:197px;">
								        	<img v-lazy="$store.state.baseUrl + companyInfo_img" alt="" style="max-width:100%;" />
								        	<input type="hidden" name="img" :value="companyInfo_img"/>-
								        </div>
						           </div>
						           <label class="titler l">公司介绍</label>
						           <textarea name="introduce" class="text" style="overflow: auto;height: 246px;" :value="companyInfo.introduce"></textarea>
						           
						           <label class="titler l">公司风采</label>
						           <div class="uploadDiv l">
							           	<div class="text textDiv" style="float:none;width:860px;">
											点击选择图片(<span style="color:red;">可选多张</span>)
											<input type="file" id="uploadImg" accept="image/*" data-type="style_img">
								        </div>
								        <div class="imgArea clearfloat" v-if="style_img.length">
								        	<div class="imgListDiv l" v-for="(item,index) in style_img">
								        		<img v-lazy="$store.state.baseUrl + item" alt=""  />
								        		<div class="mask"><span :data-number="index" data-type="style_img">&times;</span></div>
								        	</div>
										</div>
						           </div>
						           <label class="titler l">企业证书</label>
						           <div class="uploadDiv l">
							           	<div class="text textDiv" style="float:none;width:860px;">
											点击选择图片(<span style="color:red;">可选多张</span>)
											<input type="file" id="uploadImg" accept="image/*" data-type="certificate">
								        </div>
								        <div class="imgArea clearfloat" v-if="certificate.length">
								        	<div class="imgListDiv l" v-for="(item,index) in certificate">
								        		<img v-lazy="$store.state.baseUrl + item" alt=""  />
								        		<div class="mask"><span :data-number="index" data-type="certificate">&times;</span></div>
								        	</div>
										</div>
						           </div>
						           <label class="titler l">基本资料</label>
						           <div class="uploadDiv l">
						           		<textarea id="jibenziliao"  style="width:100%;height:400px;"></textarea>
						           </div>
						           <label class="titler l">咨询经济人</label>
						           <div class="uploadDiv l">
						           	  <textarea id="zixunjinjiren" style="width:100%;height:400px;"></textarea>
						           </div>
				          		</div>
				          </form>
				          <label class="titler l"></label>
						  <button tpe="button" class="adminBtn" @click="submitFun">提交</button>
				        </div>
				      </div>
				    </div>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
   	import adminMenu from '../admin/hTmenu'
	export default {
  		name: 'adminComListDetail',
  		data(){
			return {
				domain:"",
				customer_id:"",
				companyInfo:{},
				editorText: '',
      			editorText2: '',
      			style_img:[],
      			certificate:[],
      			contactsHtml:'',
      			infoHtml:'',
      			company_type_list:[],
      			type_id:"",
      			companyInfo_img:"",
      			basePath:document.location.origin+ "/static/plugins/kindeditor/"
			}
		},
		components:{adminMenu},
  		mounted() {
	      this.init();
	    },
	    methods: {
	       init(){
	       		 var _this = this;
		       	 _this.domain = _this.$store.state.domain;
				
						_this.editorText = _this.createKedit('#jibenziliao');
										_this.editorText2 = _this.createKedit('#zixunjinjiren');
										
										_this.$axios.get(_this.domain+'company_type_list').then(function(res) {
							_this.company_type_list = res.data.data;
						}).catch(function(error) {
							console.log(error);
						});
				
					if(_this.$route.params.id != undefined){
						_this.customer_id = _this.$route.params.id;
						_this.$axios.get(_this.domain+'company_info/'+ _this.customer_id).then(function(res) {
							var tempData = res.data.data;
								_this.type_id = tempData.type_id;
								_this.companyInfo = tempData;
								_this.companyInfo_img = tempData.img;
								if(tempData.style_img != null){
									_this.style_img = tempData.style_img;
								}
								if(tempData.certificate != null){
									_this.certificate = tempData.certificate;
								}
								if(tempData.info != null){
									_this.editorText.html(tempData.info);
								}
								if(tempData.contacts != null){
									_this.editorText2.html(tempData.contacts);
								}
							
						}).catch(function(error) {
							console.log(error);
						});
					}else{
						_this.editorText2.html(`<div class="introduceContent tableBorder">
							<table border="0" cellspacing="0" cellpadding="0">
								<tbody>
									<tr>
										<td class="itemPerson">
											<img class="personIco" src="./static/plugins/kindeditor/images/df@2x.png" alt="" /> 
										</td>
										<td class="itemName">
											<h3>
												<span>test2</span> 
											</h3>
											<p class="info color_666">
												test1 test1 test1
											</p>
										</td>
										<td>
											<ul class="contactMethod">
												<li>
										<img class="taskIco weixin clipboardTagert" data-clipboard-text="weixin111" src="./static/plugins/kindeditor/images/kjg@2x.png"> 
									</li>
												<li>
										<img class="taskIco youxiang clipboardTagert" data-clipboard-text="youxiang1111@qq.com" src="./static/plugins/kindeditor/images/err@2x.png"> 
									</li>
												<li>
													<a href="tel:12345678901"><img class="taskIco" src="./static/plugins/kindeditor/images/sdgg@2x.png" alt="" /></a> 
												</li>
											</ul>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="introduceContent tableBorder">
							<table border="0" cellspacing="0" cellpadding="0">
								<tbody>
									<tr>
										<td class="itemPerson">
											<img class="personIco" src="./static/plugins/kindeditor/images/yu@2x.png" /> 
										</td>
										<td class="itemName">
											<h3>
												<span>test2</span> 
											</h3>
											<p class="info color_666">
												test2 test2 test2
											</p>
										</td>
										<td>
											<ul class="contactMethod">
												<li>
										<img class="taskIco weixin clipboardTagert" data-clipboard-text="weixin222" src="./static/plugins/kindeditor/images/kjg@2x.png"> 
									</li>
												<li>
										<img class="taskIco youxiang clipboardTagert" data-clipboard-text="youxiang222@qq.com" src="./static/plugins/kindeditor/images/err@2x.png"> 
									</li>
												<li>
													<a href="tel:1234567890"><img class="taskIco" src="./static/plugins/kindeditor/images/sdgg@2x.png" alt="" /></a> 
												</li>
											</ul>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						`);
		        	_this.editorText.html(`<table>
							<tbody>
								<tr>
									<td class="tdTitle">
										所属国家:
									</td>
									<td class="tdContent">
										test1
									</td>
									<td class="tdTitle left">
										成立时间:
									</td>
									<td class="tdContent">
										test2
									</td>
								</tr>
								<tr>
									<td class="tdTitle">
										许可机构:
									</td>
									<td class="tdContent">
										test3
									</td>
									<td class="tdTitle left">
										经营模式:
									</td>
									<td class="tdContent">
										test4
									</td>
								</tr>
								<tr>
									<td class="tdTitle">
										平台软件:
									</td>
									<td class="tdContent">
										test5
									</td>
									<td class="tdTitle left">
										入金方式:
									</td>
									<td class="tdContent">
										test6
									</td>
								</tr>
								<tr>
									<td class="tdTitle">
										出金优惠:
									</td>
									<td class="tdContent">
										test7
									</td>
									<td class="tdTitle left">
										最低入金:
									</td>
									<td class="tdContent">
										美元
									</td>
								</tr>
							</tbody>
						</table>`);
					}
				
					$(".textDiv input").on("change",function(){
						var item = $(this);
						var obj = item[0].files[0];
						if(obj){
							var typeValue = item.data("type");
						let config = {
										headers:{'Content-Type':'multipart/form-data'}
								}; 
								let param = new FormData();
								param.append('company_id',_this.customer_id);
								param.append('type',typeValue);
								param.append('img',obj);
								$(".dialogContent").empty().append('<div class="dropload-load"><span>正在处理,请稍后</span></div>');
						_this.openDialog();
						_this.$axios.post(_this.domain + 'change_img',param,config).then(res=>{
										var tempData = res.data;
							if(tempData.result == "1"){
								$(".dialogContent").empty().append('<span style="color:red">'+tempData.error+'</span>');
							}else if(tempData.result == "0"){
								$(".dialogContent").empty().append("上传成功");
								_this.selectImgFun(typeValue,tempData.data );
							}
							_this.timerOut();
								}).catch(function(error) {
							console.log(error);
							$(".dialogContent").empty().append('<span style="color:red">上传失败</span>');
							_this.timerOut();
						});
						}
					});
				
					$(document).on("click",".imgListDiv .mask span",function(){
						var index = $(this).data("number");
						var type = $(this).data("type");
						if(type == "style_img"){
							_this.style_img.splice(index, 1);
						}else if(type == "certificate"){
							_this.certificate.splice(index, 1);
						}
					});
	       },
	       selectImgFun(type,img){
	       	var _this = this;
	       	if(type == "logo"){
	       		_this.companyInfo_img = img;
	       	}else if(type == "style_img"){
	       		_this.style_img = _this.style_img.concat(img);
	       		console.log(_this.style_img);
	       	}else if(type == "certificate"){
	       		_this.certificate = _this.certificate.concat(img);
	       		
	       	}
	       },
	      submitFun(){
	      		var _this = this;
	      		_this.contactsHtml = _this.editorText2.html();
	      		_this.infoHtml = _this.editorText.html();
	      		var form=$("#companyFormAction")[0];
        		var upLoadData =new FormData(form);
        		upLoadData.append('style_img',JSON.stringify(_this.style_img));
		        upLoadData.append('certificate',JSON.stringify(_this.certificate));
		        upLoadData.append('contacts',_this.editorText2.html());
		        upLoadData.append('info',_this.editorText.html());

	       		$(".dialogContent").empty().append('<div class="dropload-load"><span>正在处理,请稍后</span></div>');
	       		_this.openDialog();
		        _this.$axios.post(_this.domain + 'register_company',upLoadData).then(res=>{
		          var tempData = res.data;
							if(tempData.result == "1"){
								$(".dialogContent").empty().append('<span style="color:red">'+tempData.error+'</span>');
							}else if(tempData.result == "0"){
								$(".dialogContent").empty().append(tempData.data);
							}
							_this.disapperPop();
								}).catch(function(error) {
							console.log(error);
							$(".dialogContent .usualMessage").empty().append('<span style="color:red">提交失败</span>');
							_this.disapperPop();
						}); 
	       },
	        createKedit(item){
						var editor = KindEditor.create(item,{
							uploadJson : location.origin + '/static/plugins/kindeditor/php/upload_json.php',
							filterMode:false,  
							items : [
									'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
						'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
						'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
						'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
						'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
						'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
							'table', 'hr', 'anchor', 'link', 'unlink'
							]
					});
					return editor;
			}
	      
	    }
  		 
	}
</script>

<style>
	.detail .titler {width:100px;text-align: right;padding-right:15px;padding-top:8px;}
	.detail {overflow-x: auto;} 
	.detail form {width: 990px; overflow: hidden;}
	.detail .section {margin-bottom: 15px;}
	.detail .section h2 {font-size: 15px; font-weight: normal; margin-bottom: 10px;}
	.imgArea {width: 860px; min-height: 197px; border: 1px solid #ddd;padding:5px;box-sizing: border-box;}
	.imgArea img {max-height:197px;}
	.uploadDiv {margin-bottom:15px;}
	.adminContent .search .uploadDiv {width:860px;}
	.adminContent .search .uploadDiv  .textDiv {float:none;margin-bottom:5px;}
	.tempView {border:1px solid #ddd;padding:5px;box-sizing:border-box;}
	.imgListDiv {position: relative;}
	.imgListDiv .mask {position: absolute; background: #0000006e; width: 100%; height: 100%; top: 0;display: none;}
	.imgListDiv:hover .mask{display: block;}
	.imgListDiv .mask span {font-size: 45px; color: red; position: absolute; top: 50%; left: 50%; margin-top: -30px; margin-left: -17px; cursor: pointer;}
</style>