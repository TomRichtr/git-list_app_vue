<template>
  <div class="fixed-top header-wrapper ">
    <HeaderS></HeaderS>
    <HeaderML></HeaderML>
  </div>
</template>

<script>
import HeaderS from "./HeaderS";
import HeaderML from "./HeaderML";
export default {
  components: {
    HeaderS,
    HeaderML,
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.header-wrapper {
  border-bottom: solid 1px $dark;
  &:hover {
    cursor: pointer;
  }
}
</style>
