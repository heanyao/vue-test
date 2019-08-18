<template>
<div class="">

	<div class="login" id="login" :style="{minHeight:height+'px'}">
	    <div class="log-bg">
	        <div class="log-logo">Welcome!</div>
	    </div>
	    <div class="log-phone">
	    	<form class="loginForm" action="" v-show="usePassword">
	    		<div class="inputDiv">
		    		<img class="ico" src="../assets/img/call20.png" alt="" />
		    		<input class="text" name="phone" type="text" :class="!checkPhone?'error':''" placeholder="请输入您的手机号"  v-model="phone">
		    	</div>
          <div class="inputDiv">
            <img class="ico" src="../assets/img/unlock17.png" alt="" />
            <input class="text" name="password" type="password" maxlength="8" :class="!checkPassword?'error':''" placeholder="请输入您的密码" v-model="password ">
          </div>
          <div style="color: red" @click="usePassword = false">新注册或验证码登录</div>
	    	</form>
        <form class="loginForm2" action="" v-show="!usePassword">
          <div class="inputDiv">
            <img class="ico" src="../assets/img/call20.png" alt="" />
            <input class="text" name="phone" type="text" :class="!checkPhone?'error':''" placeholder="请输入您的手机号"  v-model="phone">
          </div>
          <div class="inputDiv" >
            <img class="ico" src="../assets/img/unlock17.png" alt="" />
            <input class="text" name="code" type="text" :class="!checkCode?'error':''" placeholder="请输入短信验证码" v-model="code " style="width:68%">
            <button type="button" class="btn r getCodeBtn" :class="!btnFlag?'color_999':''" @click="getCode" style="width:28%">{{btnText}}</button>
          </div>
          <div style="color: red" @click="usePassword = true">密码登录</div>
        </form>
	        <div class="inputDiv">
	        	<button type="button" class="btn" @click="login">登陆</button>
	        </div>
	    </div>
	    <div class="loginBtn">
			<span class="title"><span>第三方账号登陆</span></span>
			<a class="icon-qq"></a>
			<a class="icon-wechat"></a>
		</div>
	</div>
	<div class="divDialog">
		<h4 class="dialogTitle">系统消息</h4>
		<div class="dialogContent">
			<div class="usualMessage">
			</div>
		</div>
		<div class="dialogClose">取消</div>
	</div>
</div>

</template>

<script>
export default {
  name: 'Login',
  data(){
  	return {
  		phone: '',
  		code : '',
  		checkPhone:true,
  		checkCode:true,
  		checkPassword:true,
  		btnFlag:true,
  		btnText:"获取验证码",
  		time:60,
  		height:450,
  		domain:"",
  		firstLogin:"",
      usePassword: true, //默认密码登录
      password: ''
  	}
  },
   mounted() {
		this.init();
	},
  methods:{
  	init(){
  		var _this = this;

  		_this.domain = _this.$store.state.domain;
  		_this.height = window.innerHeight;//explain

  		$(".divDialog .dialogClose").on("click",function(){
  			_this.checkPhone = true;
  			if(_this.usePassword){
          _this.checkPassword = true;
        }else{
          _this.checkCode = true;
        }
  		});
  	},
  	getCode(){
  		var _this = this;
  		if(_this.btnFlag && _this.checkPhoneFun()){
  			$(".dialogContent .usualMessage").empty().append('<div class="dropload-load"><span>正在获取短信验证码请稍后</span></div>');
  			_this.openDialog();
  			var postData = {phone: _this.phone};
  			_this.$axios.get(_this.domain+'login/getCode/phone/'+_this.phone).then(function(res) {
				var tempData = res.data;
				// console.log(tempData);
  				if(tempData.result == "0"){
  					_this.time = tempData.effective_time;
  					_this.firstLogin = tempData.result;
	  				_this.btnText = _this.time+"s";
	  				var indexTime = null;
	  				$(".dialogContent .usualMessage").empty().append('<span style="color:red;">'+tempData.msg+'</span>');
	  				_this.btnFlag = false;
	  				indexTime = setInterval(()=>{
	  					if(_this.time > 0){
	  						_this.time--;
	  						_this.btnText = _this.time+"s";
	  					}else{
	  						clearInterval(indexTime);
	  						_this.btnFlag = true;
	  						_this.btnText = "获取验证码";
	  					}

	  				},1000);
  				}else if(tempData.result == "1"){
  					$(".dialogContent .usualMessage").empty().append('<span style="color:red;">'+tempData.error+'</span>');
  					_this.btnFlag = true;
	  				_this.btnText = "获取验证码";
  				}else{
  					$(".dialogContent .usualMessage").empty().append('<span style="color:red;">验证码出现未名错误,请联系客服</span>');
  				}
  				_this.disapperPop();
			}).catch(function(error) {
				$(".dialogContent .usualMessage").empty().append('<span style="color:red;">验证码获取出现小问题,请联系客服</span>');
				_this.btnFlag = true;
	  			_this.btnText = "获取验证码";
				console.log(error);
				_this.disapperPop();
			});
		}
  	},
  	checkPhoneFun(){
  		var _this = this;
  		if(_this.phone =='' || !/^1\d{10}$/.test(_this.phone)){
			  $(".dialogContent .usualMessage").empty().append('<span style="color:red;">请输入正确手机号</span>');
			  _this.disapperPop();
  			_this.checkPhone = false;
  			_this.openDialog();
  			return false;
  		}else{
  			return true;
  		}
  	},
  	checkCodeFun(){
  		var _this = this;
  		if(_this.code == '' || !/^\d{6}$/.test(_this.code)){
			  $(".dialogContent .usualMessage").empty().append('<span style="color:red;">请输入正确的短信验证码</span>');
			  _this.disapperPop();
  			_this.checkCode = false;
  			_this.openDialog();
  			return false;
  		}else{
  			return true;
  		}
  	},
    checkPasswordFun(){
      var _this = this;
      var reg = /^[0-9a-zA-Z]+$/;
      if(_this.password == '' || !reg.test(_this.password)){
        $(".dialogContent .usualMessage").empty().append('<span style="color:red;">请输入正确的密码</span>');
        _this.checkPassword = false;
        _this.openDialog();
        return false;
      }else{
        return true;
      }
    },
  	// 登录逻辑
  	login(){
  		var _this = this;
  		if(_this.usePassword){ //密码登录
        if(_this.checkPhoneFun() && _this.checkPasswordFun()){
          $(".dialogContent .usualMessage").empty().append('<div class="dropload-load"><span>正在登录请稍后</span></div>');
          _this.openDialog();
          _this.toLogin();
        }
      }else { //短信登陆
        if(_this.checkPhoneFun() && _this.checkCodeFun()){
          $(".dialogContent .usualMessage").empty().append('<div class="dropload-load"><span>正在登录请稍后</span></div>');
          _this.openDialog();
          _this.toLogin();
        }
      }
		},
		//notice

	  //登录请求  密码  password 修改

  	toLogin(){
		  var _this = this;
		  var formData = _this.usePassword?$(".loginForm").serialize():$(".loginForm2").serialize();
		  var loginfunc = _this.usePassword?'login':'byCode';

  		_this.$axios.post(_this.domain+'login/'+loginfunc,formData).then(function(res) {
		var tempData = res.data;
        if(tempData.result == "0"){
            let expireDays = 1000 * 60 * 60 * 24 * 5;
            _this.setCookie('token', tempData.data.token, expireDays);
            _this.closeDialog();
            if(_this.firstLogin == "0"){
              _this.$router.push({ name: 'UserInfo', params: { token: tempData.data.token }});
            }else{
              _this.$router.go(-1);
            }
        }else if(tempData.result == "1"){
          $(".dialogContent .usualMessage").empty().append('<span style="color:red;">'+tempData.msg+'</span>');
        }
        _this.disapperPop();
      }).catch(function(error) {
        $(".dialogContent .usualMessage").empty().append('<span style="color:red;">登陆失败,请重试</span>');
        console.log(error);
        _this.disapperPop();
      });
  	},
  },
  watch:{
    password(val){
      var str = val.length>0?val.replace(/\s*/g,""):'';
      this.password = str;
    }
  }
}
</script>

<style>
.login,.userInfo{background: #fff;}
.log-logo{height: 80px;text-align: center; color: red; font-weight: bold; font-size: 40px;line-height:80px;padding-top:60px;}
.log-phone {padding:15px;}
.log-text{color: #57d4c3; font-size: 13px; text-align: center; margin: 0 auto;}
.inputDiv {width: 100%; margin: 15px 0;position: relative;}
.inputDiv .ico {position: absolute; width: 20px; top: 6px; left: 5px;}
input.text, textarea.text{padding:10px;}
textarea.text{overflow: hidden;}
.text {color: #999;outline: none; width: 100%; height: 35px; border: 1px solid #ddd;border-radius: 5px;box-sizing: border-box;background:#fff;}
.inputDiv .btn {height: 33px; background: red; color: #fff; border: none; border-radius: 5px; width:100%;outline:none;font-size:1.23em;}
.loginBtn a { position: relative; display: inline-block; width: 40px; height: 40px; font-size: 25px; border-radius: 50%; line-height: 40px; border: 1px solid red; color: red; text-align: center; vertical-align: middle; transition: background 0.6s ease-out 0s; font-family: socialshare!important; margin: 0px 20px;}
.loginBtn a.icon-qq:before{content: "\F11A";}
.loginBtn a.icon-wechat:before{content: "\F09A";}
.loginBtn {width: 70%; margin: 0px auto; border-top: 1px solid #ddd; padding-top: 35px; position: relative;text-align:center;margin-top: 35px;}
.loginBtn .title { position: absolute; color: #999; font-size: 1.5em; top: -9px; width: 100%; text-align: center;left:0;}
.title span {background:#fff;padding:0 15px;}
.inputDiv .error {border-color:red;}
.log-phone .btn.color_999 {background:#999;}
#login .text {text-indent: 16px;}
</style>
