<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Edit Job Type</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        v-model="jobType.jobTypeName"
                        label="Job Name"
                        required
                        :rules="[
                            (v) => !!v || 'Name is required',
                        ]"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveJobType">Save</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>
  <script>
    export default {
        data(){
            return{
                dialog: false,
                jobType: { 
                    jobTypeName: '',
                    id: '',
                },
            }
        },
        methods:{
            closeDialog() {
            this.dialog = false;
        },
       async saveJobType() {
            try{
                let id = this.jobType.id;
                let jobTypeName = this.jobType.jobTypeName;
                let response = await fetch(`http://localhost:3000/jobTypes/update/${id}`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        jobType: jobTypeName,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Server responded with an error!");
                }

                this.$emit("jobTypeAdded");
                this.jobTypeName = '';
                this.dialog = false;

            } catch (error) {
                console.log(error);
            }
            this.dialog = false;
        },
        openDialog(item) {
            this.jobType = JSON.parse(JSON.stringify(item));
            this.dialog = true;
        },
        }

    }
  </script>

<style scoped>
.headline {
    font-weight: bold;
}
</style>