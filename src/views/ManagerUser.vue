<template>
    <div>
      <v-toolbar>
        <v-toolbar-title>Manager User</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="showForm = true" color="primary">Add New User</v-btn>
      </v-toolbar>
      
      <UserForm
        v-if="showForm"
        @close="showForm = false"
        @add="addUser"
        :user="userToEdit"
        :isEdit="isEditing"
        :existingUsers="users"
      />
      <UserList :users="users" @edit="editUser" @delete="confirmDelete"/>
      
      <v-dialog v-model="confirmDialog" max-width="290">
        <v-card>
          <v-card-title>Confirm Delete</v-card-title>
          <v-card-actions>
            <v-btn @click="deleteUser" color="red">Delete</v-btn>
            <v-btn @click="confirmDialog = false" color="grey lighten-1">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import UserForm from '@/components/UserForm.vue';
  import UserList from '@/components/UserList.vue';
  
  const showForm = ref(false);
  const confirmDialog = ref(false);
  const userToDelete = ref(null);
  const isEditing = ref(false);
  const userToEdit = ref({});
  
  // Danh sách người dùng cứng
  const loadUsers = () => {
    const hardcodedUsers = [
      { name: 'John Doe', email: 'john@example.com', gender: 'Male', dateOfBirth: '1990-01-01' },
      { name: 'Jane Smith', email: 'jane@example.com', gender: 'Female', dateOfBirth: '1992-05-15' },
      { name: 'Alice Johnson', email: 'alice@example.com', gender: 'Female', dateOfBirth: '1988-03-30' },
      { name: 'Bob Brown', email: 'bob@example.com', gender: 'Male', dateOfBirth: '1985-07-20' },
    ];
  
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : hardcodedUsers;
  };
  
  const users = ref(loadUsers());
  
  const saveUsers = () => {
    localStorage.setItem('users', JSON.stringify(users.value));
  };
  
  const addUser = (user) => {
    if (!isEditing.value) {
      users.value.push(user);
    } else {
      const index = users.value.findIndex(u => u.email === user.email);
      if (index !== -1) {
        users.value.splice(index, 1, user);
      }
    }
    saveUsers(); // Lưu lại người dùng
    showForm.value = false;
    isEditing.value = false;
  };
  
  const editUser = (user) => {
    userToEdit.value = { ...user };
    isEditing.value = true;
    showForm.value = true;
  };
  
  const confirmDelete = (user) => {
    userToDelete.value = user;
    confirmDialog.value = true;
  };
  
  const deleteUser = () => {
    users.value = users.value.filter(user => user !== userToDelete.value);
    saveUsers(); // Lưu lại người dùng
    confirmDialog.value = false;
  };
  </script>
  
  <style scoped>
  .v-toolbar {
    background-color: #1976D2;
    color: white;
  }
  </style>