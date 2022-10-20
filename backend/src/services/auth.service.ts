// const dotenv = require('dotenv').config()
// const jwt = require('jsonwebtoken')
import dotenv, { DotenvConfigOutput } from 'dotenv';
import CommonResponse from "../utils/response.utils"
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
import jwt, { Secret } from 'jsonwebtoken'

const env_config: DotenvConfigOutput = dotenv.config();

class AuthService extends CommonResponse {
    async auth(requestObject: any) {
        try {
            let authentication = jwt.sign(requestObject, process.env.SECRET_KEY as string)
            if (authentication) {
                return this.RESPONSE(OK, { accessToken: authentication }, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async verify(token: string) {
        try {
            let authentication = jwt.verify(token, process.env.SECRET_KEY as string)
            if (authentication) {
                return this.RESPONSE(OK, authentication, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

export default new AuthService