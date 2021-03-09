import { shallowMount, createLocalVue } from '@vue/test-utils'
import main from '@/views/interactive/main'
import instance from './../data/oneInstance'
import fs from 'fs'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('testMainComponent', () => {
  let cmp
  let actions
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      actions
    })
    cmp = shallowMount(main, { store, localVue })
  })

  it("imports a file", () => {
    // const path = 'tests/data/c1564_9.mm'
    // const readAndConvert = function (stats) {
    //   const data = cmp.vm.importInstance(stats)
    //   expect(result).toEqual(instance.data)
    // }
    // let response = fetch(path).then((resp)=>{
    //   let data = resp.blob()
    //   const contents = cmp.vm.importInstance(data)
    // })
    // fs.stat(path, (err, stats)=> readAndConvert(stats))
    // fs.readFile(path, (err, data) => readAndConvert(data))
  })
  // expect(wrapper.text()).toContain('Hello world')
})
