<template>
  <div class="grid-container theme-color">
    <div class="item">
      <h1>404</h1>
      <p>Page not found</p>
      <VLink href="/scoreboard/">Return home.</VLink>
    </div>
  </div>
</template>
<style scoped>
.theme-color {
  background-color: #1c75bc;
  color: white;
}
a {
  color: white;
}
h1 {
  font-size: 300%;
}
.grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
.item {
  grid-column: 2;
  grid-row: 2;
}
</style>
<script>
  import VLink from '../components/VLink'
  export default {
    components: {
      VLink
    }
  }
</script>
