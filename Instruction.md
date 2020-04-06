# Hivery Frontend Challenge

## Data

- A list of current products information
- A list of product change data

## ToDo

- Page as per design provided
- Selected products panel should show current product items
- On current product click there should be a list of products show from product change data
- This list must contain all products but the one selected on the left
- On each item click show revenue summary information based on `cannibalised` data inside product info.
- Net Gain should expand into a list of all the cannibalised products.
Please feel free to substituted missed data values with dummy numbers (i.e. Vends, Cols)

## Information

You are encouraged to use AntD framework to speed up the process and help with components build. If you are not familiar with AntD, feel free to use the one you have experience with, but AntD is the preferred choice.

To fetch images use `https://cdn.vendinganalytics.com/reyes-ccb/tb/PRODUCT_CODE.png` url.

`VPD == average_sales`

`Revenue = VPD * price`

`Net Gain = Selected Product Revenue - Current ProductRevenue - sum(Cannibalised products revenue)`

All prices are given in cents.
