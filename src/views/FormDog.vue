<template>
  <div>
    <Header
      title="Cadastro de Pets"
      text="Cadastre os dados do Pet aqui:"
    ></Header>

    <div class="form">
      <div class="showed-dog" v-show="showedDog">
        Edite os dados do Pet selecionado:
      </div>
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
          <el-alert
            v-show="validateNome"
            title="Você precisa digitar um nome"
            type="error"
            center
            show-icon
          >
          </el-alert>
        </div>
        <div class="col-4">
          <label> Raça:</label>
          <select class="form-control" v-model="dog.raca">
            <option selected>Beagle</option>
            <option>Poodle</option>
            <option>Husk</option>
            <option>Vira Lata</option>
          </select>
          <el-alert
            v-show="validateRaca"
            title="Você precisa selecionar uma raça"
            type="error"
            center
            show-icon
          >
          </el-alert>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <label> Peso:</label>
          <el-input type="number" v-model="dog.peso" min="1" max="100">
          </el-input>
          <el-alert
            v-show="validatePeso"
            title="Você precisa definir um peso"
            type="error"
            center
            show-icon
          >
          </el-alert>
        </div>
        <div class="col-3">
          <label> Idade:</label>
          <el-input type="number" v-model="dog.idade" min="0" max="30">
          </el-input>
          <el-alert
            v-show="validateIdade"
            title="Você precisa selecionar uma idade"
            type="error"
            center
            show-icon
          >
          </el-alert>
        </div>
        <div class="col-4">
          <label> Veterinário Responsável</label>
          <select class="form-control" v-model="dog.vetResponsavel">
            <option v-for="vet in vets" :key="vet.id" :value="vet.id">
              {{ vet.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <el-button class="button" plain type="success" @click="saveDog"
          >Salvar</el-button
        >
      </div>
      <div class="showed-dog" v-show="showedDog">
        Deseja excluir o Pet?
        <el-button
          @click="deleteDog(dog.id)"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
      </div>
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
      showedDog: false,
    };
  },
  mounted() {
    if (this.$route.params.id != undefined) {
      this.showedDog = true;
      fetch("http://localhost:8080/dogs" + this.$route.params.id, {
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
            this.$notify({
              title: "Sucesso",
              message: "Cachorro Salvo com Sucesso",
              type: "success",
            });
            this.$router.push({ path: "/" });
          }
        });
      }
    },
    deleteDog() {
      fetch("http://localhost:8080/dogs/" + this.$route.params.id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok === true) {
          this.$router.push({ path: "/" });
          this.$notify({
            title: "Sucesso",
            message: "Cachorro Excluído com Sucesso",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.form {
  padding: 20px;
  margin: 20px;
  margin-left: 140px;
}
.button {
  width: 100px;
  height: 40px;
  margin-top: 20px;
  margin-left: 500px;
}
.showed-dog {
  padding: 10px;
  margin: 10px;
  margin-right: 100px;
  font-size: 14px;
}
</style>
