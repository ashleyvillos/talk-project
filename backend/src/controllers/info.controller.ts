import InfoService from '../services/info.service'
import { GetOneInfoDTO, UpdateInfoDTO, DeleteInfoDTO } from '../models/dto/InfoDTO'

class InfoController {
    async getAllInfo(requestObject: any) {
        let offset = ('offset' in requestObject && requestObject.offset) ? parseInt(requestObject.offset) : 0
        let limit = ('limit' in requestObject && requestObject.limit) ? parseInt(requestObject.limit) : 5
        let sort = ('sort' in requestObject && requestObject.sort) ? requestObject.sort : 'id'
        let order = ('order' in requestObject && requestObject.order) ? requestObject.order : 'ASC'
        let response = await InfoService.getAllInfo(offset, limit, sort, order)
        return response
    }

    async getOneInfo(dto: GetOneInfoDTO) {
        let response = await InfoService.getOneInfo(dto)
        return response
    }

    async updateInfo(dto: UpdateInfoDTO) {
        let response = await InfoService.updateInfo(dto)
        return response
    }

    async deleteInfo(dto: DeleteInfoDTO) {
        let response = await InfoService.deleteInfo(dto)
        return response
    }
}

export default new InfoController