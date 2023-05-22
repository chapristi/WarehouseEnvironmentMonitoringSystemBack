import Sensor from "App/Models/Sensor";
import Threshold from "App/Models/Threshold";
import Event from '@ioc:Adonis/Core/Event'

interface SensorData{
    macAddress: string,
    temperature: number,
    humidity: number  
}
async function checkThreshold(sensorData:SensorData,sensor:Sensor): Promise<boolean> {
    try{
        const threshold = await Threshold.findByOrFail("id",sensor.id)
        if (sensorData.humidity > threshold.humidity || sensorData.temperature > threshold.temperature){
            return true
        }
        return false
    }catch(e){
        return false
    }
    

}
  
export async function handleThresholdExceeded(sensorData:SensorData,sensor:Sensor) {
    const check = await checkThreshold(sensorData,sensor)
    if (check){
        console.error("message envoyé")
        //on envoie un sms car au propietaire 
        Event.emit('new:notifyUser', { body : `\n⛔ (seuil depassé detecté par ${sensor.name} risque à prevoir)\nBonjour Monsieur/Madame nous vous informons que le seuil que vous avez renseigné viens d'être dépassé 👀\nhumidité actuelle: ${sensorData.humidity}% 💧\ntemperature actuelle: ${sensorData.temperature}°C 🌞`,clientPhoneNUmber:"+33772505898" })
    }
    
}