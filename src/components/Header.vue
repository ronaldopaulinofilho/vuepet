<template>
<div class="header">
  <img id="logo" src="../assets/vue-dog.jpg"/>
  <router-link to="/" >HOME</router-link>
  <img  src="../assets/Vuepet.jpg"  />
    <div class="card-text">
     <h2> {{title}} </h2> <br />
      <h5>{{text}}</h5>
      </div>
    
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
  font-size: 14px;
  background-color: gainsboro;
  padding: 25px;
  font-family: 'Tahoma', 'Geneva', 'Verdana', 'sans-serif';
}

</style>