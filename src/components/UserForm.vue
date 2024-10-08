<template>
    <v-dialog :value="show" @input="updateShow" max-width="500">
      <v-card>
        <v-card-title>
          <span v-if="!isEdit">Add New User</span>
          <span v-if="isEdit">Edit User</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="userData.name"
            label="Name"
            required
            outlined
            :error-messages="errors.name"
          ></v-text-field>
          <v-text-field
            v-model="userData.email"
            label="Email"
            required
            outlined
            :error-messages="errors.email"
          ></v-text-field>
          <v-select
            v-model="userData.gender"
            :items="['Male', 'Female', 'Other']"
            label="Gender"
            outlined
          ></v-select>
          <v-text-field
            v-model="userData.dateOfBirth"
            label="Date of Birth"
            type="date"
            required
            outlined
            :error-messages="errors.dateOfBirth"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="close" color="grey lighten-1">Close</v-btn>
          <v-btn @click="submit" color="blue">{{ isEdit ? 'Save' : 'Add' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { defineProps, emit } from 'vue';
  
  const props = defineProps(['show', 'user', 'isEdit', 'existingUsers']);
  const errors = ref({ name: [], email: [], dateOfBirth: [] });
  
  // Tạo một biến phản ứng cho userData
  const userData = ref({ ...props.user });
  
  const updateShow = (value) => {
    emit('update:show', value);
  };
  
  const close = () => {
    updateShow(false);
  };
  
  // Theo dõi thay đổi từ props.user để cập nhật userData
  watch(() => props.user, (newUser) => {
    userData.value = { ...newUser };
  });
  
  const validate = () => {
    errors.value.name = [];
    errors.value.email = [];
    errors.value.dateOfBirth = [];
  
    if (!userData.value.name) {
      errors.value.name.push('Name is required.');
    }
  
    if (!userData.value.email) {
      errors.value.email.push('Email is required.');
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(userData.value.email)) {
        errors.value.email.push('Email must be valid.');
      }
      
      const emailExists = existingUsers.some(existingUser => existingUser.email === userData.value.email);
      if (emailExists && !props.isEdit) {
        errors.value.email.push('Email already exists.');
      }
    }
  
    const today = new Date();
    const dob = new Date(userData.value.dateOfBirth);
    if (dob > today) {
      errors.value.dateOfBirth.push('Date of Birth cannot be in the future.');
    }
  
    return !errors.value.name.length && !errors.value.email.length && !errors.value.dateOfBirth.length;
  };
  
  const submit = () => {
    if (validate()) {
      emit('add', userData.value);
      close();
    }
  };
  </script>
  
  <style scoped>
  .v-card {
    border-radius: 10px;
  }
  </style>