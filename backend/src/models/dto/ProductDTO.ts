export class CreateProductDTO {
    shop_id?: number
    product_name?: string
    price?: number
}

export class UpdateProductDTO {
    id?: number
    shop_id?: number
    product_name?: string
    price?: number
}