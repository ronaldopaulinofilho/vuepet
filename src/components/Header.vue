<template>
<div class="header">
  <img id="logo" src="../assets/vue-dog.jpg"/>
  <router-link to="/" >HOME</router-link>
  <img  src="../assets/Vuepet.jpg"  />
    <p class="card-text">
      {{title}}<br />
      {{text}}
    </p>
    <img class="img" src="../assets/vet.jpg">
    </div>
</template>

<script>
export default {
    name: "Header",
   props: {
       title: String,
       text: String,
   },
   logOff() {
      this.$router.push({ path: "/" });
    }

}
</script>

<style scoped>
#logo {
  border-radius: 80%;
  border: 1px solid;
  scrollbar-shadow-color: gainsboro;
  margin: 10px;
  height: 150px;
  width: 150px;
}
.card-text {
  font-size: 18px;
  background-color: gainsboro;
  padding: 50px;
}

</style>