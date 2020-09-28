<template>
  <div class="container">
    <h1>
      Page not found.
    </h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.container {
  //solution to make table cell
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  justify-content: space-around;
  h1 {
    text-align: center;
  }
}
</style>
