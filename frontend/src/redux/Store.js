import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {tourReducer} from "@/redux/tour/Reducer.js";
import {shopReducer} from "@/redux/shop/Reducer.js";
import {newsReducer} from "@/redux/news/Reducer.js";
import {photoReducer} from "@/redux/gallery/Reducer.js";
import {songReducer} from "@/redux/song/Reducer.js";
import {releasesReducer} from "@/redux/releases/Reducer.js";

const reducer = combineReducers({
tours : tourReducer, shop : shopReducer, news : newsReducer, photo : photoReducer, song : songReducer, releases : releasesReducer
});

export const store = legacy_createStore(reducer, applyMiddleware(thunk))