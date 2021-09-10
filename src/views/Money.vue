<template>
  <div class="nav-wrapper">
    <div class="content">
      <p>Money.vue</p>

    </div>
    <Nav/>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
export default {
  name: "Money.vue",
  components: {Nav}
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