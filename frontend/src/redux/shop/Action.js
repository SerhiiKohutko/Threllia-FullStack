import axios from "axios";
import {
    GET_ALL_PRODUCTS_PAGINATED_FAILURE,
    GET_ALL_PRODUCTS_PAGINATED_REQUEST,
    GET_ALL_PRODUCTS_PAGINATED_SUCCESS, GET_PRODUCT_BY_ID_SUCCESS,
} from "@/redux/shop/ActionType.js";
import {toast} from "react-toastify";

export const getAllProductsPaginated = (page, filters) => async (dispatch) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/all_paginated`, {
          params: {
              page : page,
              size : filters.size,
              minPrice : filters.minPrice,
              maxPrice : filters.maxPrice,
              album : filters.album,
              shopSortingType : filters.sortingType,
          }
      });


        dispatch({type: GET_ALL_PRODUCTS_PAGINATED_SUCCESS, payload: response.data});
    } catch(err){
        console.error(err);
    }
}

export const getAllProductsFiltered = (page, filters) => async (dispatch) => {
    dispatch({type : GET_ALL_PRODUCTS_PAGINATED_REQUEST});
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${filters.categoryName.toUpperCase()}`, {
            params: {
                page : page,
                subType: filters.subCategory ? filters.subCategory.toUpperCase() : null,
                minPrice : filters.minPrice,
                maxPrice : filters.maxPrice,
                album : filters.album,
                shopSortingType : filters.sortingType
            }
        })

        dispatch({type: GET_ALL_PRODUCTS_PAGINATED_SUCCESS, payload: response.data});
    }catch(err){
        dispatch({type : GET_ALL_PRODUCTS_PAGINATED_FAILURE, payload: err});
    }
}

export const getProductById = (id, productType) => async (dispatch) => {
    try{

        if (!productType){
            return;
        }

        console.log(productType);

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${productType.toUpperCase()}/${id}`)

        dispatch({type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.data});
    }catch (err){
        console.log(err.message);
    }
}

export const createProduct = (product) => async () => {
    try{
        await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, product, {
            headers : {
                'Content-Type' : 'multipart/form-data',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });

        toast.success("Product created!");
    }catch(err){
        toast.error(err.message);
    }
}

export const updateProductById = (id, product) => async () => {
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/products/admin/${id}`,product, {
            headers : {
                'Content-Type' : 'multipart/form-data',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        toast.success("Product updated!");
    }catch(err){
        toast.error(err.message);
    }
}

export const deleteProductById = (id, categoryName) => async () => {
    try {

        await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/admin/${id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                type : categoryName.toUpperCase()
            }
        })

        toast.success("Product deleted!");
    }catch (e) {
        toast.error(e.message);
    }
}

export const createPayment = (products, jwt) => async () => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment`, products, {
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })

        if (response.data.payment_link_url){
            localStorage.setItem("fromStripe", "true");
            window.location.href = response.data.payment_link_url;
        }
    }catch(err){
        console.log(err);
    }

}

export const updateOrderStatus = (jwt, paymentId) => async () => {
    try {
        if (!paymentId){
            return;
        }
        await axios.post(`${import.meta.env.VITE_API_URL}/api/user/orders/update_order_status`, {
            paymentId : paymentId,
        }, {
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })

    }catch(ignored){}
}