/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
//import Event from '@ioc:Adonis/Core/Event'


Route.group(()=>{
  Route.group(()=>{
    Route.post("/sensor","SensorsController.store")
    Route.get("/sensor","SensorsController.index")
    Route.get("/sensor/:id","SensorsController.show")
  })
  Route.group(()=>{
    Route.post("/sensorDatas","SensorsDatasController.store")
    Route.get("/sensorDatasOfDay/:sensorId","SensorsDatasController.index")
    Route.get("/sensorDatas/:sensorId","SensorsDatasController.show")

  })
  Route.group(()=>{
    Route.post("/threshold","ThresholdsController.store")
    Route.get("/threshold/:sensoId","ThresholdsController.show")
    Route.patch("/threshold/:sensorId","ThresholdsController.update")

  })

  Route.get('/', async () => {
    //Ws.io.emit('new:user', { username: 'virk' })
    //Event.emit('new:notifyUser', { body : "⛔ (seuil depassé detecté par {{sensorName}}risque à prevoir) Bonjour Monsieur/Madame nous vous informons que le seuil que vous avez renseigné viens d'être dépassé!👀 humidité actuelle : {{humidity}}💦 ; temperature actuelle : {{temperature}}🌞",clientPhoneNUmber:"+33772505898" })
    return { hello: 'all is good!!!' }
  })

}).prefix('/api')
