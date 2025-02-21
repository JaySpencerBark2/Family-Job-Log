<template>
  <v-dialog v-model="showDialog">
    <v-card>
      <div v-if="user._id">
        <v-card-title>Edit User</v-card-title>
      </div>
      <div v-else>
        <v-card-title>Add User</v-card-title>
      </div>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="user.fullname"
                label="Full Name"
              ></v-text-field>
              <v-text-field
                v-model="user.username"
                label="Username"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
              ></v-text-field>
              <v-text-field label="Confirm Password" 
              v-model="user.passwordComfirm" 
              type="password"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <div v-if="user._id">
          <v-btn @click="saveForm" >Update</v-btn>
        </div>
        <div v-else>
          <v-btn @click="saveForm" >Add</v-btn>
        </div>
     
        <v-btn @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      user: {
        fullname: "",
        username: "",
        password: "",
      },
      showDialog: false,
      editMode: false,
    };
  },

  methods: {
    async addUser() {
      try {
        if(this.user.password !== this.user.passwordComfirm) {
          this.$toast.open({
            message: 'Passwords do not match',
            type: 'error',
            duration: 5000,
            position: 'top'
          });
          return;
        }
        let response = await fetch("http://localhost:3000/users/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.user),
        });

        if (!response.ok) {
          alert("Failed to add user", response);

          this.$toast.open({
            message: 'Error creating user',
            type: 'error',
            duration: 5000,
          });
          return;
        }
        this.$emit("newUsersHandler");
        this.closeDialog();
        this.$toast.open({
          message: 'User has been created successfully',
          type: 'success',
          duration: 5000,
          position: 'top',
        });
      } catch (error) {
        console.error(error);
      }
    },

   async saveForm() {
      if (this.editMode) {
       await  this.editUser();
      } else {
       await this.addUser();
      }
    },

    async editUser() {
      try {
        let response = await fetch("http://localhost:3000/users/update", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.user),
        });

        if (!response.ok) {
          alert("Failed to edit user", response);
          this.$toast.open({
            message: 'Error updating user',
            type: 'error',
            duration: 5000,
            position: 'top',
          });
          return;
        }
        this.$emit("newUsersHandler");
        this.closeDialog();
        this.$toast.open({
          message: 'User has been updated successfully',
          type: 'success',
          duration: 5000,
          position: 'top'
        });

      } catch (error) {
        console.error(error);
      }
    },

    closeDialog() {
      this.showDialog = false;
    },

    openDialog() {
      this.showDialog = true;
    },

    openDialogEdit(item) {
      this.user = JSON.parse(JSON.stringify(item));
      this.user.password = "";
      this.showDialog = true;
      this.editMode = true;
    },
  },
  watch: {
    showDialog(val) {
      if (!val) {
        this.user = {};
        this.editMode = false;
      }
    },
  },
};
</script>