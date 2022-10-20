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
import User from './User'
import Product from './Product'
import Shop from './Shop'
import CartProduct from './CartProduct'
import Transaction from './Transaction'

@Table({ tableName: 'Cart' })
export class Cart extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @ForeignKey(() => User)
    @Column (DataType.INTEGER) user_id?: number;

    @ForeignKey(() => Shop)
    @Column (DataType.INTEGER) shop_id?: number;

    @Default(1)
    @Column (DataType.INTEGER) item_count?: number;

    @Default(true)
    @Column (DataType.BOOLEAN) is_active?: boolean;

    @Default(0)
    @Column(DataType.FLOAT) total_price?: number

    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;

    @BelongsTo(() => Shop)
    shop: Shop = new Shop

    @HasMany(() => CartProduct)
    cart_products: CartProduct[] = []

    @HasMany(() => Transaction)
    transactions: Transaction[] = []
}

export default Cart;