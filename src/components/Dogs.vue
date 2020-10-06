<template>
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
</template>

<script>
export default {
  name: "Dogs",
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
          alert("Dados salvos com sucesso!");
        }
      });
    },
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
  },
};
</script>

<style>
.card-body {
  padding: 20px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 20px;
}
.button {
  padding: 20px;
}

.box-card {
  width: 100%;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
