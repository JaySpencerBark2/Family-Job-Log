<template>
  <v-app>
    <v-app-bar v-if="!isLoginPage" app>
      <v-toolbar-title>Family Job Book</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/dashboard">Home</v-btn>
      <v-btn text to="/users">Users</v-btn>
      <v-btn text to="/job-types">Job Types</v-btn>
      <v-btn @click="logout">LogOut</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "App",

  data: () => ({}),
  computed: {
    isLoginPage() {
      return this.$route.path === '/login';
    },
  },
  methods: {
    logout() {
      this.loguserOut();
    },

    async loguserOut() {
      let response = await fetch("http://localhost:3000/login/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        this.$router.push("/login");
      }
    },
  },
};
</script>
