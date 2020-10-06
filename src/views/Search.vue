<template>
  <div>
    <div>
      <div class="container-fluid">
        <img id="logo" src="../assets/vue-dog.jpg" />
        <img src="../assets/Vuepet.jpg" />

        <div class="card-text">Encontre um pet pesquisando por nome:</div>

        <el-card class="box-card">
          <span>Nome do Pet: </span>
          <el-input
            type="text"
            placeholder="Faça uma pesquisa por nome para encontrar um pet"
            v-model="dogs.nome"
          ></el-input>

          <div class="button">
            <el-button @click="getDog(dogs)">Pesquisar</el-button>
          </div>
        </el-card>
        <div>
          <a @click="logoff" href="#" class="text center">Home</a>
        </div>
        <div class="card">
          <el-card v-for="dog in dogs" :key="dog">
            <img src="../assets/card.png" class="image" />
            <div style="padding: 2px">
              <span>Nome:{{ dogs.nome }}</span>
              <div class="bottom clearfix">
                <span>Raça:{{ dogs.raca }} </span>
                <span>Peso:{{ dogs.peso }} </span>
                <span>Idade:{{ dogs.idade }} </span>
              </div>
              <el-button
                class="button"
                @click="goToForm"
                icon="el-icon-edit"
              ></el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",

  data() {
    return {
      dogs: [
        {
          nome: "",
          peso: "",
          idade: "",
          raca: "",
        },
      ],
    };
  },

  methods: {
    getDog() {
      fetch("http://localhost:3000/dogs", {
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

    goToForm() {
      this.$router.push({ path: "/form" });
    },
    logoff() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
</style>
