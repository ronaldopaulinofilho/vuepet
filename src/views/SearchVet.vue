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
            <span>Idade:{{ calculate(vet.data) }} </span>
            <span>Ver Pacientes:</span>
            <el-button
              @click="getDogsInVet(vet.id)"
              icon="el-icon-arrow-down"
              circle=""
            >
            </el-button>
            <ul>
              <el-tag
                @click="goToFormDog(dog.id)"
                type="primary"
                v-for="dog in dogsInVet(vet.id)"
                :key="dog.id"
              >
                {{ dog.nome }}
              </el-tag>
            </ul>
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
      vets: [
        {
          nome: "",
          cpf: "",
          data: "",
          dogs: [],
        },
      ],
      dogsOfVets: [],
      showedVet: false,
      showedDogs: false,
      value1: true,
      value2: true,
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
    dogsInVet(id) {
      let dogs_Vet = this.dogsOfVets.filter((f) => {
        return f.id === id;
      });

      if (dogs_Vet.length > 0) return dogs_Vet[0].dogs;
      else return [];
    },

    getDogsInVet(id) {
      this.showedDogs = true;
      fetch(`http://localhost:8080/vets/${id}/dogs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok === true) return response.json();
        })
        .then((dogsOfVets) => {
          let dogs_Vet = {
            id: id,
            dogs: dogsOfVets,
          };
          this.dogsOfVets.push(dogs_Vet);
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
    calculate(data) {
      return moment().diff(moment(data), "years");
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
    goToFormDog(id) {
      this.$router.push({
        name: "FormDog",
        params: { id: id },
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
