<template>
  <svg class="icon">
    <use :xlink:href = "'#'+this.name"/><!--选择用哪个symbol-->
  </svg>
</template>

<script lang="ts">

//将一个目录里面任意后缀的文件统一全部引入当前文件中
// eslint-disable-next-line no-undef
let importAll = (requireContext:__WebpackModuleApi.RequireContext)=>requireContext.keys().forEach(requireContext);
//一次性引入所有的svg图片
try {
  importAll(require.context('../assets/icons',true,/\.svg$/));
}catch(error){
  console.log(error)
}

export default {
  props:['name'],
  name: "Icon.vue"
}
</script>

<style lang="scss" scoped>
.icon{
  width:1em; //em是相对于font-size的倍数
  height:1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>