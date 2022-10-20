import express, { Router, Request, Response } from 'express'
import UserController from '../controllers/user.controller'
import AuthService from '../services/auth.service'

const UserRouter: Router = express.Router()

UserRouter.post('/signup', async (req: Request, res: Response) => {
    let response = await UserController.signup(req.body)
    res.status(response.status).send(response)
})

UserRouter.post('/login', async (req: Request, res: Response) => {
    let response = await UserController.login(req.body)
    res.status(response.status).send(response)
})

UserRouter.get('/users', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await UserController.getAllUsers(req.query)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

UserRouter.get('/user/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await UserController.getUserInfo(parseInt(req.params.id))
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

UserRouter.put('/user', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await UserController.updateUser(req.body)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

UserRouter.delete('/user/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await UserController.deleteUser(parseInt(req.params.id))
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

// UserRouter.get('/user/info/:id', async (req: Request, res: Response) => {
//     if ('authorization' in req.headers) {
//         let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
//         if (authenticate.status == 200) {
//             let response = await UserController.getUserInfo({ id: parseInt(req.params.id) })
//             res.status(response.status).send(response)
//         } else {
//             res.status(authenticate.status).send(authenticate)
//         }
//     } else {
//         res.status(200).send({ message: "Authorization Error" })
//     }
// })

// UserRouter.get('/user/tasks/:id', async (req: Request, res: Response) => {
//     if ('authorization' in req.headers) {
//         let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
//         if (authenticate.status == 200) {
//             let response = await UserController.getUserTasks({ id: parseInt(req.params.id) })
//             res.status(response.status).send(response)
//         } else {
//             res.status(authenticate.status).send(authenticate)
//         }
//     } else {
//         res.status(200).send({ message: "Authorization Error" })
//     }
// })

// UserRouter.put('/user', async (req: Request, res: Response) => {
//     if ('authorization' in req.headers) {
//         let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
//         if (authenticate.status == 200) {
//             let response = await UserController.updateUser(req.body)
//             res.status(response.status).send(response)
//         } else {
//             res.status(authenticate.status).send(authenticate)
//         }
//     } else {
//         res.status(200).send({ message: "Authorization Error" })
//     }
// })

// UserRouter.delete('/user/:id', async (req: Request, res: Response) => {
//     if ('authorization' in req.headers) {
//         let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
//         if (authenticate.status == 200) {
//             let response = await UserController.deleteUser({ id: parseInt(req.params.id) })
//             res.status(response.status).send(response)
//         } else {
//             res.status(authenticate.status).send(authenticate)
//         }
//     } else {
//         res.status(200).send({ message: "Authorization Error" })
//     }
// })

export default UserRouter