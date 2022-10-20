import Product from "../models/tables/Product"
import Shop from "../models/tables/Shop"
import CommonResponse from "../utils/response.utils"
import { 
    CreateProductDTO,
    UpdateProductDTO
} from '../models/dto/ProductDTO'
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
import { ProductFilter } from '../models/types/Product'

class ProductService extends CommonResponse {
    async createProduct(dto: CreateProductDTO) {
        try {
            if (dto) {
                let exist = await Product.findOne({ where: { product_name: dto.product_name } })
                if (exist !== null) {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_EXIST_MESSAGE)
                }
                
                let shop = await Shop.findOne({ where: { id: dto.shop_id } })
                if (shop !== null && !shop!.getDataValue('is_active')) {
                    return this.RESPONSE(BADREQUEST, {}, 0, "Shop is deactivated")
                } else if (shop === null) {
                    return this.RESPONSE(BADREQUEST, {}, 0, "Shop does not exist")
                }

                let response = await Product.create({...dto})
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

    async getAllProducts(offset: number, limit: number, sort: string, order: string, filter: ProductFilter) {
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
                if (['id', 'shop_id', 'price'].includes(key)) {
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

            let product = await Product.findAll(querySettings)
            if (product) {
                return this.RESPONSE(OK, product, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getProductInfo(id: number) {
        try {
            let product = await Product.findOne({where: { id: id }})
            if (product !== null) {
                return this.RESPONSE(OK, product, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async updateProduct(dto: UpdateProductDTO) {
        try {
            let product = await Product.findOne({ where: { id: dto.id } })
            if (product !== null) {
                let updateData = await Product.update(dto, { where: { id: dto.id } })
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

    async deleteProduct(id: number) {
        try {
            let product = await Product.findOne({ where: { id: id } })
            if (product !== null) {
                let updateData = await Product.update({ 'is_active': false }, { where: { id: id } })
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

export default new ProductService


