import axios from "axios";
import api from "@/components/Utils/axios.js";
import {
    CREATE_PAYMENT_FAILURE,
    CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS,
    CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS,
    GET_ALL_PRODUCTS_PAGINATED_FAILURE,
    GET_ALL_PRODUCTS_PAGINATED_REQUEST,
    GET_ALL_PRODUCTS_PAGINATED_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS, UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS,
} from "@/redux/shop/ActionType.js";
import {toast} from "react-toastify";

export const getAllProductsPaginated = (page, filters) => async (dispatch) => {
    dispatch({type: GET_ALL_PRODUCTS_PAGINATED_REQUEST});
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
        dispatch({type : GET_ALL_PRODUCTS_PAGINATED_FAILURE});
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

// get product by ID
export const getProductById = (id, productType) => async (dispatch) => {
    if (!productType) return;

    dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${productType.toUpperCase()}/${id}`);
        dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.data });
    } catch (err) {
        dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, error: err.message });
        toast.error("Failed to load product.");
    }
};

export const createProduct = (product, formReset) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        await api.post(`${import.meta.env.VITE_API_URL}/api/products`, product, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: CREATE_PRODUCT_SUCCESS });
        toast.success("Product created!");
        formReset();
    } catch (err) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, error: err.message });
        toast.error(err.message);
    }
};

// update product
export const updateProductById = (id, categoryName, product, navigate) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        await api.patch(`${import.meta.env.VITE_API_URL}/api/products/admin/${id}`, product, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: UPDATE_PRODUCT_SUCCESS });
        navigate(`/shop/${categoryName}/${id}`);
        toast.success("Product updated!");
    } catch (err) {
        dispatch({ type: UPDATE_PRODUCT_FAILURE, error: err.message });
        toast.error(err.message);
    }
};

// delete product
export const deleteProductById = (id, categoryName) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        await api.delete(`${import.meta.env.VITE_API_URL}/api/products/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                type: categoryName.toUpperCase()
            }
        });
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
        toast.success("Product deleted!");
    } catch (e) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, error: e.message });
        toast.error(e.message);
    }
};

export const createPayment = (products, jwt, cleanTheCart) => async (dispatch) => {
    dispatch({ type: CREATE_PAYMENT_REQUEST });
    try{
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/payment`, products, {
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })

        dispatch({ type: CREATE_PAYMENT_SUCCESS });
        if (response.data.payment_link_url){
            cleanTheCart();
            window.location.href = response.data.payment_link_url;
        }
    }catch(err){
        dispatch({ type: CREATE_PAYMENT_FAILURE, error: err.message });
        toast.error("Failed to create payment!");
    }

}

export const updateOrderStatus = (jwt, paymentId) => async () => {
    try {
        if (!paymentId){
            return;
        }
        await api.post(`${import.meta.env.VITE_API_URL}/api/user/orders/update_order_status`, {
            paymentId : paymentId,
        }, {
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })

    }catch(ignored){}
}