import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Sensor from 'App/Models/Sensor'
import CreateSensorValidator from 'App/Validators/Sensor/CreateSensorValidator'


export default class SensorsController {

   /**
   * Retrieves a list of sensors from the database and returns them as a paginated JSON response.
   * @param {HttpContextContract} ctx - The HTTP context containing the request and response objects.
   * @returns {Promise<any>} A promise that resolves to the list of sensors and a 200 status code, or an error response with a 500 status code.
   */
    public async index ({request,response}: HttpContextContract):Promise<any> {
        // Get the current page number from the request query params, defaulting to page 1 if not provided.
        const page = request.input('page', 1)
        const querySearch  = request.input("q","")

        // Set the maximum number of sensors to return per page.
        const limit = 10
        try{
            // Retrieve a paginated list of sensors from the database using the page and limit values.
            const posts = await Database.from('sensors')
                .where('name', 'like', `%${querySearch}%`)
                .paginate(page, limit)
            // Return a 200 JSON response containing the list of sensors.
            return response.ok(posts)
        }catch(e){
            // If there was an error retrieving the sensors from the database, return a 500 error response with a message.
            return response
                .status(500)
                .json({
                    messages : "impossible to get data, try later"
                });
        }
        
    }
    /**
    * Stores a new sensor in the database.
    * @param {HttpContextContract} ctx - The HTTP context containing the request and response objects.
    * @returns {Promise<any>} A promise that resolves to the newly created sensor.
    */
    public async store({request,response}:HttpContextContract):Promise<any>{
       // Validate the incoming request payload using the CreateSensorValidator.
        const payload = await request.validate(CreateSensorValidator);
        try{
            // Insert the new sensor into the "sensors" table in the database.
            const sensor = await Database.table("sensors").insert(payload);

            // Return a JSON response with the newly created sensor and a 201 status code.
            return response.created(sensor)
        }catch(e: any){

            // If there was an error inserting the sensor into the database, return a 500 error response with a message.
            return response
                    .status(500)
                    .json({message: "some problem with Db tyr later"})
        }
        

    }
    /**
    * Retrieves a specific sensor by ID from the database and returns it as a JSON response.
    * @param {HttpContextContract} ctx - The HTTP context containing the request and response objects.
    * @returns {Promise<void>} A promise that resolves to a 200 status code and the requested sensor as a JSON response, or a 500 status code and an error message if the sensor cannot be found.
    */
    public async show({params,response}: HttpContextContract):Promise<void>{
        try{
            // Attempt to retrieve the requested sensor from the database using its ID.
            const sensor  = await Sensor.findOrFail(params.id);
            
            // If the sensor is found, return a 200 status code and the sensor as a JSON response.
            return response.ok(sensor);

        }catch(e: any){

            // If the sensor cannot be found, return a 500 error response with an error message
            response
                .status(500)
                .json({message: "not find"})
        }
    }
}
