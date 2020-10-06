<template>
  <div class="home">
    <img id="logo" src="../assets/vue-dog.jpg" />
    <img @click="logoff" src="../assets/Vuepet.jpg" />

    <div class="card-text">Cadastre os dados do Pet aqui:</div>
    <div class="container-fluid">
      <div class="col-12">
        <label> Nome:</label>
        <el-input
          type="text"
          placeholder="Digite o nome do Pet"
          v-model="dogs.nome"
          maxlength="30"
          show-word-limit
        >
        </el-input>
      </div>
      <div class="row">
        <div class="col-4">
          <label> Raça:</label>
          <select class="form-control" v-model="dogs.raca">
            <option selected>Beagle</option>
            <option>Poodle</option>
            <option>Husk</option>
            <option>Vira Lata</option>
          </select>
        </div>
        <div class="col-4">
          <label> Peso:</label>
          <el-input type="number" v-model="dogs.peso" min="1" max="100">
          </el-input>
        </div>
        <div class="col-4">
          <label> Idade:</label>
          <el-input type="number" v-model="dogs.idade" min="0" max="30">
          </el-input>
        </div>
      </div>
      <div class="button">
        <el-button @click="saveDog(newDog)">Salvar</el-button>
      </div>
    </div>
    <a @click="logoff" href="#" class="text center">Home</a>
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

        <el-button @click="removeDog(dog)">Remover</el-button>
      </el-card>
      <div>
        {{ newDog }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      newDog: "",
      dogs: [
        {
          nome: "",
          raca: "",
          peso: "",
          idade: "",
        },
      ],
    };
  },

  methods: {
    saveDog() {
      fetch("http://localhost:3000/dogs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.dogs),
      }).then((response) => {
        if (response.ok === true) {
          alert("Cachorro salvo com sucesso!");
        }
      });
    },

    logoff() {
      this.$router.push({ path: "/" });
    },
    addDog() {
      if (!this.newDog) return;

      this.dogs.push({
        nome: this.newDog.nome,
        raca: this.newDog.raca,
        peso: this.newDog.peso,
        idade: this.newDog.idade,
      });
    },
    removeDog() {
      let index = this.dogs.indexOf();
      this.dogs.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.image {
  border-radius: 50%;
  size: 20%;
  padding: 20px;
}
.card {
  padding: 20px;
  transition: 0.3s;
}
</style>
