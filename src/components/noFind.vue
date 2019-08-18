<template>
	<div class="">
		<headercontent v-bind:headerTitle = "headerTitle"></headercontent>
		<div class="noPage">
		     还没有开通，敬请期待。
		</div>
		<footercontent v-once></footercontent>		
	</div>
</template>

<script>
	import headercontent from './header'
	import footercontent from './footer'
	export default {
  		name: 'noFind',
  		data(){
			return {
				headerTitle: "",
			}
		},
		components:{headercontent,footercontent},
  		mounted() {
			this.init();
		},
		methods: {
			init(){
				
			}
		}
	}
</script>

<style>
	.noPage { margin: 10px 0px; font-size: 1.4em; background: #fff; padding: 10px; border: 1px solid #ddd; border-right: none; border-left: none;}
</style>