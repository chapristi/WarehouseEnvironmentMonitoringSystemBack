import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Sensor from './Sensor'

export default class SensorData extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public humidity: number

  @column()
  public temperature: number

  @column()
  public sensorId : number
  
  @belongsTo(()=> Sensor)
  public sensor : BelongsTo<typeof Sensor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
