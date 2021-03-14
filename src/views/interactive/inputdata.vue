<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Input Data"
      link="components/simple-tables"
    />
    <dragndrop
      @on-load-file="importDataset"
    />
    <v-row>
      <v-col
        cols="12"
        lg="8"
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
            table-name="jobsMaersk"
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
          <datatable
            v-if="instance!=null"
            :experiment="experiment"
            :jobs="filter.jobs"
            table-name="resources"
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
  import datatable from './table'
  import dragndrop from '../dashboard/components/core/dragndrop'
  import { Instance } from '@/app/instance'
  import { Experiment } from '@/app/experiment'

  export default {
    name: 'Main',
    components: {
      datatable,
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
      this.instance = this.$store.state.data.instance
      this.solution = this.$store.state.data.solution
    },
    methods: {
      ...mapMutations({
        setData: 'SET_DATA',
      }),
      syncData () {
        this.setData({ instance: this.instance, solution: this.solution })
      },
      importDataset (file) {
        console.log(file)
        var fr = new FileReader()
        const ext = file.name.split('.').pop()

        const updateData = (data) => {
          if (ext === 'mm') {
            // this is an instance.mm file
            this.instance = Instance.fromMM(data)
            this.syncData()
            return
          }
          const jsonData = JSON.parse(data)
          if (jsonData.durations != null) {
            // this is an instance.json file
            this.instance = new Instance(jsonData)
            this.syncData()
          } else {
            throw new Error('Incorrect file format!')
          }
        }
        fr.onload = function () {
          updateData(fr.result)
        }
        fr.readAsText(file)
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
