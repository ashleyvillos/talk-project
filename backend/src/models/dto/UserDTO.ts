export class SignupDTO {
    username?: string
    password?: string
    confirm_password?: string
}

export class LoginDTO {
    username?: string
    password?: string
}

export class UpdateUserDTO {
    id?: number
    username?: string
    password?: string
}