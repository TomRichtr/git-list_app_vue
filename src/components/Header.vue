<template>
  <div class="fixed-top header-wrapper ">
    <HeaderSmall></HeaderSmall>
    <HeaderMediumLarge></HeaderMediumLarge>
  </div>
</template>

<script>
import HeaderSmall from "./HeaderSmall";
import HeaderMediumLarge from "./HeaderMediumLarge";
export default {
  components: {
    HeaderSmall,
    HeaderMediumLarge,
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
