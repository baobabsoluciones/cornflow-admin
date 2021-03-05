//import { shallowMount } from '@vue/test-utils'
import treatSol from './../../src/views/inputData/treatSolution'
import treatIns from './../../src/views/inputData/treatInstance'
import solution from './../data/oneSolution'
import instance from './../data/oneInstance'


describe('Solution', () => {
  it('restitue un message et répond correctement à la saisie de l\'utilisateur', () => {
    const durations = treatIns.inputToDurations(instance.data)
    const dependencies = treatIns.inputToDependencies(instance.data)
    const newRows = solution.data.assignment.map((el) => treatSol.outputToRow(el, durations, dependencies))
    console.log(newRows)
  })
})