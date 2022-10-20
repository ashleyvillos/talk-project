import express, { Express, Request, json, Response } from 'express';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import config from './config/config'

const app: Express = express();
const env_config: DotenvConfigOutput = dotenv.config();
const port = process.env.PORT || 3002;

// Routes
import UserRouter from './routes/user.route'
import ShopRouter from './routes/shop.route'
import ProductRouter from './routes/product.route'
import CartRouter from './routes/cart.route';
import TransactionRouter from './routes/transaction.route'

// Middleware
app.use(json());

// Routing
app.use(UserRouter)
app.use(ShopRouter)
app.use(ProductRouter)
app.use(CartRouter)
app.use(TransactionRouter)

let serve = async () => {
    config.authenticate()
    config.sync({ force: false })
    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    })
}

serve()