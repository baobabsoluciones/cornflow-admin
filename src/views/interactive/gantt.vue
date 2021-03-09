<template>
  <g-chart
    :settings="{ packages: ['gantt'] }"
    :create-chart="(el, google) => new google.visualization.Gantt(el)"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
  import { GChart } from 'vue-google-charts'

  export default {
    name: 'Gantt',
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
          height: 1000,
          chart: {
            title: '',
            subtitle: '',
          },
        },
      }
    },
    computed: {
      chartData: function () {
        const input = this.experiment.instance
        const output = this.experiment.solution
        if (output == null | input == null) {
          return []
        }
        return this.experiment.dataGantt
      },
    },
  }
</script>
