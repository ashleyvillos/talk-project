import { useMutation } from "react-query";
import axios from "axios";

const login = (data: any) => {
    return axios({
        url: 'http://localhost:3001/login',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const useLogin = (onSuccess: any, onError: any) => {
    return useMutation(login, {
        onSuccess,
        onError,
    })
}