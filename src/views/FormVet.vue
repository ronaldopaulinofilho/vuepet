<template>
  <div>
    <Header title="Vue Pet Clinic" text="Cadastre os dados do Veterinário aqui">
    </Header>

    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <label> Nome:</label>
          <el-input
            type="text"
            placeholder="Digite o nome do Veterinário"
            v-model="vet.nome"
            maxlength="100"
            show-word-limit
          >
          </el-input>
          <span v-show="validateNome"> Você precisa digitar um nome </span>
        </div>
        <div class="col-6">
          <label> CPF:</label>
          <el-input v-model="vet.cpf" v-mask="['###. ###. ### - ##']">
          </el-input>
          <span v-show="validateCpf"> Digite um CPF válido </span>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label>Data de Nascimento:</label>
          <el-date-picker
            v-model="vet.data"
            type="date"
            placeholder="Selecione um Data"
          >
          </el-date-picker>
          <span v-show="validateData"> Escolha uma data de nascimento</span>
        </div>
      </div>
      <div class="button">
        <el-button type="success" @click="saveVet">Salvar</el-button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  name: "FormVet",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      newVet: "",
      vet: {
        nome: "",
        cpf: "",
        data: "",
        dogs: [],
      },
      validateNome: false,
      validateCpf: false,
      validateData: false,
    };
  },

  mounted() {
    if (this.$route.params.id != undefined) {
      fetch("http://localhost:8080/vets/" + this.$route.params.id, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok === true) return response.json();
        })
        .then((v) => {
          this.vets = v;
        });
    }
    fetch("http://localhost:8080/dogs", {
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
      .then((d) => {
        this.dogs = d;
      });
  },
  methods: {
    saveVet() {
      if (this.vet.nome == "") {
        this.validateNome = true;
      }
      if (this.vet.cpf == "") {
        this.validateCpf = true;
      }

      if (this.vet.data == "") {
        this.validateData = true;
      }
      if (this.vet.nome != "" && this.vet.cpf != "" && this.vet.data != "") {
        let vet = {
          nome: this.vet.nome,
          cpf: this.vet.cpf,
          data: this.vet.data,
          dogs: this.vet.dogs,
        };
        let paramsId = "";
        let methodHTTP = "";
        if (this.$route.params.id != undefined) {
          methodHTTP = "PUT";
          paramsId = this.$route.params.id;
        } else {
          methodHTTP = "POST";
        }
        fetch("http://localhost:8080/vets/" + paramsId, {
          method: methodHTTP,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vet),
        }).then((response) => {
          if (response.ok === true) {
            alert("Veterinário salvo com sucesso!");
            this.$router.push({ path: "/" });
          }
        });
      }
    },
  },
};
</script>

<style></style>
