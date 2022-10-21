export class CreateTxDTO {
    cart_id?: number
}

export class UpdateTxDTO {
    id?: number
    transaction_date?: Date
    transcation_status?: number
    total_price?: number
    is_active?: boolean
}