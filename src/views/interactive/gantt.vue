<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Gantt"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Hackathon 2020: task scheduling"
      class="px-5 py-3"
    >
      <g-chart
        type="ColumnChart"
        :data="chartData"
        :options="chartOptions"
      />
    </base-material-card>
    <div class="py-3" />

    <v-snackbar
      v-model="snack.show"
      :timeout="snack.timeout"
    >
      {{ snack.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snack.color"
          text
          v-bind="attrs"
          @click="snack.show=false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  import { GChart } from 'vue-google-charts'

  export default {
    components: {
      GChart,
    },
    data () {
      return {
        // Array will be automatically processed with visualization.arrayToDataTable function
        chartData: [
          ['Year', 'Sales', 'Expenses', 'Profit'],
          ['2014', 1000, 400, 200],
          ['2015', 1170, 460, 250],
          ['2016', 660, 1120, 300],
          ['2017', 1030, 540, 350],
        ],
        chartOptions: {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
        },
        snack: {
          show: false,
          text: '',
          color: 'red',
          timeout: 2000,
        },
      }
    },
  }
</script>

<style>
</style>
