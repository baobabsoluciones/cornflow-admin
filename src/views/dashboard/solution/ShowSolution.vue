<template>
  <v-container
    id="show-solution"
    fluid
    tag="section"
  >
    <p>Choose an execution to watch from the dropdown list:</p>
    <v-autocomplete
      v-model="selectedInst"
      :items="instances"
      item-text="name"
      item-value="value"
    />
    <v-autocomplete
      v-model="selectedEx"
      :items="executions"
      item-text="name"
      item-value="value"
    />
    <base-v-component
      heading="Show an execution"
    />
    <!-- <p>Original message: "{{ selectedLog }}"</p> -->
    <progress-line-chart
      :options="{ width: 800, height: 180 }"
      :dataset="dataset"
    ></progress-line-chart>
    <div class="py-3" />
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { getInstance } from '@/api'
  import ProgressLineChart from './LineGraph'
  export default {
    name: 'ShowExecution',
    components: {
      ProgressLineChart,
    },
    data () {
      return {
        selectedInst: null,
        selectedEx: null,
        instances: [],
        executions: [],
      }
    },
    computed: {
      selectedLog: function () {
        if (this.selectedEx === null | this.selectedEx > this.executions.length) {
          return null
        }
        return this.executions[this.selectedEx].log
      },
      dataset: function () {
        if (this.selectedLog === null) {
          return []
        }
        if (this.selectedLog.progress === undefined) {
          return []
        }
        const progress = this.selectedLog.progress
        /* const bound = progress.CutsBestBound.map((el) => Number(el))
        const objective = progress.BestInteger.map((el) => Number(el)) */
        /* TODO: workaround because there is an issue with cornflow...: */
        /* a.substring(2, a.length-2).split("', '").map(Number) */
        const treatColumn = (col) => col.substring(2, col.length - 2).split("', '").map(Number)
        const bound = treatColumn(progress.CutsBestBound)
        const objective = treatColumn(progress.BestInteger)

        const formatData = []
        for (var i = 0; i < bound.length; i++) {
          formatData.push({
            x: i,
            y2: bound[i],
            y: objective[i],
          })
        }
        return formatData
      },
      ...mapState(['url', 'user']),
    },
    mounted () { this.loadData() },
    methods: {
      loadData () {
        getInstance(this.url, this.user.token)
          .then(response => {
            if (response !== null) {
              this.instances = response.map((inst, index) => {
                return {
                  name: inst.name + ' @ ' + inst.created_at,
                  value: index,
                  executions: inst.executions
                    .filter((exec) => exec.finished)
                    .map((exec, i2) => {
                      return {
                        name: exec.config.solver + ' + ' + exec.config.timeLimit + ' @ ' + exec.created_at,
                        value: i2,
                        log: exec.log_json,
                      }
                    }),
                }
              })
            }
          })
      },
    },
    watch: {
      selectedInst (data) {
        this.selectedEx = null
        if (data === null) {
          this.executions = []
        }
        this.executions = this.instances[data].executions
        if (this.executions.length > 0) {
          this.selectedEx = 0
        }
      },
    },
  }
</script>
