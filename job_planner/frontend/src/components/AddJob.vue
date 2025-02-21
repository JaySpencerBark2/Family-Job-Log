<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>
        <span class="headline">Add Job</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="currentUser"
                label="Current User"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-select
                label="Job"
                :items="jobTypeList"
                v-model="HouseJob.JobType"
                required
                :rules="[(v) => !!v || 'Job Type is required']"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="HouseJob.Description"
                label="Description"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="HouseJob.CompletedDate"
                label="Date Completed"
                type="date"
                required
                :rules="[(v) => !!v || 'Date is required']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="addJob">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      HouseJob: {},
      jobTypeList: [],
      currentUser: "",
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    async addJob() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        this.HouseJob.username = this.currentUser;
        let res = await fetch("http://localhost:3000/jobs/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.HouseJob),
        });

        if(!res.ok) {
          this.$toast.error("Failed to add job");
          throw new Error("Server responded with an error!", res);
        }

        this.$toast.success("Job added successfully");
        this.closeDialog();
        this.$emit("job-Added");


      } catch (error) {
        console.log(error);
        this.$toast.error("Failed to add job");
      }
    },

    async fetchAllJobType() {
      try {
        let response = await fetch("http://localhost:3000/jobTypes/get/all", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Server responded with an error!");
        }

        const data = await response.json();
        this.jobTypeList = data.map((job) => job["jobType"]);
      } catch (error) {
        console.log(error);
      }
    },

    async getCurrentUser() {
      try {
        let response = await fetch("http://localhost:3000/login/current", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Server responded with an error!");
        }

        let data = await response.json();
        this.currentUser = data.fullname;
      } catch (error) {
        console.log(error);
      }
    },
  },

  async mounted() {
    await this.fetchAllJobType();
    await this.getCurrentUser();
  },
};
</script>
