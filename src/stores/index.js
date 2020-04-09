import React, { useReducer, useContext } from "react";
import rawData from "data";
import { distinctByField } from "utils/helpers";
import { getRevenue } from "utils/formula";

export const ACTION_TYPES = {
    LOAD_PRODUCTS: "LOAD_PRODUCTS",
    FILTER_BY_PRODUCT_NAME: "FILTER_BY_PRODUCT_NAME",
    GET_PRODUCT_CAPACITY: "GET_PRODUCT_CAPACITY",
    SELECT_PRODUCT: "SELECT_PRODUCT",
    GET_SELECTED_PRODUCTS: "GET_SELECTED_PRODUCTs",
};

const initialState = {
    productCapacity: {},
    products: [],
    selectedProducts: [],
    filterByProductName: "",
};

export const StoreContext = React.createContext(initialState);

const getProducts = function (data) {
    return distinctByField(data, "product_code").map((item) => {
        return {
            ...item,
            revenue: getRevenue(item),
        };
    });
};

export const reducer = function (state, { type, payload }) {
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
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => useContext(StoreContext);

export default Store;
