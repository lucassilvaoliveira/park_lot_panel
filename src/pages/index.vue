<template>
  <v-container>
    <v-toolbar color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn text @click="navigateTo('Home')">Home</v-btn>

      <v-btn text @click="navigateTo('Vehicle')">Vehicle</v-btn>
      <v-btn text @click="navigateTo('Customer')">Customer</v-btn>
      <v-btn text @click="navigateTo('Plan')">Plan</v-btn>
      <v-btn text @click="navigateTo('Contract')">Contract</v-btn> </v-toolbar>
    <div class="content">
      <h1>Tela de Controle de Entrada e Saída</h1>

      <div class="inputs">
        <div class="input-container">
          <v-text-field label="Placa" v-model="plate"></v-text-field>
        </div>

        <div class="input-container">
          <v-text-field type="number" label="Valor a receber" v-model="valueToReceive"
            :disabled="!entryMode"></v-text-field>
        </div>
      </div>

      <div class="grid-container">
        <v-data-table :headers="headers" :items="dataGrid" item-key="plate">
          <template v-slot:[`item.entry_date`]="{ item }">
            {{ formatEntryDate(item.entry_date) }}
          </template>
          <template v-slot:[`item.plate`]="{ item }">
            {{ item.plate }}
          </template>
          <template v-slot:[`item.card`]="{ item }">
            {{ item?.card || 'Não possui' }}
          </template>
          <template v-slot:[`item.exitButton`]="{ item }">
            <v-btn @click="handleExit(item.plate)" outlined color="primary">
              Saída
            </v-btn>
          </template>
        </v-data-table>
      </div>

      <div class="button-container">
        <v-btn class="text-none text-subtitle-1" color="primary" size="large" variant="flat" @click="handleEntry">
          Entrada
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {

  data() {
    return {
      plate: '',
      headers: [
        { text: 'Entrada', align: 'start', value: 'entry_date', sortable: true },
        { text: 'Placa', value: 'plate', sortable: true },
        { text: 'Cartão', value: 'card', sortable: false },
        { text: 'Saída', value: 'exitButton', sortable: false }
      ],
      valueToReceive: null,
      entryMode: false,
      dataGrid: []
    };
  },
  mounted() {
    this.getParkMovements();
  },
  methods: {
    async getParkMovements() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/parkmovements');
        this.dataGrid = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async handleEntry() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/parkmovement/entry', {
          plate: this.plate
        });

        this.dataGrid.unshift(response.data);
      } catch (error) {
        alert(error.response.data.error);
        console.error(error);
      }
    },
    async handleExit(plate) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/parkmovement/exit', {
          plate: plate
        });

        this.valueToReceive = response.data.charge;
        this.plate = plate;
      } catch (error) {
        alert(JSON.stringify(error.response.data));
        console.error(error);
      }
    },
    formatEntryDate(entry_date) {
      const date = new Date(entry_date);
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
    },
    navigateTo(screen) {
      // Define your navigation logic here
      // For example, using Vue Router
      this.$router.push({ name: screen });
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

body {
  font-family: 'Roboto', sans-serif;
}

.container {
  display: flex;
}

.content {
  flex: 1;
}

.inputs {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.input-container {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 20%;
  align-self: center;
}

.grid-container {
  margin-bottom: 20px;
}

.grid-container table {
  width: 100%;
  border-collapse: collapse;
}

.grid-container th,
.grid-container td {
  border: 1px solid #ddd;
  padding: 8px;
}

.button-container {
  margin-top: 20px;
}

.button-container button {
  margin: 0 10px;
  padding: 10px 20px;
  flex: 1;
  flex-direction: column;
}
</style>
