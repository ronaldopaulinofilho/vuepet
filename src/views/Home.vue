<template>
  <div class="home">
    <div class="container-fluid">
      <Header
        title="Bem vindXs ao Vue Pet Clinic"
        text="A maneira mais fácil e reativa de cadastrar seus Pets na Web"
        route="/"
      ></Header>

      <div class="login-box" v-show="box">
        <div class="row">
          <div class="col-7">
            <el-divider>
              <h6>MINHA CONTA</h6>
            </el-divider>
            <h6>Já é cadastrado em nossa clínica?</h6>
            <h6>
              Por favor, para acessar nosso sistema, digite seu nome de usuário
              e senha fornecidos no momento do cadastro.
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
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                />
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
          <h4>CACHORROS</h4>
          <el-row :gutter="12">
            <cards
              title="Pesquisar"
              text="Faça uma pesquisa por nome"
              route="/search-dog"
            >
            </cards>
            <cards
              title="Novo Cadastro"
              text="Não encontrou um pet? Você pode cadastrar um novo pet aqui"
              route="/form-dog"
            ></cards>
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
        <div class="box-card">
          <h4>VETERINÁRIOS</h4>
          <el-row :gutter="12">
            <cards
              title="Pesquisar"
              text="Faça uma pesquisa por nome"
              route="/search-vet"
            ></cards>
            <cards
              title="Novo Cadastro"
              text="Não encontrou um Veterinário? Cadastre um novo veterinário aqui"
              route="/form-vet"
            ></cards>
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
      <div v-show="box">
        <div class="rate">
          <h5>Deixe sua avaliação</h5>
          <el-rate v-model="value2" :colors="colors"> </el-rate>
        </div>
        <h4>TRAGA SEU PET PARA O VUE PET CLINIC</h4>
        <div class="row">
          <div class="col-3">
            <img class="petshop" src="../assets/foto.jpeg" />
          </div>
          <div class="col-3">
            <img class="petshop" src="../assets/dog2.jpg" />
          </div>
          <div class="col-3">
            <img class="petshop" src="../assets/image.jpg" />
          </div>
        </div>
      </div>
      <google-map />
      <Footer> </Footer>
    </div>
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
      } else {
        this.$notify({
          title: "Erro",
          message: "Usuário ou Senha Incorreto",
          type: "danger",
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

h4 {
  text-shadow: 1px 1px 1px grey;
  font-color: #b0c4de;
}
.box-card {
  padding: 20px;
  margin: 20px;
}
.login-box {
  padding: 20px;
  margin: 20px;
  background-color: #b0c4de;
}
.button {
  padding: 20px;
  margin: 20px;
  height: 40px;
  width: 40px;
}
.rate {
  padding: 20px;
  margin: 20px;
}

.petshop {
  height: 280px;
  width: 320px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #8b95a1;

  animation: go-back 10s linear infinite;
}
@keyframes go-back {
  from {
    transform: translateX(10px);
  }
  to {
    transform: translateX(200px);
  }
}
</style>
