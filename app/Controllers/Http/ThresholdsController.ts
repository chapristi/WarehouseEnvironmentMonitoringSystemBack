 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Threshold from 'App/Models/Threshold';
import CreateThresholdValidator from 'App/Validators/Threshold/CreateThresholdValidator';
import UpdateThresholdValidator from 'App/Validators/Threshold/UpdateThresholdValidator';

export default class ThresholdsController {
    /**
    * Stores a new threshold in the database.
    * @param {HttpContextContract} ctx - The HTTP context containing the request and response objects.
    * @returns {Promise<any>} A promise that resolves to the newly created sensor.
    */
    public async store({request,response}:HttpContextContract):Promise<any>{
        // Validate the incoming request payload using the CreateSensorDataValidator.
        const {sensorId,humidity,temperature} = await request.validate(CreateThresholdValidator);

        try{
            // Insert the new sensor into the "thresholds" table in the database.
            const sensor = await Database.table("thresholds").insert({"sensor_id":sensorId,"humidity":humidity,"temperature" :temperature});

            // Return a JSON response with the newly created sensor and a 201 status code.
            return response.status(201).json(sensor)

        }catch(e: any){

            // If there was an error inserting the sensor into the database, return a 500 error response with a message.
            return response
                    .status(500)
                    .json({message: "try again later"})
        }

    }
    /**
    * Retrieves a specific threshold by ID from the database and returns it as a JSON response.
    * @param {HttpContextContract} ctx - The HTTP context containing the request and response objects.
    * @returns {Promise<void>} A promise that resolves to a 200 status code and the requested sensor as a JSON response, or a 500 status code and an error message if the sensor cannot be found.
    */
    public async show({params,response}: HttpContextContract):Promise<void>{
        try{
            // Attempt to retrieve the requested Threshold from the database using its ID.
            const threshold  = await Threshold.findByOrFail("sensorId", params.sensoId);
            
            // If the Threshold is found, return a 200 status code and the Thresholdas a JSON response.
            return response.ok(threshold);

        }catch(e: any){

            // If the Threshold cannot be found, return a 500 error response with an error message
            response
                .status(500)
                .json({message: "the threshold you want does not exist"})
        }
    }
    public async update({request,params,response}: HttpContextContract): Promise<any>
    {
        try{
            const payload = await request.validate(UpdateThresholdValidator)
            const threshold: Threshold = await Threshold.findByOrFail("sensorId",params.sensorId)
            await threshold
              .merge(payload)
              .save()
            return response
              .ok({
                message: "the threshold has been updated succefully",
                threshold : threshold
              })
        }catch (err : any){
          return response
            .status(500)
            .json({
                  message: "impossible to update the game,try later"
            })
        }
    }
}
