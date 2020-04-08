export function getRevenue(data) {
    return data ? data.average_sales * data.price : 0;
}

export function getCannibalizedRevenue(cannibalised) {
    return (cannibalised || { products: [] }).products.reduce((prev, curr) => {
        return prev + curr.revenue || 0;
    }, 0);
}

export function getNetGain(selectedProduct, currentProduct) {
    const selectedProductRevenue = selectedProduct.reduce((prev, curr) => {
        return prev + curr.revenue;
    }, 0);
    const currentProductRevenue = currentProduct.revenue;
    const cannibalizedRevenue = getCannibalizedRevenue(currentProduct.cannibalised);

    return selectedProductRevenue - currentProductRevenue - cannibalizedRevenue;
}
