<template>
	<div class="">
		
		<headercontent v-bind:headerTitle = "headerTitle"></headercontent>
	</div>
	
</template>

<script>
   	import headercontent from './header'
   	import axios from 'axios'
	export default {
  		name: 'Empty',
  		data(){
			return {
				headerTitle: "跳转页",
			}
		},
		components:{headercontent},
  		mounted() {
	      this.init();
	    },
	    methods: {
	       init(){
		        var _this = this;
		        var typeId = _this.$route.params.id;
		        var path = _this.$route.params.path;
		        var search = _this.$route.params.search;
		        if(search !=  undefined){
		        	_this.$router.replace({ name: path, params: {id:typeId,search:search}});
		        }else{
		        	_this.$router.replace({ name: path, params: {id:typeId}});
		        }
		        
	       },
	      
	    }
  		 
	}
</script>