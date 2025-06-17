import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'marcas',
  timestamps: false,
})
export class Marca extends Model {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre!: string;
}