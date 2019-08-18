<template>
	<div class="indexSection ">
		
		<voteTop v-bind:type = "type"></voteTop>
		<analysttype></analysttype>
		<analystRecommend></analystRecommend>
		<footercontent v-once></footercontent>
	</div>
</template>
<script>
	import voteTop from './voteTop'
	import analysttype from './analysttype'
	import analystRecommend from './analystRecommend'
	import footercontent from './footer'
	export default {
  		name: 'analystTypeList',
  		data() {
			return {
				type: "2",
			}
		},
  		components:{voteTop,analysttype,analystRecommend,footercontent},
	}
</script>
