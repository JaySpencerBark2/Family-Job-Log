<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-card-title>House Jobs</v-card-title>
        <v-card-text> </v-card-text>
        <v-card-text>
          <v-row>
            <v-col>
              <v-data-table 
              elivated="5" 
              :headers="headers"
              class="elevation-1"
              :items="jobList"
              > 
              <template v-slot:[`item.CompletedDate`]="{ item }">
                {{ moment(item.CompletedDate).format("MM/DD/YYYY") }}
              </template>
            </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row>
        <v-btn icon="mdi-plus" size="x-large" @click="openAddJobDialog" color="primary"></v-btn>
      </v-row>
    </v-container>
  </div>
  <add-job
  ref="addJob"
  @job-Added="handelNewJob"
  ></add-job>
</template>
<script>
import AddJob from "@/components/AddJob.vue";
import moment from "moment";

export default {
  components: {
    AddJob,
  },
  data() {
    return {
      currentUser: {},
      jobList: [],
      moment: moment,

      headers: [
        { title: "User", value: "username" },
        { title: "Job Type", value: "JobType" },
        { title: "Description", value: "Description" },
        { title: "Date", value: "CompletedDate" },
        { title: "", value: "actions", sortable: false },
      ],

    };
  },
  methods: {
    async getAllJobs(){
      try {
        let response = await fetch("http://localhost:3000/jobs/get/all", {
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
        this.jobList = data;
      } catch (error) {
        console.log(error);
      }
    },
    async handelNewJob(){
      await this.getAllJobs();
    },

    openAddJobDialog() {
      this.$refs.addJob.openDialog();
    },

  },
  async mounted() {
    await this.getAllJobs();
  },
};
</script>
