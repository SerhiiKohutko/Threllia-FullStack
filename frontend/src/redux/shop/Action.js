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
        console.log(response.data);
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

        console.log(filters.categoryName.toUpperCase());
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
        const response = await axios.get(`http://localhost:8080/api/products/${productType.toUpperCase()}/${id}`)

        console.log(JSON.stringify(response.data));
        dispatch({type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.data});
    }catch (err){
        console.error(err.message);
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