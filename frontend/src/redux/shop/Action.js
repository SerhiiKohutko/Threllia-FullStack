import axios from "axios";
import {
    GET_ALL_PRODUCTS_PAGINATED_FAILURE,
    GET_ALL_PRODUCTS_PAGINATED_REQUEST,
    GET_ALL_PRODUCTS_PAGINATED_SUCCESS, GET_PRODUCT_BY_ID_SUCCESS,
    GET_SHOP_OVERVIEW_FAILURE,
    GET_SHOP_OVERVIEW_REQUEST,
    GET_SHOP_OVERVIEW_SUCCESS
} from "@/redux/shop/ActionType.js";
import {toast} from "react-toastify";

export const getShopOverviewForMVP = ({page, size}) => async (dispatch) => {
    dispatch({type: GET_SHOP_OVERVIEW_REQUEST});
    try{
        const response = await axios.get(`http://localhost:8080/api/products/?`, {
            params: {
                size : size,
                page : page
            }
        });
        dispatch({type: GET_SHOP_OVERVIEW_SUCCESS, payload: response.data});
    }catch(err){
        dispatch({type: GET_SHOP_OVERVIEW_FAILURE, payload: err});
        console.error(err);
    }
}

export const getAllProductsPaginated = (page, filters) => async (dispatch) => {
    try {
        console.log(Date.now() + " Action called all");
      const response = await axios.get(`http://localhost:8080/api/products/all_paginated`, {
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
        const response = await axios.get(`http://localhost:8080/api/products/${filters.categoryName.toUpperCase()}`, {
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

        const response = await axios.get(`http://localhost:8080/api/products/${productType.toUpperCase()}/${id}`)

        dispatch({type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.data});
    }catch (err){
        console.log(err.message);
    }
}

export const createProduct = (product) => async (dispatch) => {
    try{
        await axios.post(`http://localhost:8080/api/products`, product, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        });

        toast.success("Product created!");
    }catch(err){
        toast.error(err.message);
    }
}

export const updateProductById = (id, product) => async (dispatch) => {
    try {
        await axios.patch(`http://localhost:8080/api/products/admin/${id}`,product, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
        toast.success("Product updated!");
    }catch(err){
        toast.error(err.message);
    }
}

export const deleteProductById = (id, categoryName) => async () => {
    try {

        await axios.delete(`http://localhost:8080/api/products/admin/${id}`, {
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
        const response = await axios.post(`http://localhost:8080/api/payment`, products, {
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
        await axios.post(`http://localhost:8080/api/orders/update_order_status`, {
            paymentId : paymentId,
        }, {
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })

    }catch(ignored){}
}