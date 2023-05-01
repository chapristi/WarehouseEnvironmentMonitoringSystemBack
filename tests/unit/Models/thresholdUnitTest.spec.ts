import { test } from '@japa/runner'
import Threshold from 'App/Models/Threshold'
test('test if the threshold model true', async ({ assert }) => {

  const threshold : Threshold = new Threshold()
  threshold.fill({
     humidity : 15.5,
     temperature : 25,
     sensorId : 1
     
  })
  assert.equal(15.5,threshold.humidity)
  assert.equal(25,threshold.temperature)
  assert.equal(1,threshold.sensorId)

})

test('test if the threshold model is false', async ({ assert }) => {

  const threshold : Threshold  = new Threshold()
  threshold.fill({
    humidity : 15.5,
    temperature : 25,
    sensorId : 1
  })
  assert.notEqual(32,threshold.humidity)
  assert.notEqual(64,threshold.temperature)
  assert.notEqual(2,threshold.sensorId)
 
})

test("test threshold model is empty",async({assert})=>{
  const threshold : Threshold  = new Threshold()
  threshold.fill({
    humidity : undefined,
    temperature : undefined,
    sensorId: undefined
  })
  assert.isUndefined(threshold.humidity)
  assert.isUndefined(threshold.temperature)
  assert.isUndefined(threshold.sensorId)
})
