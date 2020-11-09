<template>
  <div class="header">
    <el-header></el-header>
    <img id="logo" src="../assets/vue-dog.jpg" />
    <img id="initial" src="../assets/Vuepet.jpg" />

    <div class="menu">
      <router-link to="/">HOME</router-link>
      <el-divider></el-divider>

      <el-button type="success" plain icon="el-icon-phone">
        <a
          href="https://api.whatsapp.com/send?phone=5551999999999&text=Por%20favor%2C%20Deixe%20sua%20mensagem%20que%20logo%20retornaremos."
          target="_blank"
          >FALE CONOSCO</a
        >
      </el-button>
    </div>

    <div class="card-text">
      <h2>{{ title }}</h2>
      <h5>{{ text }}</h5>
    </div>

    <img class="img" src="../assets/vet.jpg" />
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
  },
};
</script>

<style scoped>
#logo {
  border-radius: 80%;
  border: 1px solid;
  scrollbar-shadow-color: #b3c0d1;
  margin: 10px;
  height: 150px;
  width: 150px;
}
#initial {
  height: 150px;
}
.el-header {
  background-color: #b3c0d1;
  height: 10px;
}
.card-text {
  font-size: 14px;
  color: white;
  background-color: #b3c0d1;
  padding: 20px;
  font-family: "Tahoma", "Geneva", "Verdana", "sans-serif";
}
.menu {
  padding: 10px;
  margin-left: 1000px;
  height: 50px;
}
</style>