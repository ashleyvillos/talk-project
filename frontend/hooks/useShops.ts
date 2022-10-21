import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { getCookie } from "cookies-next";

const accessToken = getCookie('accessToken')

const createShopAxios = (data: any) => {
    return axios({
        url: 'http://localhost:3001/shop',
        method: 'post',
        data: data,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const getShopsAxios = () => {
    return axios({
        url: 'http://localhost:3001/shops?filter[is_active]=true',
        method: 'get',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const updateShopAxios = (data: any) => {
    return axios({
        url: 'http://localhost:3001/shop',
        method: 'put',
        data: data,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const deleteShopAxios = (id: number) => {
    return axios({
        url: `http://localhost:3001/shop/${id}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const createShop = (onSuccess: any, onError: any, onSettled: any) => {
    return useMutation(createShopAxios, {
        onSuccess,
        onError,
        onSettled
    })
}

export const getShops = (onSuccess: any, onError: any) => {
    return useQuery('get-shops', getShopsAxios, {
        onSuccess,
        onError,
        staleTime: Infinity
    })
}

export const updateShop = (onSuccess: any, onError: any, onSettled: any) => {
    return useMutation(updateShopAxios, {
        onSuccess,
        onError,
        onSettled
    })
}

export const deleteShop = (onSuccess: any, onError: any, onSettled: any) => {
    return useMutation(deleteShopAxios, {
        onSuccess,
        onError,
        onSettled
    })
}
