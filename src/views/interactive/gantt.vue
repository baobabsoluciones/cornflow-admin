<template>
  <g-chart
    ref="gChart"
    :settings="{ packages: ['gantt'] }"
    :create-chart="(el, google) => new google.visualization.Gantt(el)"
    :data="chartData"
    :events="chartEvents"
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
      height: {
        type: Number,
        required: false,
        default: 500,
      },
    },
    data () {
      return {
        chartEvents: {
          select: () => {
            const chart = this.$refs.gChart.chartObject
            let selection = chart.getSelection()
            if (selection.length) {
              selection = this.chartData[selection[0].row + 1]
            }
            this.$emit('on-select', selection)
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
      chartOptions: function () {
        return {
          gantt: {
            trackHeight: (this.height - 2) / this.chartData.length,
          },
          height: this.height,
          chart: {
            title: '',
            subtitle: '',
          },
        }
      },
    },
  }
</script>
