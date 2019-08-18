<template>
	<div class="login " :style="{minHeight:height+'px'}">

		<headercontent v-bind:headerTitle = "headerTitle"></headercontent>
		<div class="winPrize">
			<ul class="nav nav-tabs">
				<!-- 所有的JS，例如这里的切换JS写在哪个文件，不明 -->
                <li class="active"><a href="#">分析师登记</a></li>
                <li><a href="#">企业登记</a></li>
			</ul>
			<div class="tab-content">
                <div class="tab-pane active inputDiv">
                	<form id="analystRegister" class="smart-green" :action="analystForm" method="post" enctype="multipart/form-data">
					    <label for="name">姓名</label>
					    <input class="text" id="name" type="text" name="name" placeholder="请填写您的姓名">
					  	<label for="sort">分类</label>
					  	<select class="text" name="type" id="sort">
						    <option :value="item.id" v-for="item in analyst_type_list">{{item.analyst_type}}</option>
					    </select>
					    <label for="sex">性别</label>
					  	<select class="text" name="gender" id="sex">
						    <option value="男">男</option>
						    <option value="女">女</option>
					    </select>
					    <label for="tel">手机</label>
					    <input class="text" id="tel" type="text" name="tel" placeholder="请填写您的手机号码">
					    <label for="email">邮箱</label>
					    <input class="text" id="email" type="email" name="email" placeholder="请填写邮箱号">
					    <label for="wechat">微信号</label>
					    <input class="text" id="wechat" type="text" name="wechat" placeholder="请填写微信号">
					    <label for="company">所在公司</label>
					    <input class="text" id="company" type="text" name="company" placeholder="请填写公司所在公司名称">
              <label for="uploadImg">上传头像<span style="color: red;">(长宽比例1:1)</span></label>
              <div class="text textDiv textDiv1">
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
					    <button type="button" class="btn" @click="submitFun(analystForm,'#analystRegister')">提交</button>
					</form>
                </div>
                <div class="tab-pane inputDiv">
                	<form id="companyRegister" class="smart-green" :action="comnpanyForm" method="post" enctype="multipart/form-data">
					    <label for="companyName">企业名称 </label>
					    <input class="text" id="companyName" type="text" name="name" placeholder="请填写您的企业名称">
					  	<label for="sort">分类</label>
					  	<select class="text" name="type" id="sort2">
						    <option :value="item.id" v-for="item in company_type_list">{{item.company_type}}</option>
					    </select>
					    <label for="companyTel">手机</label>
					    <input class="text" id="companyTel" type="text" name="register_tel" placeholder="请填写您的手机号码">
					    <label for="companyEmail">邮箱</label>
					    <input class="text" id="companyEmail" type="email" name="register_email" placeholder="请填写邮箱号">
					    <label for="companyWechat">微信号</label>
					    <input class="text" id="companyWechat" type="text" name="register_wechat" placeholder="请填写微信号">
              <label for="uploadImg">上传头像<span style="color: red;">(长宽比例1:1)</span></label>
              <div class="text textDiv textDiv2">
                {{inputText2}}
                <input type="file" id="uploadImg2" name="img" accept="image/*">
              </div>
              <div style="max-width:150px;max-height:152px;overflow: hidden;" v-show="img2">
                <img class="upload" v-lazy="img2" v-if="img2" v-show="croppaFlag2" style="max-width:100%"/>
                <croppa v-model="croppa2" v-show="!croppaFlag2"
                        :width="150"
                        :height="150"
                        :initial-image="initialImage2"
                        placeholder="点击选择图片"
                        :placeholder-font-size="12"
                        :show-loading="showDefaultSpinner2">
                  <div class="spinner" v-if="croppa2 && croppa2.loading"><img src="../assets/img/loading.gif" alt="" /></div>
                </croppa>
              </div>
              <button type="button" class="btn" @click="submitFun(comnpanyForm,'#companyRegister')">提交</button>
					</form>
                </div>
           </div>
		</div>
		<footercontent v-once></footercontent>
	</div>
</template>
<script>
	import headercontent from './header'
	import footercontent from './footer'
	export default {
  		name: 'WinPrize',
  		components:{headercontent,footercontent},
  		data() {
			return {
				headerTitle: "报名登记",
				comuploadText:"点击选择图片",
				analyuploadText:"点击选择图片",
				comimgUrl:"",
				analyimgUrl:"",
				comnpanyForm:"",
				analystForm:"",
				domain:"",
				height:450,
				company_type_list:[],
				analyst_type_list:[],
        img:"",
        img2:"",
        inputText:"点击选择图片",
        inputText2:"点击选择图片",
        croppaFlag:true,
        croppa: {},
        showDefaultSpinner: false,
        initialImage:null,
        fileSize:"",
        fileName:"",
        fileType:"",
        croppaFlag2:true,
        croppa2: {},
        showDefaultSpinner2: false,
        initialImage2:null,
        fileSize2:"",
        fileName2:"",
        fileType2:""
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
				_this.comnpanyForm = _this.domain+'company/register_company';
				_this.analystForm = _this.domain+'analyst/register_analyst';

				_this.$axios.get(_this.domain+'analyst/analyst_type_list').then(function(res) {
					_this.analyst_type_list = res.data.data;
				}).catch(function(error) {
					console.log(error);
				});

				_this.$axios.get(_this.domain+'company/company_type_list').then(function(res) {
					_this.company_type_list = res.data.data;
				}).catch(function(error) {
					console.log(error);
				});
				$(".nav-tabs li a").on("click",function(){
					var current = $(this).parent().index();
					$(".nav-tabs li").removeClass("active").eq(current).addClass("active");
					$(".tab-content .tab-pane").removeClass("active").eq(current).addClass("active");
					return false;
				});

        $(".textDiv1 input").on("change",function(){
          var item = $(this);//exp
          var obj = item[0].files[0];
          _this.viewImg(obj,item);
        });
        $(".textDiv2 input").on("change",function(){
          var item = $(this);//exp
          var obj = item[0].files[0];
          _this.viewImg2(obj,item);
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
        console.log(_this.img)
      },
      viewImg2(obj,item){
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
          _this.fileSize2 = obj.size / 1024;
          if(_this.fileSize2 > 200){
            _this.croppaFlag2 = false;
            var image = new Image();
            image.src = objTempUrl;
            _this.initialImage2 = image;
            _this.croppa2.refresh();
          }else{
            _this.croppaFlag2 = true;

          }
          _this.fileType2 = obj.type;
          _this.inputText2 = obj.name;
          _this.img2 = objTempUrl;
          _this.fileName2 = obj.name;
        }else{
          _this.inputText2 = '点击选择图片';
          _this.img2 = '';
          _this.fileSize2 = "";
          _this.fileName2 ="";
          _this.fileType2 = "";
          _this.croppaFlag2 = true;
        }
        console.log(_this.img2)
      },
			submitFun(url,item){
				var _this = this;

				var form=$(item)[0];

				var upLoadData =new FormData(form);//explain the data here
				console.log(upLoadData);
				$(".dialogContent .usualMessage").empty().append('<div class="dropload-load"><span>正在处理,请稍后</span></div>');
				_this.openDialog();

				let config = {
		            headers:{'Content-Type':'multipart/form-data'}
		        };
		        _this.$axios.post(url,upLoadData,config).then(res=>{

		            var tempData = res.data;
					if(tempData.result == "1"){
						$(".dialogContent .usualMessage").empty().append('<span style="color:red">'+tempData.error+'</span>');
					}else if(tempData.result == "0"){
						$(".dialogContent .usualMessage").empty().append(tempData.data);
					}
					_this.disapperPop();
		        }).catch(function(error) {
					console.log(error);
					$(".dialogContent .usualMessage").empty().append('<span style="color:red">登记失败</span>');
					_this.disapperPop();
				});

				return false;
			}
		}

	}
</script>
<style>
.winPrize {padding: 15px; border-top: 1px solid #ddd; background: #ffff;font-size:1.2em;color:#666;}
.nav-tabs{margin-bottom: 15px;}
.nav-tabs{border-bottom: 1px solid #ddd;}
.nav-tabs > li{float: left; margin-bottom: -1px;}
.nav-tabs > li > a{margin-right: 2px; line-height: 1.42857; border: 1px solid transparent; border-radius: 2px 2px 0 0; outline: none; display: block; padding: 10px 15px;color:#666;}
.nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus{color: #F30401; background-color: #fff; border: 1px solid #ddd; border-bottom-color: transparent; cursor: default;}
.nav:before, .nav:after{content: " "; display: table;}
.nav:after{clear: both;}
.nav:before, .nav:after{content: " "; display: table;}
.tab-content > .tab-pane{display: none;}
.tab-content > .active{display: block;}
.smart-green .text {margin: 5px 0 10px;}
select.text {width:calc(100% + 2px);text-indent: 4px;}
.inputDiv textarea.text {height:50px;}
.inputDiv .textDiv {position: relative; line-height: 33px; cursor: pointer;padding:0 10px;}
.textDiv input{position: absolute; width: 100%; left: 0; height: 100%; opacity: 0;}
img.upload {width:30%;}
.winPrize .btn {margin-top:20px;}
</style>
