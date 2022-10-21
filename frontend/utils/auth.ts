import { getCookies, deleteCookie, hasCookie } from 'cookies-next';

export const validateToken = () => {
    if (!hasCookie('accessToken')) {
        return false
    }

    return true
}
