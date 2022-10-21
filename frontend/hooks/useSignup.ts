import { useMutation } from "react-query";
import axios from "axios";

const signup = (data: any) => {
    return axios({
        url: 'http://localhost:3001/signup',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const useSignup = (onSuccess: any, onError: any) => {
    return useMutation(signup, {
        onSuccess,
        onError,
    })
}