import {Instance} from '@/app/instance'
import instanceData from './../data/test1.json'

describe('Instances', () => {
  let instance

  beforeEach(() => {
    instance = new Instance(instanceData)
  })

  it('read mm file and convert to json', () => {
    const table = instance.jobsMaersk
  })
  it ("calculate resources table", () => {
    const table = instance.resourcesTable
  })
})
