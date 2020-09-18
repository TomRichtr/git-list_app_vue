<template>
  <div>
    <Branches></Branches>
    <Commits></Commits>
    <Issues></Issues>
  </div>
</template>

<script>
import Branches from "../components/Branches";
import Commits from "../components/Commits";
import Issues from "../components/Issues";
export default {
  components: {
    Branches,
    Commits,
    Issues,
  },
};
</script>

<style scoped lang="scss"></style>
