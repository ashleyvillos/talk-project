import ProductService from "../services/product.service";

class ProductController {
    async createProduct(requestObject: any) {
        let response = ProductService.createProduct(requestObject)
        return response
    }

    async getAllProducts(requestObject: any) {
        let offset = ('offset' in requestObject && requestObject.offset) ? parseInt(requestObject.offset) : 0
        let limit = ('limit' in requestObject && requestObject.limit) ? parseInt(requestObject.limit) : 100
        let sort = ('sort' in requestObject && requestObject.sort) ? requestObject.sort : 'id'
        let order = ('order' in requestObject && requestObject.order) ? requestObject.order : 'ASC'
        let filter = ('filter' in requestObject && requestObject.filter) ? requestObject.filter : {}
        let response = await ProductService.getAllProducts(offset, limit, sort, order, filter)
        return response
    }

    async getProductInfo(id: number) {
        let response = ProductService.getProductInfo(id)
        return response
    }

    async updateProduct(requestObject: any) {
        let response = ProductService.updateProduct(requestObject)
        return response
    }

    async deleteProduct(id: number) {
        let response = ProductService.deleteProduct(id)
        return response
    }
}

export default new ProductController