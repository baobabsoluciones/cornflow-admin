<template>
  <g-chart
    type="Table"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
  import { GChart } from 'vue-google-charts'

  export default {
    name: 'Table',
    components: {
      GChart,
    },
    props: {
      experiment: {
        type: Object,
        required: true,
      },
    },
    data () {
      return {
        chartOptions: {
          chart: {
            title: 'Table title!',
            subtitle: 'subtitle of table',
          },
        },
      }
    },
    computed: {
      chartData: function () {
        if (this.experiment.instance == null) {
          return
        }
        return this.experiment.instance.dataTable
      },
    },
  }
</script>
