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
            :jobs="filter.jobs"
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
            v-if="solution!=null & instance!=null"
            :experiment="experiment"
            :height="scale.height"
            @on-select="applyfilter"
          />
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-card
          v-if="solution!=null & instance!=null"
          icon="mdi-clipboard-text"
          title="Renewable resources usage"
          class="px-5 py-3"
        >
          <graph
            v-for="(r, k) in experiment.instance.renResources"
            :key="k"
            :experiment="experiment"
            :resource="r"
            :height="scale.height/experiment.instance.renResources.length"
          />
        </base-material-card>
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
  import gantt from './gantt'
  import graph from './graph'
  import datatable from './table'
  import dragndrop from '../dashboard/components/core/dragndrop'
  import { Experiment } from '@/app/experiment'
  import { Instance } from '@/app/instance'
  import { Solution } from '@/app/solution'

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
        filter: {
          jobs: [],
        },
        scale: {
          height: 600,
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

        const updateData = (data) => {
          if (ext === 'mm') {
            // this is an instance.mm file
            this.instance = Instance.fromMM(data)
            return
          }
          const jsonData = JSON.parse(data)
          if (jsonData.durations != null) {
            // this is an instance.json file
            this.instance = new Instance(jsonData)
          } else if (jsonData.assignment != null) {
            // this is an solution.json file
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
        console.log('Sending execution json to API for instance.')
        if (!this.instance) {
          this.snack = { show: true, text: 'You need to load an instance first!', color: 'error' }
          return
        }
        this.instance.toCornflowAndSolve(this.snack, { solver: 'ortools', timeLimit: 10 })
          .then((response) => {
            this.execution = response.id
            this.setExecution({ execution: response.id })
          })
      },
      getSolution () {
        if (!this.execution) {
          this.snack = { show: true, text: 'You first need to send an instance to solve', color: 'error' }
          return
        }
        Solution.fromCornflow(this.execution, this.snack).then((solution) => (this.solution = solution))
      },
      loadCase () {
        Experiment.fromCornflow(this.execution, this.snack)
          .then((experiment) => {
            this.instance = experiment.instance
            this.solution = experiment.solution
          })
      },
      applyfilter (selection) {
        this.filter.jobs = []
        if (selection.length > 0) {
          this.filter.jobs = [selection[0]]
        }
      },
    },
  }
</script>

<style>
</style>
