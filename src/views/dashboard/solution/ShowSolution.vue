<template>
  <v-container
    id="show-solution"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Show an execution"
    />
    <v-autocomplete
      v-model="selectedInst"
      :items="instances"
      item-text="name"
      item-value="value"
      filled
      outlined
      label="Choose an instance to watch from list"
    />
    <v-autocomplete
      v-model="selectedEx"
      :items="executions"
      item-text="name"
      item-value="value"
      filled
      outlined
      label="Choose an execution to watch from list"
    />
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-trophy-outline"
          title="Best solution"
          :value="best_solution"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="red"
          icon="mdi-poll"
          title="Best bound"
          :value="best_bound"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="success"
          icon="mdi-slash-forward"
          icon-height="199"
          title="Gap (%)"
          :value="gap"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-timer-sand-empty"
          title="Time (s)"
          :value="time"
        />
      </v-col>
    </v-row>
    <p>Original message: "{{ selectedLog }}"</p>
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
  // import ProgressLineChart from './LineGraph'
  export default {
    name: 'ShowExecution',
    components: {
      // ProgressLineChart,
    },
    data () {
      return {
        selectedInst: null,
        selectedEx: null,
        instances: [],
        executions: [],
        best_solution: 0,
        best_bound: 0,
        gap: 0,
        time: 0,
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
        console.log(this.selectedLog)
        const progress = this.selectedLog.progress
        /* const bound = progress.CutsBestBound.map((el) => Number(el))
        const objective = progress.BestInteger.map((el) => Number(el)) */
        /* TODO: workaround because there is an issue with cornflow...: */
        /* a.substring(2, a.length-2).split("', '").map(Number) */
        const treatColumn = (col) => col.substring(2, col.length - 2).split("', '").map(Number)

        console.log(progress)

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
      selectedInst: function (data) {
        this.selectedEx = null
        if (data === null) {
          this.executions = []
        }
        this.executions = this.instances[data].executions
        if (this.executions.length > 0) {
          this.selectedEx = null
        }
      },
      selectedEx: function (data) {
        if (this.selectedEx === null | this.selectedEx > this.executions.length) {
          return null
        } else {
          this.best_solution = Number(this.executions[data].log.best_solution).toFixed(0)
          this.best_bound = Number(this.executions[data].log.best_bound).toFixed(0)
          this.gap = Number(this.executions[data].log.gap).toFixed(2)
          this.time = Number(this.executions[data].log.time).toFixed(2)
        }
      },
    },
  }
</script>
