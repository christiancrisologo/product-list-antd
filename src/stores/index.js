import React, { createContext, useReducer } from "react";
import rawData from "data";
import { distinctByField, randomize } from "utils/helpers";
import { getRevenue } from "utils/formula";

export const ACTION_TYPES = {
    LOAD_PRODUCTS: "LOAD_PRODUCTS",
    FILTER_BY_PRODUCT_NAME: "FILTER_BY_PRODUCT_NAME",
    GET_PRODUCT_CAPACITY: "GET_PRODUCT_CAPACITY",
    SELECT_PRODUCT: "SELECT_PRODUCT",
    GET_SELECTED_PRODUCTS: "GET_SELECTED_PRODUCTs",
};

export const StoreContext = createContext({});

const initialState = {
    productCapacity: {},
    products: [],
    selectedProducts: [],
    filterByProductName: "",
};

const getProducts = function (data) {
    return distinctByField(data, "product_code").map((item) => {
        return {
            ...item,
            revenue: getRevenue(item),
            cols: `${randomize(1, 10)}/10`,
        };
    });
};
function reducer(state, { type, payload }) {
    switch (type) {
        case ACTION_TYPES.LOAD_PRODUCTS: {
            return {
                ...state,
                products: getProducts([...state.products, ...rawData.productUpdateData]),
                selectedProducts: getProducts([
                    ...state.selectedProducts,
                    ...rawData.currentProducts,
                ]),
            };
        }
        case ACTION_TYPES.GET_PRODUCT_CAPACITY: {
            return {
                ...state,
                productCapacity: rawData.productCapacity,
            };
        }
        case ACTION_TYPES.SELECT_PRODUCT: {
            return {
                ...state,
                products: state.products.filter(
                    (item) => item.product_code !== payload.product_code
                ),
                selectedProducts: distinctByField(
                    [...state.selectedProducts, payload],
                    "product_code"
                ),
            };
        }
        case ACTION_TYPES.FILTER_BY_PRODUCT_NAME: {
            return {
                ...state,
                filterByProductName: payload,
            };
        }
        default:
            return state;
    }
}

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    );
};

export default Store;
