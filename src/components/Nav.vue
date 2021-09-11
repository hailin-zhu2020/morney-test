<!--很多页面都要使用这个导航栏，所以把它做成一个组件，供需要使用的页面引用
-->
<template>
  <nav>
<!--  active-class：路由激活-->
    <router-link to='/money' class="item" active-class="selected">
      <Icon  name = 'money'/>
      记账
    </router-link>

    <router-link to='/labels' class="item" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>

    <router-link to='/statistics' class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
     </router-link>

  </nav>
</template>


<script lang='ts'>
export default {
  name: "Nav.vue"
}
</script>

<style lang="scss" scoped> /*scoped表示有范围的，vue会添加一个[data-v-随机字符串]属性，解决了可能存在的重名问题*/
nav{
  display: flex;
  box-shadow: 0 0 3px  rgba(0,0,0,0.25); //阴影的诀窍就是看不出
  flex-direction: row;
  font-size: 12px;
  > .item{
    color: black;
    padding: 2px 0;
    width: 33.33333%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
      .icon{
        width:32px;
        height:32px;
      }
   }
  > .item.selected{
    color:red;
  }
}
</style>