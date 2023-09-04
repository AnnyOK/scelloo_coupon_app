import { Cart } from './carts';
import {
    Table,
    Model,
    Column,
    DataType,
    AutoIncrement,
    Sequelize,
    HasMany,
  } from 'sequelize-typescript'
  
  @Table({
    timestamps: false,
    tableName: 'users',
  })
  export class User extends Model {
    // @AutoIncrement
    @Column({
      type: DataType.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue:DataType.UUIDV4
    })
    id!: number
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    first_name!: string
  
    @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      last_name!: string

      @HasMany(()=>Cart)
      declare carts:Cart[]
    
   
    
  
  }
  