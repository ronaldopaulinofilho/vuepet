<template>
  <div>
    <Header
      title="Pesquisa de Veterinários"
      text=" Encontre um veterinário pesquisando por nome"
      route="/"
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
      <el-card class="showedvets" v-for="vet in vets" :key="vet.id">
        <img src="../assets/images.jpeg" class="image" />
        <div>
          <span>Nome:{{ vet.nome }}</span>
          <div class="bottom clearfix">
            <span>CPF:{{ vet.cpf }} </span>
            <span>Idade:{{ calculate(vet.data) }} </span>
            <el-button
              class="buttondogs"
              @click="getDogsInVet(vet.id)"
              type="text"
            >
              Ver Pacientes
            </el-button>
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
          <div class="row">
            <ul>
              <el-tag
                class="tag"
                @click="goToFormDog(dog.id)"
                type="primary"
                v-for="dog in dogsInVet(vet.id)"
                :key="dog.id"
              >
                {{ dog.nome }}
              </el-tag>
            </ul>
          </div>
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
  border: 2px solid #9ad4e6;
  height: 100px;
  width: 100px;
  padding: 2px;
}
.box-card {
  height: 200px;
  width: 1000px;
  padding: 20px;
  margin-left: 200px;
  margin-right: 200px;
}
.showedvets {
  height: 320px;
  width: 800px;
  padding: 20px;
  margin-left: 290px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 1px #d7dadf;
  font-family: "Tahoma";
  animation: fade-in 2s;
}
@keyframes fade-in {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(100px);
  }
}
.button {
  padding: 10px;
  margin-top: 10px;
  border-radius: 50%;
}
.buttondogs {
  border: 1px solid;
  height: 40px;
  width: 100px;
}
.tag {
  cursor: pointer;
  margin: 2px;
  color: #9ad4e6;
  width: 100px;
}
</style>
