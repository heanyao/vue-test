<template>
	<div class="indexSection ">
		<voteTop v-bind:type = "type"></voteTop>
		<div class="section">
			<div class="sectionTit first">金融企业投票</div>
			<div class="sectionContent">
				<companyVoteType v-once></companyVoteType>
			</div>
		</div>
		<companyDirect></companyDirect>
		<footercontent v-once></footercontent>
	</div>
</template>
<script>
	import voteTop from './voteTop'
	import companyVoteType from './companyVoteType'
	import companyDirect from './companyDirect'
	import footercontent from './footer'
	export default {
  		name: 'companyTypeList',
  		data() {
			return {
				type: "1",
			}
		},
  		components:{voteTop,companyVoteType,companyDirect,footercontent},
	}
</script>
