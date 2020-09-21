<template>
  <div class="main-wrapper">
    <div class="row">
      <div class="col-sm-2"></div>

      <div class="col-sm">
        <div class="row personal-foto-wrapper">
          <img class="personal-foto" src="../Assets/perfonal-foto.jpg" alt="" />
        </div>
        <div class="row">
          <div class="col-sm column-wrapper">
            <p class="title">Name</p>
            <p class="text">Tomáš Richtr</p>
            <p class="title">Age</p>
            <p class="text">33</p>
            <p class="title">Location</p>
            <p class="text">Prague</p>
          </div>
          <div class="col-sm column-wrapper">
            <p class="title">GitHub</p>
            <a href="https://github.com/TomRichtr" class="text text-link"
              >https://github.com/TomRichtr</a
            >
            <p class="title">LinkedIn</p>
            <a href="https://www.linkedin.com/in/trichtr" class="text text-link"
              >https://www.linkedin.com/in/trichtr</a
            >
            <p class="title">Personal Website</p>
            <a href="https://tomasr.pythonanywhere.com" class="text text-link"
              >https://tomasr.pythonanywhere.com</a
            >
          </div>
        </div>
      </div>
      <div class="col-sm-2"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.personal-foto {
  margin-top: $xl-size;
  margin-bottom: $xl-size;
  min-height: 150px;
  min-width: 120px;
  height: 15%;
  width: 15%;
  border-radius: $l-size;
  @media (max-width: $breakpoint-s) {
    margin-top: $m-size;
    margin-bottom: $s-size;
  }
}
.personal-foto-wrapper {
  display: flex;
  justify-content: center;
}
.main-wrapper {
  background-color: lighten($color: $primary, $amount: 20%);
  width: 100%;
  height: 100vh;
  margin-top: $l-size * 1.1;
  @media (max-width: $breakpoint-s) {
    margin-top: $l-size * 1.3;
  }
}
.column-wrapper {
  text-align: center;
}

.title {
  font-size: $xs-size;
  margin: 0px;
  padding: 0px;
  color: $dark;
  font-weight: bold;
  font-family: "Roboto Condensed", sans-serif;
}

.text-link {
  margin-top: 0;
  margin-bottom: 1rem;
  display: inline-block;
}
</style>
