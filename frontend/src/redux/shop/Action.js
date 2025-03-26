import axios from "axios";
import {
    GET_ALL_PRODUCTS_PAGINATED_SUCCESS,
    GET_SHOP_OVERVIEW_FAILURE,
    GET_SHOP_OVERVIEW_REQUEST,
    GET_SHOP_OVERVIEW_SUCCESS
} from "@/redux/shop/ActionType.js";

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
      const response = await axios.get(`http://localhost:8080/api/products/all_paginated`, {
          params: {
              page : page,
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
    try {

        console.log(`http://localhost:8080/api/products/${filters.categoryName.toUpperCase()}` + " " + filters);

        const response = await axios.get(`http://localhost:8080/api/products/${filters.categoryName.toUpperCase()}`, {
            params: {
                page : page,
                subType: filters.subCategory,
                minPrice : filters.minPrice,
                maxPrice : filters.maxPrice,
                album : filters.album,
                shopSortingType : filters.sortingType
            }
        })

        dispatch({type: GET_ALL_PRODUCTS_PAGINATED_SUCCESS, payload: response.data});
    }catch(err){
        console.error(err);
    }
}