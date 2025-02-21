<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title class="headline">Bark Family Job Planner</v-card-title>
          <v-card-text class="mt-6">
              <v-row>
                <v-col cols="12">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                :rules="[rules.required]"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="[rules.required]"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn :disabled="!valid" color="primary" @click="submit"
                >Login</v-btn
              >
            </v-form>
            </v-col>
          </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      username: "",
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        let response = await fetch("http://localhost:3000/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!response.ok) {
          this.$toast.open({
            message: "Invalid username or password",
            type: "error",
            duration: 5000,
            position: "top",
          });
          return;
        }

        console.log("response", response);
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>

<style scoped>
.headline {
  text-align: center;
}
</style>
