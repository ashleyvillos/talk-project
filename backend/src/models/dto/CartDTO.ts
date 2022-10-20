export class CreateCartDTO {
    user_id?: number
    shop_id?: number
    cart_id?: number
    product_id?: number
    quantity?: number
}

export class UpdateCartDTO {
    id?: number
    cart_id?: number
    product_id?: number
    is_active?: boolean
    quantity?: number
}