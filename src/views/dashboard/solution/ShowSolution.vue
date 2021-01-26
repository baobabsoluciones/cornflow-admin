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
      filled
      outlined
      label="Choose an instance to watch from list"
    />
    <v-autocomplete
      v-model="selectedEx"
      :items="executions"
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
    <!-- <progress-line-chart
      :options="{ width: 800, height: 180 }"
      :dataset="dataset"
    ></progress-line-chart> -->
    <div class="py-3" />
  </v-container>
</template>

<script>
  // import ProgressLineChart from './LineGraph'
  import API from '../../../api/index'
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
        best_solution: '0',
        best_bound: '0',
        gap: '0',
        time: '0',
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

        let bound = []
        let objective = []

        try {
          bound = treatColumn(progress.CutsBestBound)
          objective = treatColumn(progress.BestInteger)
        } catch (TypeError) {
          bound = []
          objective = []
        }

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
    },
    mounted () { this.loadData() },
    methods: {
      loadData () {
        API.instance.getAll()
          .then(response => {
            if (response !== null) {
              this.instances = response.map((inst, index) => {
                return {
                  text: inst.name + ' @ ' + inst.created_at,
                  value: index,
                  executions: inst.executions
                    .filter((exec) => exec.finished)
                    .map((exec, i2) => {
                      return {
                        text: exec.config.solver + ' + ' + exec.config.timeLimit + ' @ ' + exec.created_at,
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
          this.best_solution = '0'
          this.best_bound = '0'
          this.gap = '0'
          this.time = '0'
          return null
        } else {
          this.best_solution = Number(this.executions[data].log.best_solution).toFixed(0).toString()
          this.best_bound = Number(this.executions[data].log.best_bound).toFixed(0).toString()
          this.gap = Number(this.executions[data].log.gap).toFixed(2).toString()
          this.time = Number(this.executions[data].log.time).toFixed(2).toString()
        }
      },
    },
  }
</script>
