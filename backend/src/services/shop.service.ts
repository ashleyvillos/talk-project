import Shop from "../models/tables/Shop"
import CommonResponse from "../utils/response.utils"
import { 
    CreateShopDTO,
    UpdateShopDTO
} from '../models/dto/ShopDTO'
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
import AuthService from '../services/auth.service'
import { FindOptions, WhereOptions } from "sequelize"
import { ShopFilter } from '../models/types/Shop'
import Cart from "../models/tables/Cart"
import CartProduct from "../models/tables/CartProduct"
import Transaction from "../models/tables/Transaction"

class ShopService extends CommonResponse {
    async createShop(dto: CreateShopDTO) {
        try {
            if (dto) {
                let exist = await Shop.findOne({ where: { name: dto.name } })
                if (exist !== null) {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_EXIST_MESSAGE)
                }
                let response = await Shop.create({...dto})
                if (response) {
                    return this.RESPONSE(OK, response, 0, OK_MESSAGE)
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

    async getAllShops(offset: number, limit: number, sort: string, order: string, filter: ShopFilter) {
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

            let shop = await Shop.findAll(querySettings)
            if (shop) {
                return this.RESPONSE(OK, shop, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getShopInfo(id: number) {
        try {
            let shop = await Shop.findOne({where: { id: id }})
            if (shop !== null) {
                return this.RESPONSE(OK, shop, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async updateShop(dto: UpdateShopDTO) {
        try {
            let shop = await Shop.findOne({ where: { id: dto.id } })
            if (shop !== null) {
                let updateData = await Shop.update(dto, { where: { id: dto.id } })
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

    async deleteShop(id: number) {
        try {
            let shop = await Shop.findOne({ where: { id: id } })
            if (shop !== null) {
                let updateData = await Shop.update({ 'is_active': false }, { where: { id: id } })
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

export default new ShopService


