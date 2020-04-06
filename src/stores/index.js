import React, { createContext, useReducer } from "react";
import rawData from "data";

export const ACTION_TYPES = {
    LOAD_PRODUCTS: "LOAD_PRODUCTS",
    GET_PRODUCT_CAPACITY: "GET_PRODUCT_CAPACITY",
    UPDATE_SELECTED_PRODUCT: "UPDATE_SELECTED_PRODUCT",
    GET_SELECTED_PRODUCTS: "GET_SELECTED_PRODUCTs",
};

export const StoreContext = createContext({});

const initialState = {
    productCapacity: {},
    products: [],
    selectedProducts: {},
};

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTION_TYPES.LOAD_PRODUCTS: {
            return {
                ...state,
                products: rawData.currentProducts,
            };
        }
        case ACTION_TYPES.GET_PRODUCT_CAPACITY: {
            return {
                ...state,
                productCapacity: rawData.productCapacity,
            };
        }
        case ACTION_TYPES.UPDATE_SELECTED_PRODUCT: {
            return {
                ...state,
                selectedProducts: rawData.productUpdateData,
            };
        }
        case ACTION_TYPES.GET_SELECTED_PRODUCTS: {
            return {
                ...state,
                selectedProducts: rawData.productUpdateData,
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
