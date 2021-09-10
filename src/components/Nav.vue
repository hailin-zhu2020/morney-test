<template>
  <div class="nav">
    <router-link to='/money'>记账</router-link>
    |
    <router-link to='/labels'>标签</router-link>
    |
    <router-link to='/statistics'>统计</router-link>

  </div>
</template>
<!--很多页面都要使用这个导航栏，所以把它做成一个组件，供需要使用的页面引用
-->


<script>
export default {
  name: "Nav.vue"
}
</script>

<style lang="scss" scoped> /*scoped表示有范围的，vue会添加一个[data-v-随机字符串]属性，解决了可能存在的重名问题*/
.nav{
  border:1px solid red;
}
</style>