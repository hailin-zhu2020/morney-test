<template>
  <div>
    <router-view/><!--    组件显示的位置-->
  </div>
</template>


<style lang="scss"> /*不能加scoped,因为App.vue的内容应该影响所有的页面*/
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
body{
  line-height:1.5;
}
a{
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
