import CartService from "../services/cart.service";

class CartController {
    async createCart(requestObject: any) {
        let response = CartService.createCart(requestObject)
        return response
    }

    async getAllCarts(requestObject: any) {
        let offset = ('offset' in requestObject && requestObject.offset) ? parseInt(requestObject.offset) : 0
        let limit = ('limit' in requestObject && requestObject.limit) ? parseInt(requestObject.limit) : 5
        let sort = ('sort' in requestObject && requestObject.sort) ? requestObject.sort : 'id'
        let order = ('order' in requestObject && requestObject.order) ? requestObject.order : 'ASC'
        let filter = ('filter' in requestObject && requestObject.filter) ? requestObject.filter : {}
        let response = await CartService.getAllCarts(offset, limit, sort, order, filter)
        return response
    }

    async getCartInfo(id: number) {
        let response = CartService.getCartInfo(id)
        return response
    }

    async updateCart(requestObject: any) {
        let response = CartService.updateCart(requestObject)
        return response
    }

    async deleteCart(id: number) {
        let response = CartService.deleteCart(id)
        return response
    }

    async checkoutCart(id: number) {
        let response = CartService.checkoutCart(id)
        return response
    }
}

export default new CartController