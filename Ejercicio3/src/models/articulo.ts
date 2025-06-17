import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Marca } from './marca';

@Table({
  tableName: 'articulos',
  timestamps: false,
})
export class Articulo extends Model {
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

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  fechaModificacion!: Date;
  @ForeignKey(() => Marca)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  marca!: number;  

  @BelongsTo(() => Marca)
  marcaRelacionada!: Marca;  
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  estado!: boolean;
}