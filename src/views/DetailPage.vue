<template>
  <div>
    <Header></Header>
    <Branches></Branches>
    <Commits></Commits>
    <Issues></Issues>
  </div>
</template>

<script>
import Branches from "../components/Branches";
import Commits from "../components/Commits";
import Issues from "../components/Issues";
import Header from "../components/Header";

export default {
  components: {
    Branches,
    Commits,
    Issues,
    Header,
  },
};
</script>

<style scoped lang="scss"></style>
