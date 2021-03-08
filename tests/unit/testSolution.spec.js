//import { shallowMount } from '@vue/test-utils'
import readMM from './../../src/views/inputData/read_mm'
import treatSol from './../../src/views/inputData/treatSolution'
import treatIns from './../../src/views/inputData/treatInstance'
import solution from './../data/oneSolution'
import instance from './../data/oneInstance'
import fs from 'fs'


describe('SolutionfromJson', () => {
  it('read an instance and a solution and treat solution', () => {
    const durations = treatIns.inputToDurations(instance.data)
    const dependencies = treatIns.inputToDependencies(instance.data)
    const newRows = solution.data.assignment.map((el) => treatSol.outputToRow(el, durations, dependencies))
    // console.log(newRows)
  })
})


describe('SolutionfromMM', () => {
  it('read mm file and convert to json', () => {
    const readAndConvert = function (data) {
      const result = readMM.loadFile(data)
      expect(result).toEqual(instance.data)
    }
    // let exists = fs.existsSync('tests/data/c1564_9.mm')
    // let _files = fs.readdirSync('@/')
    fs.readFile('tests/data/c1564_9.mm', (err, data) => readAndConvert(data))
  })
})


