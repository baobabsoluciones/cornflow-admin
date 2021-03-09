<template>
  <g-chart
    type="SteppedAreaChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
  import { GChart } from 'vue-google-charts'

  export default {
    name: 'Graph',
    components: {
      GChart,
    },
    props: {
      experiment: {
        type: Object,
        required: true,
      },
      resource: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        chartOptions: {
          vAxis: {
            maxValue: this.experiment.instance.capacities[this.resource],
            viewWindow: {
              max: this.experiment.instance.capacities[this.resource],
            },
          },
          height: 100,
          chart: {
            title: 'Resource graph or resource ' + this.resource,
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
        return this.experiment.dataResChart(this.resource)
      },
    },
  }
</script>
