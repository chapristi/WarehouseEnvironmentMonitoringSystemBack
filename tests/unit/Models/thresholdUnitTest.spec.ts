import { test } from '@japa/runner'
import Threshold from 'App/Models/Threshold'
test('test threshold model true', async ({ assert }) => {

  const threshold : Threshold = new Threshold()
  threshold.fill({
     humidity : 15.5,
     temperature : 25
     
  })
  assert.equal(15.5,threshold.humidity)
  assert.equal(25,threshold.temperature)

})
/*
test('test game entity is false', async ({ assert }) => {

  const game : Game  = new Game()
  game.fill({
      longitude: 'false',
      latitude: 'false', 
  })
  assert.notEqual("true",game.longitude)
  assert.notEqual("true",game.latitude)
 
})

test("test user entity is empty",async({assert})=>{
  const game : Game  = new Game()
  game.fill({
      longitude: '',
      latitude: '', 

  })
  assert.empty(game.longitude)
  assert.empty(game.latitude)
})
*/