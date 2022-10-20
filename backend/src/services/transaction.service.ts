import CommonResponse from "../utils/response.utils"
import { 
    CreateTxDTO,
    UpdateTxDTO
} from '../models/dto/TransactionDTO'
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
import { FindOptions, WhereOptions } from "sequelize"
import { TxFilter } from '../models/types/Transaction'
import Transaction from "../models/tables/Transaction"
import Cart from "../models/tables/Cart"
import Shop from "../models/tables/Shop"
import CartProduct from "../models/tables/CartProduct"

class TransactionService extends CommonResponse {
    async _validateTransactions(cartId: number) {
        // validate if cart is existing
        let cart = await Cart.findOne({ where: { id: cartId, is_active: true } })
        if (cart === null) {
            return { message: 'Cart does not exist', valid: false }
        }

        // validate if shop still exists
        let shopId = cart.getDataValue('shop_id')
        let shop = await Shop.findOne({ where: { id: shopId, is_active: true } })
        if (shop === null) {
            return { message: 'Shop does not exist', valid: false }
        }

        // validate if cart has existing transaciton
        let tx = await Transaction.findOne({ where: { cart_id: cartId, is_active: true } })
        if (tx !== null) {
            return { message: 'Cart has an existing transaction', valid: false }
        }

        return { valid: true }
    }

    async createTransaction(dto: CreateTxDTO) {
        try {
            if (dto) {
                let txValidation = await this._validateTransactions(dto.cart_id || -1)
                if (!txValidation.valid) {
                    return this.RESPONSE(BADREQUEST, {}, 0, txValidation.message)    
                }

                // get cart products
                let cartProducts = CartProduct.findAll({ where: { cart_id: dto.cart_id } })
              
                let response = await Transaction.create({...dto})
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

    // async getAllCarts(offset: number, limit: number, sort: string, order: string, filter: CartFilter) {
    //     try {
    //         let querySettings: FindOptions<any> = {
    //             offset: offset,
    //             limit: limit,
    //             order: [[sort, order]],
    //         }
            
    //         let hasFilter = false
    //         let where: WhereOptions<any> = {}
    //         for (let [key, value] of Object.entries(filter)) {
    //             hasFilter=  true
    //             if (key === 'is_active') {
    //                 where[key] = (value === 'true')
    //             } else {
    //                 where[key] = parseInt(value)
    //             }
    //         }

    //         if (hasFilter) {
    //             querySettings['where'] = where
    //         }

    //         let cart = await Cart.findAll(querySettings)
    //         if (cart) {
    //             return this.RESPONSE(OK, cart, 0, OK_MESSAGE)
    //         } else {
    //             return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
    //         }
    //     } catch(err) {
    //         return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
    //     }
    // }

    // async getCartInfo(id: number) {
    //     try {
    //         let cart = await Cart.findOne({where: { id: id }})
    //         if (cart !== null) {
    //             return this.RESPONSE(OK, cart, 0, OK_MESSAGE)
    //         } else {
    //             return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
    //         }
    //     } catch(err) {
    //         return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
    //     }
    // }

    // async updateCart(dto: UpdateCartDTO) {
    //     try {
    //         let cart = await Cart.findOne({ where: { id: dto.id } })
    //         if (cart !== null) {
    //             let updateData = await Cart.update(dto, { where: { id: dto.id } })
    //             if (updateData) {
    //                 return this.RESPONSE(UPDATE, updateData, 0, UPDATE_MESSAGE)    
    //             } else {
    //                 return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)    
    //             }
    //         } else {
    //             return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
    //         }
    //     } catch(err) {
    //         return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
    //     }
    // }

    // async deleteCart(id: number) {
    //     try {
    //         let cart = await Cart.findOne({ where: { id: id } })
    //         if (cart !== null) {
    //             let updateData = await Cart.update({ 'is_active': false }, { where: { id: id } })
    //             if (updateData) {
    //                 return this.RESPONSE(UPDATE, updateData, 0, UPDATE_MESSAGE)    
    //             } else {
    //                 return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)    
    //             }
    //         } else {
    //             return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
    //         }
    //     } catch(err) {
    //         return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
    //     }
    // }
}

export default new TransactionService


