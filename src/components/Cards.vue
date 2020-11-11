<template>
  <el-col :span="12">
    <el-card type="button" class="el-card" shadow>
      <div @click="navigateToRoute">
        <h4>{{ title }}</h4>
        <p>
          {{ text }}
        </p>
        <img :src="icon" />
      </div>
    </el-card>
  </el-col>
</template>

<script>
export default {
  name: "Cards",
  props: {
    title: { type: String },
    text: { type: String },
    icon: { type: String },
    route: { type: String },
  },
  data() {
    return {
      routify: this.route,
    };
  },
  methods: {
    navigateToRoute() {
      this.$router.push(this.routify);
      this.$router.push(this.route);
    },
  },
};
</script>

<style scoped>
el-card {
  cursor: pointer;
  border-radius: 20px;
}
</style>