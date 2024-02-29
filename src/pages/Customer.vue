<template>
    <v-container>
        <v-toolbar color="primary" dark>
            <v-spacer></v-spacer>
            <v-btn text @click="navigateTo('Home')">Home</v-btn>
            <v-btn text @click="navigateTo('Vehicle')">Vehicle</v-btn>
            <v-btn text @click="navigateTo('Customer')">Customer</v-btn>
            <v-btn text @click="navigateTo('Plan')">Plan</v-btn>
            <v-btn text @click="navigateTo('Contract')">Contract</v-btn> </v-toolbar>
        <v-form class="d-flex justify-center" @submit.prevent="submitForm">
            <v-container class="w-50">
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="cardId" label="Card ID"></v-text-field>
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
            name: '',
            cardId: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                const body = {
                    name: this.name,
                    card_id: this.cardId,
                };

                console.log(body)

                await axios.put('http://127.0.0.1:8000/api/v1/customer', body);

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