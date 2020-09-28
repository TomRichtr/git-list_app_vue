<template>
  <div class="main-wrapper">
    <div class="row">
      <div class="col-sm-2"></div>

      <div class="col-sm">
        <div class="row personal-photo-wrapper">
          <img
            class="personal-photo"
            src="../Assets/perfonal-foto.jpg"
            alt="personal photograph"
          />
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
            <!-- a tags as nav -->
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

<style scoped lang="scss">
@import "../../scss/variables.scss";

.personal-photo {
  //shortier
  margin-top: $xl-size;
  margin-bottom: $xl-size;
  min-height: 150px;
  min-width: 120px;
  height: 15%;
  width: 15%;
  border-radius: $l-size;
  // mobile first
  @media (max-width: $sm) {
    margin-top: $m-size;
    margin-bottom: $s-size;
  }
}
.personal-photo-wrapper {
  display: flex;
  justify-content: center;
}
.main-wrapper {
  width: 100%;
  height: 100vh;
  margin-top: $l-size * 1.1;
  @media (max-width: $sm) {
    margin-top: $l-size * 1.3;
  }
}
.column-wrapper {
  text-align: center;
}
.title {
  //fonts in rem
  font-size: $xs-size;
  margin: 0;
  padding: 0;
  color: $dark;
  font-weight: bold;
}
.text-link {
  margin-top: 0;
  margin-bottom: 1rem;
  display: inline-block;
}
</style>
