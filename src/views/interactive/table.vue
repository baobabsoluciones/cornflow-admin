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
      jobs: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
    data () {
      return {
        chartOptions: {
          chart: {
            title: 'Table title!',
            subtitle: 'subtitle of table',
          },
          page: 'enable',
          pageSize: 20,
        },
      }
    },
    computed: {
      chartData: function () {
        if (this.experiment.instance == null) {
          return
        }
        let table = this.experiment.instance.dataTable
        const jobFilter = this.jobs
        if (jobFilter.length > 0) {
          table = table.filter((row, i) => i === 0 | jobFilter.includes(row[0]))
        }
        return table
      },
    },
  }
</script>
