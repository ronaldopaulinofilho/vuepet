<template>
  <div>
    <Header
      title="Vue Pet Clinic"
      text="Cadastre os dados do Pet aqui:"
    ></Header>

    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <label> Nome:</label>
          <el-input
            type="text"
            placeholder="Digite o nome do Pet"
            v-model="dog.nome"
            maxlength="30"
            show-word-limit
          >
          </el-input>
          <span v-show="validateNome"> Você precisa digitar um nome </span>
          <div class="col-4">
            <label> Raça:</label>
            <select class="form-control" v-model="dog.raca">
              <option selected>Beagle</option>
              <option>Poodle</option>
              <option>Husk</option>
              <option>Vira Lata</option>
            </select>
            <span v-show="validateRaca"> Você precisa selecionar uma raça</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <label> Peso:</label>
          <el-input type="number" v-model="dog.peso" min="1" max="100">
          </el-input>
          <span v-show="validatePeso"> Você precisa definir um peso </span>
        </div>
        <div class="col-2">
          <label> Idade:</label>
          <el-input type="number" v-model="dog.idade" min="0" max="30">
          </el-input>
          <span v-show="validateIdade">
            Você precisa selecionar uma idade
          </span>
        </div>
        <div class="col-4">
          <label> Veterinário Responsável</label>
          <select class="form-control" v-model="dog.vetResponsavel">
            <option v-for="vet in vets" :key="vet">{{ vet.nome }}</option>
          </select>
        </div>

        <el-button class="button" type="success" @click="saveDog"
          >Salvar</el-button
        >
      </div>
      <div></div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  name: "FormDog",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      newDog: "",
      dog: {
        nome: "",
        raca: "",
        peso: "",
        idade: "",
        vetResponsavel: "",
      },
      vets: [],

      validateNome: false,
      validateRaca: false,
      validatePeso: false,
      validateIdade: false,
    };
  },
  mounted() {
    if (this.$route.params.id != undefined) {
      fetch("http://localhost:8080/dogs/" + this.$route.params.id, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok === true) return response.json();
        })
        .then((d) => {
          this.dogs = d;
        });
    }
    fetch("http://localhost:8080/vets", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
      })
      .then((v) => {
        this.vets = v;
      });
  },

  methods: {
    saveDog() {
      if (this.dog.nome == "") {
        this.validateNome = true;
      }
      if (this.dog.raca == "") {
        this.validateRaca = true;
      }
      if (this.dog.peso == "") {
        this.validatePeso = true;
      }
      if (this.dog.idade == "") {
        this.validateIdade = true;
      }
      if (
        this.dog.nome != "" &&
        this.dog.raca != "" &&
        this.dog.peso != "" &&
        this.dog.idade != ""
      ) {
        let dog = {
          nome: this.dog.nome,
          raca: this.dog.raca,
          peso: this.dog.peso,
          idade: this.dog.idade,
          vetResponsavel: this.dog.vetResponsavel,
        };
        let paramsId = "";
        let methodHTTP = "";
        if (this.$route.params.id != undefined) {
          methodHTTP = "PUT";
          paramsId = this.$route.params.id;
        } else {
          methodHTTP = "POST";
        }

        fetch("http://localhost:8080/dogs/" + paramsId, {
          method: methodHTTP,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dog),
        }).then((response) => {
          if (response.ok === true) {
            this.$router.push({ path: "/" });
            alert("Cachorro salvo com sucesso!");
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.button {
  width: 100px;
  height: 40px;
  margin: 25px;
}
</style>
