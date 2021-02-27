<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Instances"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Instances: click on an instance to show executions for the Instance"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th
              v-for="col in instCols"
              :key="col"
              class="primary--text"
            >
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(inst,i) in instances"
          >
            <tr
              :key="i"
              @click="checkInst(i, inst)"
            >
              <td>{{ inst.id }}</td>
              <td>{{ inst.name }}</td>
              <td>
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                  <div
                    v-on="on"
                    class="d-inline-block"
                  >
                    {{ inst.created_at | moment }}
                  </div>
                  </template>
                  <span>{{ inst.formatdate }}</span>
                </v-tooltip>
              </td>
              <td>
                <v-btn
                  icon
                  class="mx-0"
                  @click="showModal(inst)"
                >
                  <v-icon color="teal">
                    edit
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  class="mx-0"
                  @click="downloadInstance(inst)"
                >
                  <v-icon color="brown">
                    mdi-download
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  class="mx-0"
                  @click="deleteInstance(i, inst)"
                >
                  <v-icon color="pink">
                    delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
            <tr
              v-if="inst.contentVisible"
              :key="inst.id"
            >
              <td :colspan="5">
                <div class="accordian-body">
                  <executions-table
                    :instance-id="inst.id"
                    v-if="inst.contentVisible"
                  >
                  </executions-table>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </v-simple-table>
    </base-material-card>
    <div class="py-3" />

    <edit-modal
      v-model="showEditModal"
      :fields="modalList"
      :title="modalTitle"
      :buttonText="modalButtonText"
      @submit-form="modalFunction"
    />

    <v-snackbar
      v-model="snack.show"
      :timeout="timeout"
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
  import moment from 'moment'
  import download from 'downloadjs'
  import API from '../../../api/index'
  import EditModal from '../pages/EditModal.vue'
  export default {
    name: 'InstanceTable',
    components: {
      ExecutionsTable: () => import('./ExecutionsTable'),
      EditModal,
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow()
      },
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        instances: [],
        instCols: ['Ref', 'Name', 'Created on', 'Modified on', 'Actions'],
        snack: {
          show: false,
          text: '',
          color: 'red',
        },
        timeout: 2000,
        showEditModal: false,
        modalList: [],
        modalFunction: '',
        modalTitle: '',
        modalButtonText: '',
        instEdit: '',
      }
    },
    mounted () { this.loadData() },
    methods: {
      showModal (inst) {
        this.modalList = [
          { name: 'name', label: 'Name', value: inst.name },
          { name: 'description', label: 'Description', value: inst.description },
        ]
        this.modalFunction = this.editInstance
        this.modalTitle = 'Change instance information'
        this.modalButtonText = 'Save'
        this.showEditModal = true
        this.instEdit = inst
      },
      loadData () {
        API.instance.getAll()
          .then(response => {
            if ('error' in response) {
              this.snack = { show: true, text: response.error, color: 'error' }
              console.log(response.error)
            } else {
              this.instances = response.sort((a, b) => (a.modified_at < b.modified_at) ? 1 : -1)
              this.instances.forEach(function (instance) {
                instance.contentVisible = false
              })
              this.instances.forEach((i) => {
                i.formatdate = moment(i.created_at).format('DD-MM-YYYY HH:mm:ss')
              })
              this.snack = { show: true, text: 'Instances loaded.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error loading the instances: ' + error, color: 'error' }
          })
      },
      checkInst (i, inst) {
        inst.contentVisible = !inst.contentVisible
        this.$set(this.instances, i, inst)
      },
      editInstance (payload) {
        this.instEdit.name = payload.name.value
        this.instEdit.description = payload.description.value
        console.log('Editing instance with id: ' + this.instEdit.id)
        this.showEditModal = false
        API.instance.put(
          this.instEdit.id,
          { name: this.instEdit.name, description: this.instEdit.description },
        )
          .then((response) => {
            console.log(response)
            if ('error' in response) {
              console.log(response.error)
              this.snack = { show: true, text: 'There was an error creating the instance: ' + response.error + '.', color: 'error' }
            } else {
              this.snack = { show: true, text: 'Instance ' + this.instEdit.id + ' was edited succesfully.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error editing the instance ' + this.instEdit.id + '.', color: 'error' }
          })
      },
      deleteInstance (i, inst) {
        console.log('Deleting instance with id: ' + inst.id)
        API.instance.delete(inst.id)
          .then(() => {
            this.instances.splice(i, 1)
            this.snack = { show: true, text: 'Instance ' + inst.id + ' was deleted succesfully.', color: 'success' }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error deleting the instance ' + inst.id + '.', color: 'error' }
          })
      },
      downloadInstance (inst) {
        API.instance.getOneDetail(inst.id, 'data')
          .then(response => {
            console.log('Downloading instance: ' + inst.id)
            if ('error' in response) {
              this.snack = { show: true, text: 'There was an error downloading the instance: ' + inst.id, color: 'error' }
              console.log(response.error)
            } else {
              download(JSON.stringify(response.data), inst.id + '.json', 'text/json')
              this.snack = { show: true, text: 'Instance downloaded.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error downloading the instance: ' + inst.id, color: 'error' }
          })
      },
    },
  }
</script>

<style>
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: white;
    color: white;
}
</style>
