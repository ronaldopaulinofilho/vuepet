<template>
  <div class="header">
    <el-header></el-header>
    <img id="logo" src="../assets/vue-dog.jpg" @click="logOff" />
    <img id="initial" src="../assets/Vuepet.jpg" @click="logOff" />
    <el-button type="success" plain icon="el-icon-phone">
      <a
        href="https://api.whatsapp.com/send?phone=5551999999999&text=Por%20favor%2C%20Deixe%20sua%20mensagem%20que%20logo%20retornaremos."
        target="_blank"
        >FALE CONOSCO</a
      >
    </el-button>
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
    route: String,
  },
  data() {
    return {
      routify: this.route,
    };
  },
  methods: {
    logOff() {
      this.$router.push(this.routify);
      this.$router.push(this.route);
    },
  },
};
</script>

<style scoped>
#logo {
  cursor: pointer;
  margin: 10px;
  height: 180px;
  width: 150px;
  animation: go-back 5s alternate;
}
@keyframes go-back {
  from {
    transform: translateX(150px);
  }
  to {
    transform: translateX(0px);
  }
}

#initial {
  height: 150px;
}
.el-header {
  background-color: #b3c0d1;
}
.card-text {
  font-size: 14px;
  color: white;
  background-color: #b3c0d1;
  padding: 20px;
  font-family: "Tahoma", "Geneva", "Verdana", "sans-serif";
}
</style>
