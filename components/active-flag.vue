<template>
	<view class="flag">
		{{activeName}}
	</view>
</template>

<script>
	export default {
		props: {
			activeId: {
				type: Number
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			activeName(){
				let name = '';
				switch (this.activeId){
					case 3:
						name = '团购';
						break;
					case 4:
						name = '满减';
						break;
					default:
						break;
				}
				return name;
			}
		}
	}
</script>

<style lang="scss">
.flag {
	color: #807c87;
	font-size: 24upx;
}
</style>
