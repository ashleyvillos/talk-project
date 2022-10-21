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
            res.status(401).send(authenticate)
        }
    } else {
        res.status(401).send({ message: "Authorization Error" })
    }
})

TransactionRouter.get('/transactions', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await TransactionController.getAllTransactions(req.query)
            res.status(response.status).send(response)
        } else {
            res.status(401).send(authenticate)
        }
    } else {
        res.status(401).send({ message: "Authorization Error" })
    }
})

TransactionRouter.get('/transaction/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await TransactionController.getTransactionInfo(parseInt(req.params.id))
            res.status(response.status).send(response)
        } else {
            res.status(401).send(authenticate)
        }
    } else {
        res.status(401).send({ message: "Authorization Error" })
    }
})

TransactionRouter.put('/transaction', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await TransactionController.updateTransaction(req.body)
            res.status(response.status).send(response)
        } else {
            res.status(401).send(authenticate)
        }
    } else {
        res.status(401).send({ message: "Authorization Error" })
    }
})

TransactionRouter.delete('/transaction/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await TransactionController.deleteTransaction(parseInt(req.params.id))
            res.status(response.status).send(response)
        } else {
            res.status(401).send(authenticate)
        }
    } else {
        res.status(401).send({ message: "Authorization Error" })
    }
})



export default TransactionRouter