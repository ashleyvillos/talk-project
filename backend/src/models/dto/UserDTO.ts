export class SignupDTO {
    username?: string
    password?: string
    confirmPassword?: string
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