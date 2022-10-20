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
} from 'sequelize-typescript'

@Table({ tableName: 'User' })
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @Column (DataType.STRING) username?: string;

    @Column (DataType.STRING) password?: string;

    @Default(true)
    @Column (DataType.BOOLEAN) is_active?: boolean;

    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
}

export default User


// import { 
//     Table, 
//     Column, 
//     AutoIncrement, 
//     Default, 
//     DataType, 
//     Model, 
//     CreatedAt, 
//     UpdatedAt, 
//     PrimaryKey,
//     HasOne,
//     HasMany
// } from 'sequelize-typescript'
// import Info from './Info'
// import Task from './Task'

// @Table({ tableName: 'User' })
// export class User extends Model {
//     @PrimaryKey
//     @AutoIncrement
//     @Column (DataType.INTEGER) id?: number;

//     @Column (DataType.STRING) username?: string;

//     @Column (DataType.STRING) password?: string;

//     @Default(true)
//     @Column (DataType.BOOLEAN) is_active?: boolean;

//     @HasOne(() => Info)
//     user_info: Info[] = []

//     @HasMany(() => Task)
//     task_items: Task[] = []

//     @CreatedAt createdAt?: Date;
//     @UpdatedAt updatedAt?: Date;
// }

// export default User







// import { 
//     Table, 
//     Column, 
//     AutoIncrement, 
//     Default, 
//     DataType, 
//     Model, 
//     CreatedAt, 
//     UpdatedAt, 
//     PrimaryKey,
//     ForeignKey,
//     BelongsTo
// } from 'sequelize-typescript'
// import User from './User'

// @Table({ tableName: 'Task' })
// export class Task extends Model {
//     @PrimaryKey
//     @AutoIncrement
//     @Column (DataType.INTEGER) id?: number;

//     @Column (DataType.STRING) task?: string;

//     @Column (DataType.DATE) schedule_datetime?: Date;

//     @BelongsTo(() => User)
//     user?: User = new User()

//     @ForeignKey(() => User)
//     @Column (DataType.INTEGER) user_id?: number;

//     @CreatedAt createdAt?: Date;
//     @UpdatedAt updatedAt?: Date;
// }

// export default Task