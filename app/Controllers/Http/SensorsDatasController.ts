import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Sensor from 'App/Models/Sensor';
import Ws from 'App/Services/Ws';
import { handleThresholdExceeded } from 'App/Utils/ThresholdChecker';
import CreateSensorDataValidator from 'App/Validators/SensorData/CreateSensorDataValidator';


export default class SensorsDatasController {

    /**
    * Retrieves a list of sensors_datas from the database and returns them as a paginated JSON response.
    * @param {HttpContextContract} ctx - The HTTP context containing the request and response objects.
    * @returns {Promise<any>} A promise that resolves to the list of sensors and a 200 status code, or an error response with a 500 status code.
    */
    public async index ({request,response,params}: HttpContextContract):Promise<any> {
        // Get the current page number from the request query params, defaulting to page 1 if not provided.
        const page = request.input('page', 1)

        // Set the maximum number of sensors to return per page.
        const limit = 10


        try{
            const sensorDatas = await Database
                .rawQuery("SELECT DATE_FORMAT(created_at, '%Y-%m-%d %H:00:00') AS hour, AVG(temperature) AS temperature, AVG(humidity) AS humidity FROM sensors_datas WHERE sensor_id = ? GROUP BY hour LIMIT ? OFFSET ? ;",[params.sensorId,limit, (page - 1)*limit])    
            
            // Return a 200 JSON response containing the list of sensors.
            
            return response.ok(sensorDatas[0])
        }catch(e){
            // If there was an error retrieving the sensors from the database, return a 500 error response with a message.
            return response
                .status(500)
                .json({
                    messages : "impossible to get data, please try later"
                });
        }
        
    }

    /**
    * Stores a new sensorData in the database.
    * @param {HttpContextContract} ctx - The HTTP context containing the request and response objects.
    * @returns {Promise<any>} A promise that resolves to the newly created sensor.
    */
    public async store({request,response}:HttpContextContract):Promise<any>{
         // Validate the incoming request payload using the CreateSensorDataValidator.
         const {temperature,humidity,macAddress} = await request.validate(CreateSensorDataValidator);
         console.log(temperature,humidity)

         try{
            const getSensor:Sensor = await Sensor.findByOrFail("macAddress",macAddress)
            console.log("details/"+getSensor.id)
            //send to socket client the informations in real time
            Ws.io.emit('details/'+getSensor.id, {temperature,humidity})

            //check if threshold is over and do some tasks
            handleThresholdExceeded({temperature,humidity,macAddress},getSensor)
            // Insert the new sensor into the "sensors_datas" table in the database.
            const sensor = await Database.table("sensors_datas").insert({"temperature" :  temperature, "humidity" : humidity,"sensor_id" : getSensor.id});
 
            // Return a JSON response with the newly created sensor and a 201 status code.
            return response.status(201).json(sensor)

         }catch(e: any){
            console.log("prblm")

             // If there was an error inserting the sensor into the database, return a 500 error response with a message.
             return response
                     .status(500)
                     .json({message: "une erreur est survenue"})
         }
         
 
     }
     /**
     * Get last datasSensor 
     * @param {HttpContextContract} ctx - The HTTP context containing the request and response objects.
     * @returns {Promise<any>} A promise that resolves to the newly created sensor.
     */
     public async show({params,response}: HttpContextContract):Promise<void>{

        try{
            // Get the latest sensor data record for the specified sensor ID from the database
            const sensorData = await Database
                .from('sensors_datas')
                .where('sensor_id', params.sensorId) // filter records for the specified sensor ID
                .orderBy('id', 'desc') // sort records by ID in descending order
                .first(); // retrieve the first record from the sorted results, which will be the latest
    
            // Send an HTTP response with a 200 (OK) status and the contents of the sensorData variable
            return response.ok(sensorData);
    
        }catch(e: any){
    
            // In case of an error, send an HTTP response with a 500 (Internal Server Error) status and an error message
            response
                .status(500)
                .json({message: e});
        }
    }
    
}
