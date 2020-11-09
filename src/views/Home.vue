<template>
  <div class="home">
    <Header
      title="Bem vindXs ao Vue Pet Clinic"
      text="A maneira mais fácil e reativa de cadastrar seus Pets na Web"
    ></Header>

    <div class="login-box" v-show="box">
      <div class="row">
        <div class="col-7">
          <el-divider>
            <h6>MINHA CONTA</h6>
          </el-divider>
          <h6>Já é cadastrado em nossa clínica?</h6>
          <h6>
            Por favor, para acessar nosso sistema, digite seu nome de usuário e
            senha fornecidos no momento do cadastro.
          </h6>
        </div>

        <div class="col-5">
          <div class="row">
            <div class="col-8">
              <h6>Usuário:</h6>
              <input v-model="user" type="text" class="form-control" />
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <h6>Senha:</h6>
              <input v-model="password" type="password" class="form-control" />
            </div>
          </div>
          <div class="row mt-2 text center">
            <div class="col-8">
              <el-button
                plain
                @click="doLogin()"
                icon="el-icon-check"
                type="primary"
                >Entrar</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="dashboard">
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
    <google-map />
    <Footer> </Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import GoogleMap from "../components/GoogleMap";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Cards,
    GoogleMap,
  },
  data() {
    return {
      value2: "",
      dashboard: false,
      user: "",
      password: "",
      userValid: [{ user: "user", password: "vuejs" }],
      box: true,
    };
  },
  methods: {
    doLogin() {
      let list = this.userValid.filter((user) => {
        if (user.user === this.user && user.password === this.password)
          return true;
        else return false;
      });
      if (list.length > 0) {
        this.dashboard = true;
        this.box = false;
        this.$notify({
          title: "Sucesso",
          message: "Você está logado",
          type: "success",
        });
      }
    },
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
.login-box {
  padding: 20px;
  margin: 20px;
  background-color: #b0c4de;
  shadow: hover;
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