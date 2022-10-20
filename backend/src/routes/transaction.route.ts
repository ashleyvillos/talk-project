import express, { Router, Request, Response } from 'express'
import TransactionController from '../controllers/transaction.controller'
import AuthService from '../services/auth.service'

const TransactionRouter: Router = express.Router()

TransactionRouter.post('/transaction', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await TransactionController.createTransaction(req.body)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})


export default TransactionRouter