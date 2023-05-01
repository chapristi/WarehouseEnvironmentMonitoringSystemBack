import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sensor extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name : string
  @column()
  public longitude: number|null
  @column()
  public latitude: number|null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
