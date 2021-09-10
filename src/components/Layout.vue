<template>
  <div class="nav-wrapper">
    <div class="content">
     <slot/>
<!--插槽，接受引用该组件的组件传过来的内容-->
    </div>
    <Nav/>
  </div>
</template>

<script>
export default {
  name: "Layout.vue"
}
</script>

<style scoped>
.nav-wrapper{
  border:1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content{
  flex-grow: 1;/*尽可能占最大高度*/
  overflow: auto;
  border:1px solid blue;
}
</style>