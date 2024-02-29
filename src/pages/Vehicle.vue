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
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="plate" label="Plate"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="model" label="Model"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="description" label="Description"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select clearable chips label="Select" :items="customerOptions" v-model="selectedCustomer"></v-select> 
          </v-col>
          <v-col cols="12">
            <v-btn color="primary" type="submit">Criar</v-btn>
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
      plate: '',
      model: '',
      description: '',
      selectedCustomer: null,
      customers: [],
    };
  },
  computed: {
    customerOptions() {
      if (this.customers.length > 0) {
        return this.customers.map(customer => customer.name);
      }
    },
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/customers');
        this.customers = response.data;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },
    async submitForm() {
      try {
        const selectedCustomer = this.customers.find(e => {
          if (e.name == this.selectedCustomer) return e
        })
  
        const body = {
          plate: this.plate,
          model: this.model,
          description: this.description,
          customer_id: selectedCustomer.id,
        };
        
        console.log(body)

        await axios.put('http://127.0.0.1:8000/api/v1/vehicle', body)
  
        this.$router.push({ name: 'Home' });
        
      } catch (error) {
        alert('something was wrong, please try again')
      }
    },
    navigateTo(screen) {
      // Define your navigation logic here
      // For example, using Vue Router
      this.$router.push({ name: screen });
    }
  },
  mounted() {
    this.fetchCustomers();
  },
};
</script>