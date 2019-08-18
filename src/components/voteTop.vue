<template>
<div>
 	<bannerSlider v-once></bannerSlider>
  <form class="searchCompany" action="#" method="get">
    <table border="0" cellspacing="0" cellpadding="0" style=" width: 98%; margin: 0 auto;">
      <tr>
        <td class="ImgTd">
        	<img class="imgBtn userinfoBtn" src="../assets/img/userIco.png" alt="" />
        </td>
        <td>
          <div class="searchInput" style="width:90%;margin:0px auto;">
            <input class="text" type="text" v-model="searchName" name="name" v-bind:placeholder="type==1?'请输入企业名':'请输入人名'"/>
            <img src="../assets/img/it@2x.png" alt="" class="ico" />
          </div>
        </td>
        <td class="ImgTd"><img class="imgBtn" src="../assets/img/xiaoxi@2x.png" alt="" /></td>
      </tr>
    </table>
  </form>
  <div id="searchResult" style="display: none;" v-if="searchData.length">
  	以为为搜索结果列表, 请点击相应的类型:
  	<ul style="margin-top:10px;">
  		<li v-for="item in searchData">
  			<router-link :to="{ name: formLinkTo, params: { id: item.id,search:_this.searchName}}">{{item.type}}</router-link>
  		</li>
  	</ul>
  </div>
  <div class="divDialog">
			<h4 class="dialogTitle">系统信息</h4>
			<div class="dialogContent">
				<div class="usualMessage"></div>
			</div>
			<div class="dialogClose">取消</div>
		</div> 
</div>
</template>

<script>
  import bannerSlider from './bannerSlider'
  export default {
      name: 'voteTop',
      props:{
      type:{
        type:String,
        required:true
      }
    },
    data() {
        return {
          inputType:"",
          searchName:"",
          formLinkTo:"",
          searchData:[],
      	  formLinkId:"",
      	  domain:""
        }
      },
      mounted() {
      this.init();
    },
    components:{bannerSlider},
    methods: {
       init(){
        var _this = this;
        _this.domain = _this.$store.state.domain;
        
        if(_this.type == "1"){
          _this.inputType = "请输入正确的企业名";
          _this.formLinkTo = "CompanyVote"
        }else{
          _this.inputType = "请输入正确的人名";
          _this.formLinkTo = "AnalystVote";
        }
//jq内可以用vue的data?oldValue含义
         $(".searchCompany input.text").on("focus",function(){
          var obj = $(this);
          var oldValue = obj.val();
          var timeId = setInterval(function(){            
            var currenceValue = obj.val();
            if(currenceValue == oldValue && currenceValue != ''){
              _this.searchFormSubmit(_this.domain);
              clearInterval(timeId);
              obj.blur();
              obj.val("");
            }else{
              oldValue = obj.val();
            }
          },800);
        });
       },
       searchFormSubmit(domain){
        var _this = this;
        var pat=new RegExp("[^a-zA-Z0-9\-\_\ \u4e00-\u9fa5]","i");   //explain
        _this.openDialog();
          if(pat.test(_this.searchName)==true){
            $(".usualMessage").empty().append('<span style="color:red">'+_this.inputType+'</span>');
            _this.disapperPop();
          return false;   
          }else{
            $(".usualMessage").empty().append('<div class="dropload-load"><span>正在为亲加载</span></div>');
            _this.$axios.get(domain + 'analyst/search/type/1/name/'+_this.searchName+'/type_id/' + _this.type).then(function(res) {
            var tempData = res.data.data.data;
            console.log(tempData);
          	if(tempData.length>0){
          		if(tempData.length == 1){
                _this.closeDialog();
                // console.log(_this.formLinkTo);
                //这里的type_id是公司里面的分类，如果多个分类同时有类似的则取第一个分类
                // _this.$router.push({ name: _this.formLinkTo, params: { id:tempData[0].type_id, search:_this.searchName}});
                _this.$router.push({ name: _this.formLinkTo, params: { id:tempData[0].type, search:_this.searchName}});
                
          			
          		}else if(tempData.length > 1){
          			_this.searchData = tempData;
	          		_this.$nextTick(()=>{ //explain
						      	$(".usualMessage").empty().append($("#searchResult").html());
						  	});	
          		}
          	}else{
          		$(".usualMessage").empty().append('<span style="color:red">未搜索到结果</span>');
          		 _this.disapperPop();
          	}
          }).catch(function(error) {
            console.log(error);
            $(".usualMessage").empty().append('<span style="color:red">'+_this.inputType+'</span>');
             _this.disapperPop();
          });
          
          }
      }
    }
  }
</script>