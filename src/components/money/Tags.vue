<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tags"
}
</script>

<style lang="scss" scoped>
.tags{
  flex-grow: 1; //将剩下的空间全部占满
  font-size:14px;
  padding:16px;
  display: flex;
  flex-direction: column-reverse;
  >.new{
    padding-top: 16px;
    button{
      background: transparent;
      border: none; //原button的border丑，所以要先全去掉
      color: #999;
      border-bottom:1px solid;
      padding:0 4px; //细节
    }
  }
  > .current{
    display: flex;
    flex-wrap: wrap;
    > li{
      background:#d9d9d9;
      $h:24px;
      height:$h;
      border-radius:$h/2;
      padding:0 16px; //不设宽度，用padding撑大
      margin-right: 12px;
      line-height: $h; //确定只有一行的时候，用line-height=height设置垂直居中
    }
  }
}
</style>