<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-card-title>Users</v-card-title>
            <v-card-text class="mt-6">
              <v-row>
                <v-col cols="12">
                  <v-data-table
                    :headers="headers"
                    :items="users"
                    class="elevation-5"
                  >
                    <template v-slot:[`item.action`]="{ item }">
                      <v-btn color="primary" @click="editUser(item)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:[`item.delete`]="{ item }">
                      <v-btn color="error" @click="deleteUser(item)">
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
                  @click="openDialog"
                ></v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <user-Add-Edit ref="addEditUser" @newUsersHandler="getUsers"></user-Add-Edit>
</template>

<script>
import userAddEdit from "../components/AddUserDialog.vue";
export default {
  components: {
    userAddEdit,
  },
  name: "UsersView",
  data() {
    return {
      users: [],

      headers: [
        { title: "Name", value: "fullname" },
        { title: "Username", value: "username" },
        { title: "", value: "action" },
        { title: "", value: "delete" },
      ],
    };
  },
  methods: {
    async getUsers() {
      let response = await fetch("http://localhost:3000/users/get/all", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        alert("Failed to get users", response);
        this.$toast.open({
        message: 'Error fetching users',
        type: 'error',
        duration: 5000,
        position: 'top'
      });
        return;
      }

      let data = await response.json();
      this.users = data;
    },

    async deleteUser(item) {
      const ID = item._id;

      let response = await fetch(`http://localhost:3000/users/delete/${ID}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        alert("Failed to delete user", response);
        this.$toast.open({
        message: 'Error deleting user',
        type: 'error',
        duration: 5000,
        position: 'top'
      });
        return;
      }

      await this.getUsers();

      this.$toast.open({
        message: 'User has been deleted successfully!',
        type: 'success',
        duration: 5000,
        position: 'top'
      });
    },

    openDialog() {
      this.$refs.addEditUser.openDialog();
    },

    async newUsersHandler() {
      await this.getUsers();
    },

    editUser(item) {
      this.$refs.addEditUser.openDialogEdit(item);
    },  
  },
  
  async mounted() {
    await this.getUsers();
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
