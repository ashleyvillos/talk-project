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
    ForeignKey,
    HasMany,
    BelongsTo
} from 'sequelize-typescript'
import Product from './Product'
import Cart from './Cart';

@Table({ tableName: 'CartProduct' })
export class CartProduct extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @ForeignKey(() => Cart)
    @Column (DataType.INTEGER) cart_id?: number;

    @ForeignKey(() => Product)
    @Column (DataType.INTEGER) product_id?: number;

    @Default(0)
    @Column (DataType.INTEGER) quantity?: number;

    @Default(true)
    @Column (DataType.BOOLEAN) is_active?: boolean;

    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;

    @BelongsTo(() => Cart)
    cart?: Cart = new Cart()

    @BelongsTo(() => Product)
    product?: Product = new Product
}

export default CartProduct;