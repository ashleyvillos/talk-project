import express, { Router, Request, Response } from 'express'
import ShopController from '../controllers/shop.controller'
import AuthService from '../services/auth.service'

const ShopRouter: Router = express.Router()

ShopRouter.get('/shops', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await ShopController.getAllShops(req.query)
            res.status(response.status).send(response)
        } else {
            res.status(401).send(authenticate)
        }
    } else {
        res.status(401).send({ message: "Authorization Error" })
    }
})

ShopRouter.get('/shop/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await ShopController.getShopInfo(parseInt(req.params.id))
            res.status(response.status).send(response)
        } else {
            res.status(401).send(authenticate)
        }
    } else {
        res.status(401).send({ message: "Authorization Error" })
    }
})

ShopRouter.post('/shop', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await ShopController.createShop(req.body)
            res.status(response.status).send(response)
        } else {
            res.status(401).send(authenticate)
        }
    } else {
        res.status(401).send({ message: "Authorization Error" })
    }
})

ShopRouter.put('/shop', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await ShopController.updateShop(req.body)
            res.status(response.status).send(response)
        } else {
            res.status(401).send(authenticate)
        }
    } else {
        res.status(401).send({ message: "Authorization Error" })
    }
})

ShopRouter.delete('/shop/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await ShopController.deleteShop(parseInt(req.params.id))
            res.status(response.status).send(response)
        } else {
            res.status(401).send(authenticate)
        }
    } else {
        res.status(401).send({ message: "Authorization Error" })
    }
})



export default ShopRouter