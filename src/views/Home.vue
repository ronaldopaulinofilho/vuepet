<template>
  <div class="home">
    <img id="logo" src="../assets/vue-dog.jpg" />
    <img src="../assets/Vuepet.jpg" />

    <p class="card-text">
      Bem vindo(a) a plataforma online e reativa de cadastros e cuidados de Pets
      na Web.<br />
      Por favor, escolha uma opção abaixo:
    </p>

    <el-row :gutter="12">
      <el-col :span="12">
        <el-card class="card" shadow="hover">
          <h2>Pesquisa</h2>
          <p>
            Encontre um pet pesquisando por nome.
            <br />
            <el-button
              class="button"
              @click="goToSearch"
              icon="el-icon-search"
            ></el-button>
          </p>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="card" shadow="hover">
          <h2>Novo Cadastro</h2>
          <p>
            Não encontrou um pet? Você pode cadastrar um novo pet clicando aqui
            <br />
            <el-button
              class="button"
              @click="goToForm"
              icon="el-icon-edit"
            ></el-button>
          </p>
        </el-card>
      </el-col>
    </el-row>
    <p>
      Deixe sua avaliação <br />
      <el-rate v-model="value2" :colors="colors"> </el-rate>
    </p>
    <el-carousel :interval="8000" type="card" height="300px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h4 class="medium">
          <img src="../assets/dog2.jpg" class="image" />
        </h4>
      </el-carousel-item>
    </el-carousel>
    <el-footer class="footer">
      <p>
        <br />
        Copyright © 2020, Powered by Vue.JS
      </p>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      value2: "",
    };
  },

  methods: {
    goToSearch() {
      this.$router.push({ path: "/search" });
    },
    goToForm() {
      this.$router.push({ path: "/form" });
    },
  },
};
</script>

<style>
#logo {
  border-radius: 80%;
  height: 150px;
  width: 150px;
}

.home {
  padding: 20px;
  background-color: rgba(255, 255, 255);
}

.card-text {
  background-color: gainsboro;
  padding: 20px;
}
.buttom {
  padding: 20px;
  border-radius: 50%;
}
.el-carousel__item h3 {
  color: #8b95a1;
  opacity: 0.75;
  line-height: 500px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.footer {
  background-color: gainsboro;
  padding: 20px;
  font: 10px;
}
</style>
