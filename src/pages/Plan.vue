<template>
    <v-container>
      <v-toolbar color="primary" dark>
        <v-spacer></v-spacer>
        <v-btn text @click="navigateTo('Home')">Home</v-btn>
        <v-btn text @click="navigateTo('Vehicle')">Vehicle</v-btn>
        <v-btn text @click="navigateTo('Customer')">Customer</v-btn>
        <v-btn text @click="navigateTo('Plan')">Plan</v-btn>
        <v-btn text @click="navigateTo('Contract')">Contract</v-btn>
      </v-toolbar>
      <v-form class="d-flex justify-center" @submit.prevent="submitForm">
        <v-container class="w-50">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="description" label="Description"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="value" label="Value"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" type="submit">Create</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        description: '',
        value: null,
      };
    },
    methods: {
      async submitForm() {
        try {
          const body = {
            description: this.description,
            value: this.value,
          };
  
          await axios.put('http://127.0.0.1:8000/api/v1/plan', body);
  
          this.$router.push({ name: 'Home' });
        } catch (error) {
          alert('Something went wrong. Please try again.');
        }
      },
      navigateTo(screen) {
        this.$router.push({ name: screen });
      }
    }
  };
  </script>