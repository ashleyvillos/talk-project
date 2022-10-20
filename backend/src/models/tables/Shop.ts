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
} from 'sequelize-typescript'
import User from './User';

@Table({ tableName: 'Shop' })
export class Shop extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @ForeignKey(() => User)
    @Column (DataType.INTEGER) owner_id?: number;

    @Column (DataType.STRING) name?: string;

    @Column (DataType.STRING) address?: string;

    @Column (DataType.STRING) business_type?: string;

    @Default(true)
    @Column (DataType.BOOLEAN) is_active?: boolean;

    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
}

export default Shop;