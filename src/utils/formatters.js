// currency formatters
export const toCurrency = function (val = 0) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(val);
};
