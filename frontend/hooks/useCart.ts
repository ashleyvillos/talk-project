import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { getCookie } from "cookies-next";

const accessToken = getCookie('accessToken')

const createProductAxios = (data: any) => {
    return axios({
        url: 'http://localhost:3001/product',
        method: 'post',
        data: data,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const getProductsAxios = () => {
    return axios({
        url: 'http://localhost:3001/products?filter[is_active]=true',
        method: 'get',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const updateProductAxios = (data: any) => {
    return axios({
        url: 'http://localhost:3001/product',
        method: 'put',
        data: data,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const deleteProductAxios = (id: number) => {
    return axios({
        url: `http://localhost:3001/product/${id}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const createProduct = (onSuccess: any, onError: any, onSettled: any) => {
    return useMutation(createProductAxios, {
        onSuccess,
        onError,
        onSettled
    })
}

export const getProducts = (onSuccess: any, onError: any) => {
    return useQuery('get-products', getProductsAxios, {
        onSuccess,
        onError,
        staleTime: Infinity
    })
}

export const updateProduct = (onSuccess: any, onError: any, onSettled: any) => {
    return useMutation(updateProductAxios, {
        onSuccess,
        onError,
        onSettled
    })
}

export const deleteProduct = (onSuccess: any, onError: any, onSettled: any) => {
    return useMutation(deleteProductAxios, {
        onSuccess,
        onError,
        onSettled
    })
}
