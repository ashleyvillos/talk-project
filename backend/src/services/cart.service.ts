import Cart from "../models/tables/Cart"
import CartProduct from "../models/tables/CartProduct"
import Product from "../models/tables/Product"
import User from "../models/tables/User"
import Shop from "../models/tables/Shop"
import Transaction from "../models/tables/Transaction"
import CommonResponse from "../utils/response.utils"
import { 
    CreateCartDTO,
    UpdateCartDTO
} from '../models/dto/CartDTO'
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
import { FindOptions, Sequelize, WhereOptions } from "sequelize"
import { CartFilter } from '../models/types/Cart'
import { Op } from "sequelize"

class CartService extends CommonResponse {
    async _validateCart(userId: number, shopId: number, productId: number) {
        // validate if user is existing
        let user = await User.findOne({ where: { id: userId, is_active: true } })
        if (user === null) {
            return { message: 'User does not exist', valid: false }
        }

        // validate if shop is existing
        let shop = await Shop.findOne({ where: { id: shopId, is_active: true } })
        if (shop === null) {
            return { message: 'Shop does not exist', valid: false }
        }

        // validate if product exists in specified shop id
        // validate if product is active
        let product = await Product.findOne({ where: { id: productId, shop_id: shopId } })
        if (product === null || !product.getDataValue('is_active')) {
            return { message: 'Product does not exist', valid: false }
        } 

        return { valid: true }
    }

    // create cart if it does not exist
    async _processCart(userId: number, shopId: number) {
        if (userId === -1 || shopId === -1) {
            return null
        }

        // check if cart exists
        let cart  = await Cart.findOne({
            where: {
                user_id: userId,
                shop_id: shopId,
                is_active: true
            }
        })

        if (cart === null) {
            cart = await Cart.create({
                user_id: userId,
                shop_id: shopId
            })
        }

        return cart
    }

    async _processCartProduct(cartId: number, productId: number, quantity: number) {
        if (cartId === -1 || productId === -1 || quantity <= 0) {
            return null
        }

        // check CartProduct if product exists
        let cartProduct = await CartProduct.findOne({
            where: {
                cart_id: cartId,
                product_id: productId,
                is_active: true
            }
        })

        if (cartProduct !== null) {
            // update quantity (add)
            let update = await CartProduct.increment(
                'quantity', 
                { 
                    by: quantity, 
                    where: { 
                        cart_id: cartId,
                        product_id: productId
                    } 
                }
            )

            return (update) ? update : null
        } else {
            cartProduct = await CartProduct.create({
                cart_id: cartId,
                product_id: productId,
                quantity: quantity
            })
            let update = await Cart.increment('item_count', { by: 1, where: { id: cartId } })

            return (cartProduct && update) ? cartProduct : null
        }
    }

    async _recomputePrice(cartId: number) {
        let cartProducts = await CartProduct.findAll({
            where: { cart_id: cartId, is_active: true },
            attributes: ['product_id', 'quantity']
        })

        let prodQuantity: any = {}
        let productId = []
        for (let cp of cartProducts) {
            prodQuantity[cp.getDataValue('product_id')] = cp.getDataValue('quantity')
            productId.push(cp.getDataValue('product_id'))
        }

        let product = await Product.findAll({
            where: { id: productId },
            attributes: ['id', 'price']
        })

        // calculate sum
        let sum = 0
        for (let prod of product) {
            let prodId = prod.getDataValue('id')
            let price = prod.getDataValue('price')
            sum += (price * prodQuantity[prodId])
        }

        await Cart.update({ total_price: sum }, { where: { id: cartId } })

        return 
    }

    async createCart(dto: CreateCartDTO) {
        try {
            if (dto) {
                // validate user, shop, and product if existing
                let cartValidation = await this._validateCart(dto.user_id || 0, dto.shop_id || 0, dto.product_id || 0)
                if (!cartValidation.valid) {
                    return this.RESPONSE(BADREQUEST, {}, 0, cartValidation.message)    
                }
                
                // // check if shop cart exists
                // let exist = await Cart.findOne({ 
                //     include: {
                //         model: CartProduct,
                //         as: 'cart_products',
                //         required: true,
                //         duplicating: false,
                //         attributes: []
                //     },
                //     where: { 
                //         [Op.and] : [
                //             { user_id: dto.user_id },
                //             { shop_id: dto.shop_id },
                //             { '$cart_products.product_id$': 1  },
                //             { is_active: true }
                //         ]
                //     } ,
                //     attributes: { exclude: ['is_active'] }
                // })

                // if (exist !== null) {
                //     // add quantity  
                //     if (exist.getDataValue('item_count') >= 5) {
                //         return this.RESPONSE(BADREQUEST, {}, 0, "Cart Limit Exceeded")    
                //     } else {
                //         await CartProduct.increment('quantity', { by: 1, where: { cart_id: exist.getDataValue('id') } })
                //         return this.RESPONSE(OK, {}, 0, OK_MESSAGE)
                //     }
                // }
                
                // create cart if it does not exist
                // get cart instance if it exists
                let cart  = await this._processCart(dto.user_id || -1, dto.shop_id || -1)

                if (cart && cart?.getDataValue('item_count') >= 5) {
                    return this.RESPONSE(BADREQUEST, {}, 0, 'CART LIMIT EXCEEDED')
                } else if (cart !== null) {
                    let cartProduct = await this._processCartProduct(cart?.getDataValue('id'), dto.product_id || -1 , dto.quantity || -1)
                    if (cartProduct !== null) {
                        await this._recomputePrice(cart.getDataValue('id'))
                        return this.RESPONSE(OK, {}, 0, OK_MESSAGE)
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

    async getAllCarts(offset: number, limit: number, sort: string, order: string, filter: CartFilter) {
        try {
            let querySettings: FindOptions<any> = {
                include: [
                    { 
                        model: CartProduct, 
                        as: 'cart_products',
                        attributes: ['id', 'cart_id', 'product_id', 'quantity']
                    },
                    { 
                        model: Shop, 
                        as: 'shop',
                        attributes: {
                            exclude: ['is_active', 'createdAt', 'updatedAt']
                        }
                    }
                ],
                offset: offset,
                limit: limit,
                order: [[sort, order]],
                attributes: []
            }
            
            let hasFilter = false
            let where: WhereOptions<any> = {}
            for (let [key, value] of Object.entries(filter)) {
                hasFilter=  true
                if (key === 'is_active') {
                    where[key] = (value === 'true')
                } else {
                    where[key] = parseInt(value)
                }
            }

            if (hasFilter) {
                querySettings['where'] = where
            }

            let cart = await Cart.findAll(querySettings)
            if (cart) {
                return this.RESPONSE(OK, cart, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getCartInfo(id: number) {
        try {
            let cart = await Cart.findOne({where: { id: id }})
            if (cart !== null) {
                return this.RESPONSE(OK, cart, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async updateCart(dto: UpdateCartDTO) {
        console.log(dto)
        try {
            let cartProduct = await CartProduct.findOne({ where: { cart_id: dto.cart_id, product_id: dto.product_id } })
            if (cartProduct !== null) {
                cartProduct.set(dto)
                let updateData = await cartProduct.save()

                if ('quantity' in dto) {
                    await this._recomputePrice(dto.cart_id || 0)
                }

                if (updateData) {
                    return this.RESPONSE(UPDATE, updateData, 0, UPDATE_MESSAGE)    
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)    
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            console.log(err)
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async deleteCart(id: number) {
        try {
            let cart = await Cart.findOne({ where: { id: id } })
            if (cart !== null) {
                let deleteCart = await Cart.update({ 'is_active': false }, { where: { id: id } })
                let deleteCartProducts = await CartProduct.update({ is_active: false }, { where: { cart_id: cart.getDataValue('id') } })
                if (deleteCart && deleteCartProducts) {
                    return this.RESPONSE(UPDATE, deleteCart, 0, UPDATE_MESSAGE)    
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

    async _checkoutValidation(cartId: number) {
        let cart = await Cart.findOne({ 
            include: [
                {
                    model: Shop,
                    as: 'shop'
                    // where: { is_active: true }
                },
                {
                    model: Transaction,
                    as: 'transactions'
                }
            ],
            where: { id: cartId, is_active: true } 
        })

        let shop = cart?.getDataValue('shop')
        let transactions = cart?.getDataValue('transactions')
        
        if (cart === null) {
            return { valid: false, message: 'Cart does not exist' }
        } else if (!transactions || transactions.length == 0) {
            
        }

        // check if shop is still active
        // console.log(cart.getDataValue('shop'))
        // console.log(cart.getDataValue('transactions'))
        // console.log('qweqwe')

        return { valid: true }
    }

    async checkoutCart(id: number) {
        try {
            let checkoutValidation = await this._checkoutValidation(id)
            if (!checkoutValidation.valid) {
                return this.RESPONSE(BADREQUEST, {}, 0, checkoutValidation.message)         
            }

            



            return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            // if (cart !== null) {
            //     let deleteCart = await Cart.update({ 'is_active': false }, { where: { id: id } })
            //     let deleteCartProducts = await CartProduct.update({ is_active: false }, { where: { cart_id: cart.getDataValue('id') } })
            //     if (deleteCart && deleteCartProducts) {
            //         return this.RESPONSE(UPDATE, deleteCart, 0, UPDATE_MESSAGE)    
            //     } else {
            //         return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)    
            //     }
            // } else {
            //     return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            // }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

export default new CartService


