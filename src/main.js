// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import Share from 'vue-social-share'
import Croppa from 'vue-croppa'
import axios from 'axios' 

Vue.config.productionTip = false

Vue.use(Croppa)

Vue.use(Share)
//状态管理
Vue.use(Vuex)

Vue.use(VueLazyload, {
  error: '../static/images/loading-2.gif',
  loading: '../static/images/loading-2.gif'
});

//Vuex配置
const store = new Vuex.Store({
  state: {
    // domain:'http://www.ceofx.com/laravel54/public/index.php/', //保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）http://106.14.194.66/laravel54/public/index.php/
    // domain:'http://baixiu.io/Admin/',
    domain:'http://www.imoneyexpo.com.cn/Admin/',
    // baseUrl:'http://www.ceofx.com',
    // baseUrl:'http://baixiu.io',
    baseUrl:'http://www.imoneyexpo.com.cn',
    indexClass:"frontContainer",
    bannerList:[],
    companyVoteList:[],
    analystVoteList:[],
    recommendCompany:[],
    analystArray:[]
  },
  mutations: {
    //更新state信息
    updateIndexClass(state, newData) {
      state.indexClass = newData;
    },
    updateBannerList(state, newData) {
      state.bannerList = newData;
    },
    updateCompanyVoteListt(state, newData) {
      state.companyVoteList = newData;
    },
    updateAnalystVoteList(state, newData) {
      state.analystVoteList = newData;
    },
    updateRecommendCompany(state, newData) {
      state.recommendCompany = newData;
    },
    updateAnalystArray(state, newData) {
      state.analystArray = newData;
    },
  }
});

var star = 0, end = 0;
axios.interceptors.request.use(function(config){
	  star++;
	  if(star == 2){
			$(".loading").show();
		}
    return config  
},function(err){  
    return Promise.reject(err)
});  
axios.interceptors.response.use(function(response){  
	  end++
    if(star == end){
    	$(".loading").hide();
    	star = 0; end = 0;
    }
    return response  
},function(err){  
		end++
    if(star == end){
    	$(".loading").hide();
    	star = 0; end = 0;
    }
    return Promise.reject(err)  
}); /*页面中有超过2个以上的接口调用时显示loading层*/

Vue.prototype.$axios = axios;/*axios不能用Vue.use(axios)设置全局变量*/

//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }

function disapperPop(){
  var _this = this;//explain
    var timer = setTimeout(()=>{
    closeDialog();
    clearTimeout(timer);
  },1000);
}

Vue.prototype.disapperPop = disapperPop;

function openDialog(){
  $(".usualMessage").show();
  $(".dialogTitle").empty().append("系统消息");
  $(".dialogMask").fadeIn();
  $(".divDialog").fadeIn();
}

Vue.prototype.openDialog = openDialog;

function closeDialog(){
  $(".dialogMask").fadeOut();
  $(".divDialog").fadeOut();
}

Vue.prototype.closeDialog = closeDialog;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  watch:{
    "$route" : 'changeIndexClass'
  },
  created() {
    this.changeIndexClass();
  },
  /* unknown2 */
  methods:{
    changeIndexClass(){
      var _this = this;
      if(_this.$route.name.indexOf('adminCom') != -1){
        // console.log(_this.$route);
        _this.$store.commit('updateIndexClass',"adminContainer");
      }else if(_this.$store.state.indexClass == "adminContainer"){
        // console.log(_this.$route);
        _this.$store.commit('updateIndexClass',"frontContainer");
      }
    }
  },
});