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
        v-for="(stat,i) in stats_names"
        :key="i"
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          :color="stat.color"
          :icon="stat.icon"
          :title="stat.title"
          :value="stats[stat.name]"
        />
      </v-col>
    </v-row>
    <p>Original message: "{{ log }}"</p>
    <!-- <progress-line-chart
      :options="{ width: 800, height: 180 }"
      :dataset="dataset"
    ></progress-line-chart> -->
    <div class="py-3" />
    <v-alert
      v-model="alert.show"
      dense
      :type="alert.type"
      dismissible
    >
      "{{ alert.text }}"
    </v-alert>
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
        stats_names: [
          { name: 'best_solution', title: 'Best solution', icon: 'mdi-trophy-outline', color: 'info' },
          { name: 'best_bound', title: 'Best Bound', icon: 'mdi-poll', color: 'red' },
          { name: 'gap', title: 'Gap (%)', icon: 'mdi-slash-forward', color: 'success' },
          { name: 'time', title: 'Time (s)', icon: 'mdi-timer-sand-empty', color: 'orange' },
        ],
        stats: {
          best_solution: '',
          best_bound: '',
          gap: '',
          time: '',
        },
        log: null,
        alert: {
          text: '',
          show: false,
          type: 'success',
        },
      }
    },
    computed: {
      dataset: function () {
        if (this.log === null) {
          return []
        }
        if (this.log.progress === undefined) {
          return []
        }
        const progress = this.log.progress
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
                  id: inst.id,
                  text: inst.name + ' @ ' + inst.created_at,
                  value: index,
                }
              })
            }
          })
      },
    },
    watch: {
      selectedInst: function (data) {
        console.log(data)
        this.selectedEx = null
        if (data === null) {
          this.executions = []
        }
        this.stats = {
          best_solution: '',
          best_bound: '',
          gap: '',
          time: '',
        }
        API.instance.getOne(this.instances[data].id)
          .then((response) => {
            if ('error' in response) {
              this.alert = { show: true, text: 'There was an error loading executions.', type: 'error' }
            } else {
              this.executions = response.executions
                .filter((exec) => exec.finished)
                .map((exec, i2) => {
                  return {
                    id: exec.id,
                    text: exec.config.solver + ' + ' + exec.config.timeLimit + ' @ ' + exec.created_at,
                    value: i2,
                    log: exec.log_json,
                  }
                })
              this.executions.sort((a, b) => (a.modified_at < b.modified_at) ? 1 : -1)
              this.alert = { show: true, text: 'Executions loaded.', type: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.alert = { show: true, text: 'There was an error loading executions.', type: 'error' }
          })
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
          API.execution.getOneDetail(this.executions[this.selectedEx].id, 'log')
            .then((response) => {
              console.log(response)
              if ('error' in response) {
                this.alert = { show: true, text: 'There was an error loading the execution log.', type: 'error' }
              } else {
                this.alert = { show: true, text: 'Log executions loaded.', type: 'success' }
                this.log = response.log
                for (var i = 0; i < this.stats_names.length; i++) {
                  const stat = this.stats_names[i].name
                  this.stats[stat] = this.log[stat]
                }
                /* this.best_solution = Number(this.log.best_solution).toFixed(0).toString()
                this.best_bound = Number(this.log.best_bound).toFixed(0).toString()
                this.gap = Number(this.log.gap).toFixed(2).toString()
                this.time = Number(this.log.time).toFixed(2).toString() */
              }
            })
            .catch((error) => {
              console.log(error)
              this.alert = { show: true, text: 'There was an error loading execution log', type: 'error' }
            })
        }
      },
    },
  }
</script>
