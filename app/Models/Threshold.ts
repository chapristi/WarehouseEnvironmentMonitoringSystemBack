import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Sensor from './Sensor'

export default class Threshold extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public humidity: number
  
  @column()
  public temperature: number

  @column()
  public sensorId : number

  @hasOne(() => Sensor)
  public sensor: HasOne<typeof Sensor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
