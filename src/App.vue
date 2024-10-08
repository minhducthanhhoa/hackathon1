<template>
  <v-app>
    <!-- App bar with title -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>User Management System</v-toolbar-title>
    </v-app-bar>

    <!-- Navigation drawer with links -->
    <v-navigation-drawer app>
      <v-list>
        <!-- Using router-link for navigation -->
        <v-list-item>
          <router-link to="/admin" class="nav-link">Dashboard</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/admin/manager-user" class="nav-link">Manager User</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/admin/manager-product" class="nav-link">Manager Product</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main content area for routing -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
// No need for export default in script setup
</script>

<style scoped>
/* Custom styles for navigation links */
.nav-link {
  text-decoration: none;
  color: #000; /* Change this as needed */
  font-weight: bold;
  padding: 10px;
  display: block;
}

.v-navigation-drawer {
  width: 240px;
}

/* Styling for active router link */
.router-link-active {
  background-color: rgba(0, 0, 0, 0.08); /* Highlight active link */
  color: #1976d2; /* Active link color, matches primary color */
}

/* Adjust toolbar and navigation styling */
.v-app-bar {
  box-shadow: none; /* Remove default shadow if desired */
}

.v-toolbar-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.v-navigation-drawer {
  background-color: #fff;
}

.v-list-item {
  margin: 5px 0;
}
</style>
