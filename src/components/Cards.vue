<template>

        <el-col :span="12">
        <el-card class="card" shadow="hover">
          <h4>{{ title}}</h4>
          <p>
           {{text}}
          </p>
        </el-card>
      </el-col>
    
</template>

<script>
export default {
    name: "Cards",
    props: {
    title: String,
    text: String,
   
  },

}
</script>

<style>



</style>