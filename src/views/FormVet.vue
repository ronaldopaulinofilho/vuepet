<template>
  <div>
    <Header
      title="Cadastro de Veterinários"
      text="Cadastre os dados do Veterinário aqui"
      route="/"
    >
    </Header>

    <div class="form">
      <h4 class="showed-vet" v-show="showedVet">
        Edite os Dados do Veterinário Selecionado:
      </h4>
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
          <label> CPF:</label>
          <el-input v-model="vet.cpf" v-mask="['###. ###. ### - ##']">
          </el-input>
          <el-alert
            v-show="validateCpf"
            title="Digite um CPF válido"
            type="error"
            center
            show-icon
          >
          </el-alert>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-10">
          <label>Data de Nascimento:</label>
          <el-date-picker
            v-model="vet.data"
            type="date"
            placeholder="Selecione um Data"
          >
          </el-date-picker>
          <el-alert
            v-show="validateData"
            title="Escolha uma data de nascimento"
            type="error"
            center
            show-icon
          >
          </el-alert>
        </div>
      </div>

      <div class="button">
        <el-button type="success" plain @click="saveVet">Salvar</el-button>
      </div>

      <div class="showed-vet" v-show="showedVet">
        Deseja excluir o veterinário?
        <el-button
          @click="deleteVet(vet.id)"
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
      },
      vets: [],
      dogs: [],
      validateNome: false,
      validateCpf: false,
      validateData: false,
      showedVet: false,
    };
  },

  mounted() {
    if (this.$route.params.id != undefined) {
      this.showedVet = true;
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
            this.$notify({
              title: "Sucesso",
              message: "Veterinário Salvo com Sucesso",
              type: "success",
            });
            this.$router.push({ path: "/" });
          }
        });
      }
    },

    deleteVet() {
      fetch("http://localhost:8080/vets/" + this.$route.params.id, {
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
            message: "Veterinário Excluído com Sucesso",
            type: "success",
          });
        } else {
          this.$notify({
            title: "Erro",
            message: "Veterinário Possui Pets Cadastrados",
            type: "error",
          });
          this.$router.push({ path: "search-vet" });
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
  margin-left: 150px;
}
.button {
  width: 100px;
  height: 40px;
  margin: 20px;
  margin-left: 450px;
}
.showed-vet {
  padding: 20px;
  margin-right: 150px;
  font-size: 14px;
  text-shadow: 1px 1px 1px #b2c2df;
  color: #ffffff;
  background-color: #b0c4de;
}
</style>
