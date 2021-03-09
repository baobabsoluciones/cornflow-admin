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
    <dragndrop
      @on-load-file="importDataset"
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
    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-card
          icon="mdi-clipboard-text"
          title="Input data"
          class="px-5 py-3"
        >
          <datatable
            v-if="instance!=null"
            :experiment="experiment"
          />
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-card
          icon="mdi-clipboard-text"
          title="Task schedule"
          class="px-5 py-3"
        >
          <gantt
            v-if="solution!=null"
            :experiment="experiment"
          />
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <!-- <v-row>
          <v-col
            cols="12"
            lg="12"
          > -->

        <!-- </v-col>
        </v-row> -->
        <!-- <v-row>
          <v-col
            cols="12"
            lg="12"
          > -->
        <base-material-card
          v-if="experiment.solution!=null"
          icon="mdi-clipboard-text"
          title="Renewable resources usage"
          class="px-5 py-3"
        >
          <graph
            v-for="(r, k) in experiment.instance.renResources"
            :key="k"
            :experiment="experiment"
            :resource="r"
          />
        </base-material-card>
        <!-- </v-col>
        </v-row> -->
      </v-col>
    </v-row>
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
  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex'
  import API from '../../api/index'
  import gantt from './gantt'
  import graph from './graph'
  import datatable from './table'
  import dragndrop from '../inputData/dragndrop'
  import { Experiment } from '@/core/experiment'
  import { Instance } from '@/core/instance'
  import { Solution } from '@/core/solution'

  export default {
    name: 'Main',
    components: {
      graph,
      datatable,
      gantt,
      dragndrop,
    },
    data () {
      return {
        execution: null,
        instance: null,
        solution: null,
        snack: {
          show: false,
          text: '',
          color: 'red',
          timeout: 2000,
        },
      }
    },
    computed: {
      experiment: function () {
        return new Experiment(this.instance, this.solution)
      },
    },
    mounted () {
      this.execution = this.$store.state.execution
    },
    methods: {
      ...mapMutations({
        setExecution: 'SET_LAST_EXECUTION',
      }),
      importDataset (file) {
        console.log(file)
        var fr = new FileReader()
        const ext = file.name.split('.').pop()

        // Load Solution with this same method, depending on the name of the file and try-catch
        const updateData = (data) => {
          if (ext === 'mm') {
            console.log('mm file!')
            this.instance = Instance.fromMM(data)
            return
          }
          const jsonData = JSON.parse(data)
          if (jsonData.durations != null) {
            console.log('Instance!')
            this.instance = new Instance(jsonData)
          } else if (jsonData.assignment != null) {
            console.log('Solution!')
            this.solution = new Solution(jsonData)
          } else {
            throw new Error('Incorrect file format!')
          }
        }
        fr.onload = function () {
          updateData(fr.result)
        }
        fr.readAsText(file)
      },
      solve () {
        console.log('Sending execution json to API for instance ' + this.value)
        if (!this.instance) {
          this.snack = { show: true, text: 'You need to load an instance first!', color: 'error' }
          return
        }
        // TODO: download data_schema from server and check instance matches.
        const instData = { data: this.instance.data, name: 'gantt', data_schema: 'hk_2020_dag' }
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
              this.solution = new Solution(response.data)
            })
        },
        )
      },
      loadCase () {
        API.execution.getOne(this.execution).then((response) => {
          API.instance.getOneDetail(response.instance_id, 'data').then((response) => (this.instance = new Instance(response.data)))
          API.execution.getOneDetail(this.execution, 'data').then((response) => (this.solution = new Solution(response.data)))
        },
        )
      },
    },
  }
</script>

<style>
</style>
