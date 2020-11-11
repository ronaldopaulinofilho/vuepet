<template>
  <div>
    <Header
      title="Pesquisa de Pets"
      text="Encontre um Pet pesquisando por nome"
      route="/"
    ></Header>

    <el-card class="box-card">
      <span>Nome do Pet: </span>
      <el-input
        type="text"
        placeholder="Faça uma pesquisa por nome para encontrar um pet"
        v-model="filter"
      ></el-input>
      <div class="button">
        <el-button type="primary" @click="getDog(dog)" icon="el-icon-search"
          >Pesquisar</el-button
        >
      </div>
    </el-card>

    <div v-if="showedDog">
      <el-card v-for="dog in dogs" :key="dog.id">
        <img src="../assets/card.png" class="image" />
        <div style="padding: 20px">
          <span>Nome:{{ dog.nome }}</span>
          <div class="bottom clearfix">
            <span>Raça:{{ dog.raca }} </span>
            <span>Peso:{{ dog.peso }} </span>
            <span>Idade:{{ dog.idade }} </span>
          </div>
          <el-button
            @click="goToFormDog(dog.id)"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="removeDog"
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
export default {
  name: "SearchDog",
  components: {
    Header,
    Footer,
  },

  data() {
    return {
      filter: "",
      dogs: {
        nome: "",
        peso: "",
        idade: "",
        raca: "",
        vetResponsavel: "",
      },
      showedDog: false,
    };
  },
  mounted() {},

  methods: {
    getDog() {
      let params = "";
      if (this.filter != "") {
        this.showedDog = true;
        params = "?nome=" + this.filter;
      }
      this.showedDog = true;

      fetch("http://localhost:8080/dogs" + params, {
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
        .then((d) => {
          this.dogs = d;
        });
    },

    goToFormDog(id) {
      this.$router.push({
        name: "FormDog",
        params: { id: id },
      });
    },

    removeDog() {
      let index = this.dogs.indexOf();
      this.dogs.splice(index, 1);
    },

    deleteDog() {
      fetch("http://localhost:8080/dogs", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok === true) {
          this.$router.push({ path: "/" });
          alert("Cachorro excluído com sucesso!");
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
.button {
  padding: 20px;
  margin-top: 10px;
  border-radius: 50%;
}
</style>
