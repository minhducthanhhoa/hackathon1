<template>
  <v-table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Date of Birth</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.email">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.dateOfBirth }}</td>
        <td>
          <v-btn @click="$emit('edit', user)" color="orange">Edit</v-btn>
          <v-btn @click="$emit('delete', user)" color="red">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: ['users'],
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  text-align: left;
}
th {
  background-color: #f5f5f5;
}
tr:hover {
  background-color: #f1f1f1;
}
</style>