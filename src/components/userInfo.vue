<template>
	<div class="userInfo " :style="{minHeight:height+'px'}">

		<headercontent v-bind:headerTitle = "headerTitle"></headercontent>
		<div class="winPrize">
			<form id="setUserInfoForm" class="inputDiv smart-green">
				<input type="hidden" name="id" v-model="token"/>
				<label for="phone">手机号</label>
				<input id="phone" type="text" name="phone" class="text" v-model="account" placeholder="请填写您的手机号" disabled>
				<label for="name">昵称</label>
				<input id="name" type="text" name="name" placeholder="请填写您的昵称" class="text" v-model="name">
        <label for="password">密码</label>
        <input id="password" type="password" name="password" placeholder="请填写您的密码" maxlength="8" class="text" v-model="password">
				<label for="uploadImg">上传头像<span style="color: red;">(长宽比例1:1)</span></label>
				<div class="text textDiv">
				{{inputText}}
				<input type="file" id="uploadImg" name="img" accept="image/*">
				</div>
				<div style="max-width:150px;max-height:152px;overflow: hidden;" v-show="img">
					<img class="upload" v-lazy="img" v-if="img" v-show="croppaFlag" style="max-width:100%"/>
					<croppa v-model="croppa" v-show="!croppaFlag"
							:width="150"
		    				:height="150"
					        :initial-image="initialImage"
					        placeholder="点击选择图片"
					        :placeholder-font-size="12"
					        :show-loading="showDefaultSpinner">
					        <div class="spinner" v-if="croppa && croppa.loading"><img src="../assets/img/loading.gif" alt="" /></div>
					 </croppa>
				</div>
				<button type="button" class="btn" @click="submitFun('#setUserInfoForm')">提交</button>
				<!-- explain 这里可以提交整个form的内容？-->
				<button type="button" class="btn" @click="loginOUt">退出登录</button>
			</form>
		</div>
		<footercontent v-once></footercontent>
	</div>
</template>

<script>
	import headercontent from './header'
	import footercontent from './footer'
	export default {
  		name: 'UserInfo',
  		components:{headercontent,footercontent},
  		data() {
			return {
				headerTitle: "我",
				inputText:"点击选择图片",
				domain:"",
				token:null,
				account:"",
				img:"",
				name:"",
        password: '',
				height:450,
				croppaFlag:true,
				croppa: {},
        showDefaultSpinner: false,
        initialImage:null,
        fileSize:"",
        fileName:"",
        fileType:""
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
				// _this.domain = 'http://baixiu.io/Admin/';
				_this.token = _this.getCookie('token');
			    if(_this.token){
			    	$(".loading").show();
			      	_this.$axios.get(_this.domain+'user/get_account_info/token/'+_this.token).then(function(res) {

						  var temData = res.data.data;
						_this.account = temData.tel;
						_this.img = _this.$store.state.baseUrl + temData.thumb;
						// _this.img = 'http://baixiu.io' + temData.thumb;
						_this.name = temData.nickname;
						_this.password = temData.password?temData.password:'';
						$(".loading").hide();
					}).catch(function(error) {
						$(".loading").hide();
						console.log(error);
					});
			    }

				$(".textDiv input").on("change",function(){
					var item = $(this);//exp
					var obj = item[0].files[0];
					_this.viewImg(obj,item);
				});
			},
			viewImg(obj,item){
				var _this = this;
				var objTempUrl = "";
				if(obj){
					if (window.createObjectURL!=undefined) { // normal
		              objTempUrl = window.createObjectURL(obj) ;
		              } else if (window.URL!=undefined) { // firefox
		                objTempUrl = window.URL.createObjectURL(obj) ;
		              } else if (window.webkitURL!=undefined) { // google
		                objTempUrl = window.webkitURL.createObjectURL(obj) ;
		            }
		  			_this.fileSize = obj.size / 1024;
					if(_this.fileSize > 200){
						_this.croppaFlag = false;
			  			var image = new Image();
					    image.src = objTempUrl;
					    _this.initialImage = image;
					    _this.croppa.refresh();
					}else{
						_this.croppaFlag = true;

					}
					_this.fileType = obj.type;
					_this.inputText = obj.name;
		  			_this.img = objTempUrl;
		  			_this.fileName = obj.name;
				}else{
					_this.inputText = '点击选择图片';
			  		_this.img = '';
			  		_this.fileSize = "";
			  		_this.fileName ="";
			  		_this.fileType = "";
			  		_this.croppaFlag = true;
				}
			},
			submitFun(item){
				var _this = this;
				$(".dialogContent .usualMessage").empty().append('<div class="dropload-load"><span>正在处理,请稍后</span></div>');
				_this.openDialog();
		      	// croppahttp://www.bslxx.com/m/view.php?aid=1649
		        if(!_this.croppaFlag){
		        	_this.croppa.generateBlob((blob) => {
						_this.axiosFun(blob);
					}, _this.fileName, 0.9)
		        }else{
		        	var file = $("#uploadImg")[0].files[0];
		        	_this.axiosFun(file);
		        }
				return false;
			},
			loginOUt(){
				var _this = this;
				_this.delCookie('token');
				_this.$router.go(-1);
			},
			axiosFun(blob){
				var _this = this;
        var reg = /^[0-9a-zA-Z]+$/;
				let config = {
		            headers:{'Content-Type':'multipart/form-data'}
		        };

		        let param = new FormData();
		        if(_this.fileName != ""){
		        	param.append('img',blob,_this.fileName);
		        }
            if(_this.name == ''){
              $(".dialogContent .usualMessage").empty().append('<span style="color:red;">请输入昵称</span>');
              return false
            }
            if(_this.password == '' || !reg.test(_this.password)){
              $(".dialogContent .usualMessage").empty().append('<span style="color:red;">请输入正确的密码</span>');
              return false
            }
		        param.append('tel',_this.account);
		        param.append('token',_this.token);
		        param.append('nickname',_this.name);
            param.append('password',_this.password);
            // console.log(param)
		        _this.$axios.post(_this.domain + 'user/update_account_info',param,config).then(res=>{
					var tempData = res.data;
					if(tempData.result == "1"){
						$(".dialogContent .usualMessage").empty().append('<span style="color:red">'+tempData.error+'</span>');
					}else if(tempData.result == "0"){
						$(".dialogContent .usualMessage").empty().append('<span style="color:red">'+tempData.error+'</span>');
						// $(".dialogContent .usualMessage").empty().append(tempData.data);
					}
					//  此处返回有问题
					_this.disapperPop();
		        }).catch(function(error) {
					console.log(error);
					$(".dialogContent .usualMessage").empty().append('<span style="color:red">修改失败</span>');
					_this.disapperPop();
				});
			}
		},
    watch:{
      password(val){
        var str = val.length>0?val.replace(/\s*/g,""):'';
        this.password = str;
      },
      name(val){
        var str = val.length>0?val.replace(/\s*/g,""):'';
        this.name = str;
      }
    }
	}
</script>
<style>
	.spinner{position: absolute;left:0px;top:0px;background:#fff;width: 100%; height: 100%;}
	.spinner img {position: absolute;left:0px;top:0px;margin:-16px 0 0 -16px;}
	.croppa-container {border:1px solid #ddd;}
</style>
