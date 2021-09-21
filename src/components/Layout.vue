<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
<!-- class会合并-->
     <slot/>
<!--插槽，接受引用该组件的组件传过来的内容-->
    </div>
    <Nav/>
  </div>
</template>

<script>
export default {
  props:['classPrefix'],
  name: "Layout.vue"
}
</script>

<style scoped>
.layout-wrapper{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content{
  flex-grow: 1;/*尽可能占最大高度*/
  overflow: auto;
}
</style>