<template>
  <div class="home">
    <Header
      title="Bem vindo (a) ao Vue Pet Clinic"
      text="A maneira mais fácil e reativa de cadastrar seus pets na web"
    ></Header>
    <div class="box-card">
      <h2>Cachorros</h2>
      <el-row :gutter="12">
        <Cards title="Pesquisar" text="Faça uma pesquisa por nome"> </Cards>
        <Cards
          title="Novo Cadastro"
          text="Não encontrou um pet? Você pode cadastrar um novo pet aqui"
        ></Cards>
        <el-col :span="12">
          <el-button
            class="button"
            @click="goToSearchDog"
            type="success"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            class="button"
            @click="goToFormDog"
            type="primary"
            icon="el-icon-plus"
            circle
          ></el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <h2>Veterinários</h2>
      <el-row :gutter="12">
        <Cards title="Pesquisar" text="Faça uma pesquisa por nome"> </Cards>
        <Cards
          title="Novo Cadastro"
          text="Não encontrou um Veterinário? Você pode cadastrar um novo veterinário aqui"
        ></Cards>
        <el-col :span="12">
          <el-button
            class="button"
            @click="goToSearchVet"
            type="success"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            class="button"
            @click="goToFormVet"
            type="primary"
            icon="el-icon-plus"
            circle
          ></el-button>
        </el-col>
      </el-row>
    </div>

    <div class="rate">
      Deixe sua avaliação <br />
      <el-rate v-model="value2" :colors="colors"> </el-rate>
    </div>

    <el-carousel :interval="8000" type="card" height="300px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h4 class="medium">
          <img src="../assets/dog2.jpg" class="image" />
        </h4>
      </el-carousel-item>
    </el-carousel>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Cards,
  },
  data() {
    return {
      value2: "",
    };
  },
  methods: {
    goToSearchDog() {
      this.$router.push({ path: "/search-dog" });
    },
    goToFormDog() {
      this.$router.push({ path: "/form-dog" });
    },
    goToSearchVet() {
      this.$router.push({ path: "/search-vet" });
    },
    goToFormVet() {
      this.$router.push({ path: "/form-vet" });
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  background-color: rgb(255, 255, 255);
}
.box-card {
  padding: 20px;
  margin: 20px;
}
.rate {
  padding: 30px;
  margin: 30px;
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
</style>
