<template>
  <div class="loading">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
    <path fill="#71acfe" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(275.098 25 25)">
        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </path>
</svg>

  </div>
</template>
<script>
  export default {
    name: 'Loading' // 定义的组件名称 使用时写法：loading
  }
</script>
<style scoped>
  .loading {
    position: fixed;
    left: 49%;
    top: 50%;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
  }
</style>
