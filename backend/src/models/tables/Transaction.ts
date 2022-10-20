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
import User from './User'
import Shop from './Shop'
import Cart from './Cart';

@Table({ tableName: 'Transaction' })
export class Transaction extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @ForeignKey(() => Cart)
    @Column (DataType.INTEGER) cart_id?: number;

    @Default(new Date())
    @Column (DataType.DATE) transaction_date?: Date;

    @Default('ongoing')
    @Column (DataType.STRING) transaction_status?: string;

    @Default(0)
    @Column (DataType.FLOAT) total_price?: number;

    @Default(true)
    @Column (DataType.BOOLEAN) is_active?: boolean;

    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
}

export default Transaction