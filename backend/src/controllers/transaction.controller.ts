import TransactionService from "../services/transaction.service";

class TransactionController {
    async createTransaction(requestObject: any) {
        let response = TransactionService.createTransaction(requestObject)
        return response
    }

    // async getAllShops(requestObject: any) {
    //     let offset = ('offset' in requestObject && requestObject.offset) ? parseInt(requestObject.offset) : 0
    //     let limit = ('limit' in requestObject && requestObject.limit) ? parseInt(requestObject.limit) : 5
    //     let sort = ('sort' in requestObject && requestObject.sort) ? requestObject.sort : 'id'
    //     let order = ('order' in requestObject && requestObject.order) ? requestObject.order : 'ASC'
    //     let filter = ('filter' in requestObject && requestObject.filter) ? requestObject.filter : {}
    //     let response = await TransactionService.getAllShops(offset, limit, sort, order, filter)
    //     return response
    // }

    // async getShopInfo(id: number) {
    //     let response = TransactionService.getShopInfo(id)
    //     return response
    // }

    // async updateShop(requestObject: any) {
    //     let response = TransactionService.updateShop(requestObject)
    //     return response
    // }

    // async deleteShop(id: number) {
    //     let response = TransactionService.deleteShop(id)
    //     return response
    // }
}

export default new TransactionController