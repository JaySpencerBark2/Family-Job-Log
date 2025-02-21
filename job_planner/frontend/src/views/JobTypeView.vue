<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-card-title>Job Types</v-card-title>
            <v-card-text class="mt-6">
              <v-row>
                <v-col cols="12">
                  <v-data-table :headers="headers" :items="jobTypeList">
                    <template v-slot:[`item.action`]="{ item }">
                      <v-btn color="primary" @click="editJobType(item)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:[`item.delete`]="{ item }">
                      <v-btn color="error" @click="deleteJobType(item)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
              <v-row>
                <v-btn
                  icon="mdi-plus"
                  size="x-large"
                  color="primary"
                  @click="addJobType"
                ></v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <add-job-type ref="addJobType" @jobTypeAdded="fetchAllJobType"></add-job-type>
  <edit-job-type
    ref="editJobType"
    @jobTypeAdded="fetchAllJobType"
  ></edit-job-type>
</template>

<script>
import AddJobType from "../components/AddJobType.vue";
import EditJobType from "@/components/EditJobType.vue";

export default {
  components: {
    AddJobType,
    EditJobType,
  },

  data() {
    return {
      jobTypeList: [],
      headers: [
        { title: "Name", value: "jobType" },
        { title: "", value: "action", sortable: false },
        { title: "", value: "delete", sortable: false },
      ],
    };
  },
  methods: {
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
        this.jobTypeList = data;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteJobType(jobType) {
      try {
        let id = jobType._id;
        let response = await fetch(
          `http://localhost:3000/jobTypes/delete/${id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Server responded with an error!");
        }

        this.$toast.success("Job type deleted successfully");
        await this.fetchAllJobType();
      } catch (error) {
        console.log(error);
        this.$toast.error("Failed to delete job type");
      }
    },

    editJobType(jobType) {
      this.$refs.editJobType.openDialog(jobType);
    },

    addJobType() {
      this.$refs.addJobType.openDialog();
    },
  },
  async mounted() {
    await this.fetchAllJobType();
  },
};
</script>
