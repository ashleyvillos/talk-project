import { 
    Table, 
    Column, 
    AutoIncrement, 
    Default, 
    DataType, 
    Model, 
    CreatedAt, 
    UpdatedAt, 
    PrimaryKey,
    ForeignKey
} from 'sequelize-typescript'
import Shop from './Shop'

@Table({ tableName: 'Product' })
export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @ForeignKey(() => Shop)
    @Column (DataType.INTEGER) shop_id?: number;

    @Column (DataType.STRING) product_name?: string;

    @Column (DataType.FLOAT) price?: number;

    @Default(true)
    @Column (DataType.BOOLEAN) is_active?: boolean;

    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
}

export default Product;