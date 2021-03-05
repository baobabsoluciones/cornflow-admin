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
    <v-btn
      value="Submit"
      color="success"
      class="mr-0"
      :disabled="execution==null"
      @click="loadCase"
    >
      Load case
    </v-btn>
    <v-btn
      value="Submit"
      color="success"
      class="mr-0"
      :disabled="instance==null"
      @click="solve"
    >
      Solve instance
    </v-btn>
    <v-btn
      value="Submit"
      color="success"
      class="mr-0"
      :disabled="execution==null"
      @click="getSolution"
    >
      Get solution
    </v-btn>
    <base-material-card
      icon="mdi-clipboard-text"
      title="Hackathon 2020: task scheduling"
      class="px-5 py-3"
    >
      <g-chart
        v-if="solution!=null"
        :settings="{ packages: ['gantt'] }"
        :create-chart="(el, google) => new google.visualization.Gantt(el)"
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
    <dragndrop
      @upload-file="importInstance"
    />
  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex'
  import API from '../../api/index'
  import { GChart } from 'vue-google-charts'
  import dragndrop from '../inputData/dragndrop'
  import readFile from '../inputData/read_mm'
  import treatInst from '../inputData/treatInstance'
  import treatSol from '../inputData/treatSolution'

  export default {
    components: {
      GChart,
      dragndrop,
    },
    data () {
      return {
        // execution id when sending problem to solve.
        execution: null,
        instance: null,
        solution: null,
        chartOptions: {
          height: 1000,
          chart: {
            title: '',
            subtitle: '',
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
    computed: {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: function () {
        const input = this.instance
        const output = this.solution
        if (output == null | input == null) {
          return []
        }
        const headers = [
          [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Resource' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
          ],
        ]
        const dependencies = treatInst.inputToDependencies(input)
        const durations = treatInst.inputToDurations(input)
        const newRows = output.assignment.map((el) => treatSol.outputToRow(el, durations, dependencies))
        headers.push(...newRows)
        return headers
      },
    },
    mounted () {
      this.execution = this.$store.state.execution
    },
    methods: {
      ...mapMutations({
        setExecution: 'SET_LAST_EXECUTION',
      }),
      importInstance (file) {
        var fr = new FileReader()
        const updateInstance = (data) => (this.instance = data)
        fr.onload = function () {
          const data = readFile.loadFile(fr.result)
          // console.log(data)
          updateInstance(data)
        }
        fr.readAsText(file)
      },
      solve () {
        console.log('Sending execution json to API for instance ' + this.value)
        if (!this.instance) {
          this.snack = { show: true, text: 'You need to load an instance first!', color: 'error' }
          return
        }
        const instData = { data: this.instance, name: 'gantt', data_schema: 'hk_2020_dag' }
        API.instance.create(instData)
          .then((response) => {
            if ('error' in response) {
              this.snack = { show: true, text: 'Instance creation returned error: ' + response.error + '.', color: 'error' }
              return
            }
            const data = { config: { solver: 'ortools', timeLimit: 10 }, instance_id: response.id, name: 'gant_solve', dag_name: 'hk_2020_dag' }
            API.execution.create(data)
              .then((response) => {
                if ('error' in response) {
                  this.snack = { show: true, text: 'There was an error creating the execution: ' + response.error + '.', color: 'error' }
                  return
                }
                this.execution = response.id
                this.setExecution({ execution: response.id })
              })
          })
      },
      getSolution () {
        if (!this.execution) {
          this.snack = { show: true, text: 'You first need to send an instance to solve', color: 'error' }
          return
        }
        API.execution.getOneDetail(this.execution, 'status').then((response) => {
          if (response.state === 0) {
            this.snack = { show: true, text: 'Results are not yet ready', color: 'error' }
            return
          } else if (response.state < 0) {
            this.snack = { show: true, text: 'There was an error solving the instance', color: 'error' }
            return
          }
          API.execution.getOneDetail(this.execution, 'data')
            .then((response) => {
              if ('error' in response) {
                this.snack = { show: true, text: 'There was an error retrieving the execution: ' + response.error + '.', color: 'error' }
                return
              }
              this.solution = response.data
            })
        },
        )
      },
      loadCase () {
        API.execution.getOne(this.execution).then((response) => {
          API.instance.getOneDetail(response.instance_id, 'data').then((response) => (this.instance = response.data))
          API.execution.getOneDetail(this.execution, 'data').then((response) => (this.solution = response.data))
        },
        )
      },
    },
  }
</script>

<style>
</style>
