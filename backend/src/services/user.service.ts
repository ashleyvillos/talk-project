import User from "../models/tables/User"
import CommonResponse from "../utils/response.utils"
import { 
    UpdateUserDTO,
    SignupDTO,
    LoginDTO
} from '../models/dto/UserDTO'
import { OK, CREATED, UPDATE, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR } from '../utils/constants.utils'
import { 
    OK_MESSAGE, 
    CREATED_MESSAGE, 
    UPDATE_MESSAGE, 
    NOTFOUND_MESSAGE, 
    BADREQUEST_MESSAGE, 
    INTERNAL_SERVER_ERROR_MESSAGE, 
    BADREQUEST_EXIST_MESSAGE 
} from '../utils/message.utils'
import bcrypt from 'bcrypt'
import AuthService from '../services/auth.service'
import { FindOptions, WhereOptions } from "sequelize"
import { UserInfoFilter } from '../models/types/User'

class UserService extends CommonResponse {
    async login(dto: LoginDTO) {
        try {
            let user = await User.findOne({ where: { username: dto.username } })
            if (user !== null) {
                let passwordConfirm = await bcrypt.compare(dto.password as string, user.getDataValue('password'))
                if (passwordConfirm) {
                    let token = await AuthService.auth(user?.get())
                    return this.RESPONSE(OK, token.response, 0, OK_MESSAGE)
                    
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async signup(dto: SignupDTO) {
        try {
            if (dto) {
                let exist = await User.findOne({ where: { username: dto.username } })
                if (exist !== null) {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_EXIST_MESSAGE)
                }

                if (dto.password === dto.confirm_password) {
                    let hashPassword = await bcrypt.hash(dto.password as string, 10)
                    let response = await User.create({
                        username: dto.username,
                        password: hashPassword,
                        is_active: true
                    })
                    if (response) {
                        return this.RESPONSE(OK, response, 0, OK_MESSAGE)
                    } else {
                        return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                    }
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }
            
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getAllUsers(offset: number, limit: number, sort: string, order: string, filter: UserInfoFilter) {
        try {
            let querySettings: FindOptions<any> = {
                offset: offset,
                limit: limit,
                order: [[sort, order]],
            }
            
            let hasFilter = false
            let where: WhereOptions<any> = {}
            for (let [key, value] of Object.entries(filter)) {
                hasFilter=  true
                if (key === 'id') {
                    where[key] = parseInt(value)
                } else if (key === 'is_active') {
                    where[key] = (value === 'true')
                } else {
                    where[key] = value
                }
            }

            if (hasFilter) {
                querySettings['where'] = where
            }

            let user = await User.findAll(querySettings)
            if (user) {
                return this.RESPONSE(OK, user, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getUserInfo(id: number) {
        try {
            let user = await User.findOne({where: { id: id }})
            if (user !== null) {
                return this.RESPONSE(OK, user, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async updateUser(dto: UpdateUserDTO) {
        try {
            let user = await User.findOne({ where: { id: dto.id } })
            if (user !== null) {
                if ('password' in dto) {
                    dto.password = await bcrypt.hash(dto.password as string, 10)
                }
                let updateData = await User.update(dto, { where: { id: dto.id } })
                if (updateData) {
                    return this.RESPONSE(UPDATE, updateData, 0, UPDATE_MESSAGE)    
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)    
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async deleteUser(id: number) {
        try {
            let user = await User.findOne({ where: { id: id } })
            if (user !== null) {
                let updateData = await User.update({ 'is_active': false }, { where: { id: id } })
                if (updateData) {
                    return this.RESPONSE(UPDATE, updateData, 0, UPDATE_MESSAGE)    
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)    
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

export default new UserService


