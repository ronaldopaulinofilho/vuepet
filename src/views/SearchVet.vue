<template>
  <div>
    <Header
      title="Pesquisa de Veterinários"
      text=" Encontre um veterinário pesquisando por nome"
    ></Header>

    <el-card class="box-card">
      <span>Nome do Veterinário: </span>
      <el-input
        type="text"
        placeholder="Faça uma pesquisa por nome para encontrar um veterinário"
        v-model="filter"
      ></el-input>
      <div class="button">
        <el-button type="primary" @click="getVet(vet)" icon="el-icon-search"
          >Pesquisar</el-button
        >
      </div>
    </el-card>

    <div v-if="showedVet">
      <el-card v-for="vet in vets" :key="vet.id">
        <img src="../assets/images.jpeg" class="image" />
        <div style="padding: '20px">
          <span>Nome:{{ vet.nome }}</span>
          <div class="bottom clearfix">
            <span>CPF:{{ vet.cpf }} </span>
            <span>Idade:{{ idade }} </span>
            <span>Ver Pacientes:</span>
            <el-switch @click="showedDogs = true" v-model="showedDogs">
              Ver Pacientes
            </el-switch>
            <el-input v-show="showedDogs">{{ dogs }}</el-input>
          </div>
          <el-button
            class="button"
            @click="goToFormVet(vet.id)"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            class="button"
            @click="removeVet"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </div>
      </el-card>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import moment from "moment";

export default {
  name: "SearchVet",
  components: {
    Header,
    Footer,
  },

  data() {
    return {
      filter: "",
      vets: {
        nome: "",
        cpf: "",
        data: "",
        dogs: [],
      },
      showedVet: false,
      showedDogs: false,
      value1: true,
      value2: true,
      idade: moment().diff(moment(), "years"),
    };
  },
  mounted() {},

  methods: {
    getVet() {
      let params = "";
      if (this.filter != "") {
        this.showedVet = true;
        params = "?nome=" + this.filter;
      }
      this.showedVet = true;
      fetch("http://localhost:8080/vets" + params, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

    goToFormVet(id) {
      this.$router.push({
        name: "FormVet",
        params: { id: id },
      });
    },
    removeVet() {
      let index = this.vets.indexOf();
      this.vets.splice(index, 1);
    },
    deleteVet() {
      fetch("http://localhost:8080/vets", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.vet),
      }).then((response) => {
        if (response.ok === true) {
          this.$router.push({ path: "/" });
          alert("Veterinário excluído com sucesso!");
        }
      });
    },
  },
};
</script>

<style scoped>
.image {
  border-radius: 80%;
  border: 2px solid;
  height: 100px;
  width: 100px;
  padding: 2px;
}
.box-card {
  height: 200px;
  width: 1000px;
  padding: 20px;
  transition: 0.4s;
  margin-left: 200px;
  margin-right: 200px;
}
.card {
  height: 200px;
  width: 1000px;
  padding: 20px;
  transition: 0.4s;
  margin-left: 200px;
  margin-right: 200px;
}
</style>
