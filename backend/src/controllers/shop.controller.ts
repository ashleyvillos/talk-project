import ShopService from "../services/shop.service";

class ShopController {
    async createShop(requestObject: any) {
        let response = ShopService.createShop(requestObject)
        return response
    }

    async getAllShops(requestObject: any) {
        let offset = ('offset' in requestObject && requestObject.offset) ? parseInt(requestObject.offset) : 0
        let limit = ('limit' in requestObject && requestObject.limit) ? parseInt(requestObject.limit) : 5
        let sort = ('sort' in requestObject && requestObject.sort) ? requestObject.sort : 'id'
        let order = ('order' in requestObject && requestObject.order) ? requestObject.order : 'ASC'
        let filter = ('filter' in requestObject && requestObject.filter) ? requestObject.filter : {}
        let response = await ShopService.getAllShops(offset, limit, sort, order, filter)
        return response
    }

    async getShopInfo(id: number) {
        let response = ShopService.getShopInfo(id)
        return response
    }

    async updateShop(requestObject: any) {
        let response = ShopService.updateShop(requestObject)
        return response
    }

    async deleteShop(id: number) {
        let response = ShopService.deleteShop(id)
        return response
    }
}

export default new ShopController