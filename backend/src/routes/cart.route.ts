import express, { Router, Request, Response } from 'express'
import CartController from '../controllers/cart.controller'
import AuthService from '../services/auth.service'

const CartRouter: Router = express.Router()

CartRouter.post('/cart', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await CartController.createCart(req.body)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

CartRouter.get('/carts', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await CartController.getAllCarts(req.query)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

CartRouter.get('/cart/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await CartController.getCartInfo(parseInt(req.params.id))
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

CartRouter.put('/cart', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await CartController.updateCart(req.body)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

CartRouter.delete('/cart/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await CartController.deleteCart(parseInt(req.params.id))
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

CartRouter.post('/cart/checkout', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await CartController.checkoutCart(parseInt(req.body.id))
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})


export default CartRouter