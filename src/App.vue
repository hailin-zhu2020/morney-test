<template>
  <div>
    <router-view/><!--    组件显示的位置-->
  </div>
</template>


<style lang="scss"> /*不能加scoped,因为App.vue的内容应该影响所有的页面*/
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

#app {
  -webkit-font-smoothing: antialiased;//在苹果电脑上有效
  -moz-osx-font-smoothing: grayscale;//在苹果电脑上有效
  color: #333;
  line-height:1.5;
  font-family:$font-hei;
} //多个团队不放body里，放这里；不过所有的标签都要写在这里，不然不会遵循这个要求
//一个人开发的话，可以放到body里


</style>
