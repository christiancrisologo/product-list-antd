import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import { toCurrency } from "utils/formatters";
import { getCannibalizedRevenue, getNetGain } from "utils/formula";

const getConfig = function (data, selectedProducts) {
    const cannibalised = data.cannibalised || {
        addedProductRevenue: 0,
        replacedProductRevenue: 0,
        products: [],
    };

    const cannibalisedRev = getCannibalizedRevenue(cannibalised);

    const dataSet = [
        cannibalised.addedProductRevenue || 0,
        cannibalised.replacedProductRevenue || 0,
        cannibalisedRev,
        ...(cannibalised.products
            ? cannibalised.products.map((item) => item.revenue)
            : []),
        getNetGain(selectedProducts, data),
    ];

    const labels = [
        "Added Product",
        "Replaced Product(s)",
        "Cannibalised Product(s)",
        ...(cannibalised.products ? cannibalised.products.map((item) => item.name) : []),
        "\uf0fe  Net Gain",
    ];

    const cannibalisedProductColor = cannibalised.products
        ? cannibalised.products.map((item) => "#f54c22e1")
        : [];

    return {
        type: "horizontalBar",
        data: {
            pointLabelFontFamily: "'FontAwesome'",
            labels,
            datasets: [
                {
                    data: dataSet,
                    backgroundColor: [
                        "#49c00d",
                        "#f0b906",
                        "#f54c22e1",
                        ...cannibalisedProductColor,
                        "#1890ff",
                    ],
                    borderColor: [
                        "#49c00d",
                        "#f0b906",
                        "#f54c22e1",
                        ...cannibalisedProductColor,
                        "#1890ff",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            legend: {
                display: false,
            },

            tooltips: {
                // Disable the on-canvas tooltip
                enabled: false,

                custom: function (tooltipModel) {
                    // Tooltip Element
                    var tooltipEl = document.getElementById("chartjs-tooltip");

                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement("div");
                        tooltipEl.id = "chartjs-tooltip";
                        tooltipEl.innerHTML = '<div class="tooltip"></div>';
                        document.body.appendChild(tooltipEl);
                    }

                    // Hide if no tooltip
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    // Set caret Position
                    tooltipEl.classList.remove("above", "below", "no-transform");
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add("no-transform");
                    }

                    // Set Text
                    if (tooltipModel.body) {
                        const tableRoot = tooltipEl.querySelector(".tooltip");
                        tableRoot.innerHTML = `  
                        <div style="border:1px solid rgba(0, 0, 0, 0.65);background-color:#fff; padding: 12px;border-radius: 4px; width: 100%; min-width: 300px;">  
                            <div style="display:flex; flex-direction:row">
                                <img width="20px" height="auto" src="https://cdn.vendinganalytics.com/reyes-ccb/tb/${
                                    data.product_code
                                }.png" />
                                <div style="display:flex; flex-direction:column; padding-left: 12px">
                                    <span style="color:rgba(0, 0, 0, 0.65);font-size: 14px; font-weight: bold"> ${
                                        data.product_name
                                    }</span>  
                                    <span style="color:rgba(0, 0, 0, 0.40);font-size: 14px;font-weight: bold"> ${
                                        data.product_code
                                    }</span> 
                                    <span style="color:#f54c22e1;font-size: 14px;font-weight: bold"> ${toCurrency(
                                        data.price
                                    )}</span>  
                                </div>
                            </div>
                        </div> `;
                    }

                    // `this` will be the overall tooltip
                    var position = this._chart.canvas.getBoundingClientRect();

                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = "absolute";
                    tooltipEl.style.left =
                        position.left + window.pageXOffset + tooltipModel.caretX + "px";
                    tooltipEl.style.top =
                        position.top + window.pageYOffset + tooltipModel.caretY + "px";
                    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                    tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
                    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                    tooltipEl.style.padding =
                        tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
                    tooltipEl.style.pointerEvents = "none";
                },
            },
            scales: {
                xAxes: [
                    {
                        position: "top",
                        stacked: true,
                        ticks: {
                            fontColor: "rgba(0, 0, 0, 0.65)",
                            fontSize: 18,
                            stepSize: 5,
                        },
                    },
                ],
                yAxes: [
                    {
                        barPercentage: 1,
                        categoryPercentage: 1,
                        stacked: true,
                        ticks: {
                            fontColor: "rgba(0, 0, 0, 0.65)",
                            fontSize: 18,
                            fontFamily: "FontAwesome",
                            labelString: "\uf0fe",
                        },
                    },
                ],
            },
        },
    };
};

const Chart = ({ data, selectedProducts }) => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const chartData = getConfig(data, selectedProducts);
            const newChartInstance = new Chartjs(chartContainer.current, chartData);
            setChartInstance(newChartInstance);
        }
    }, [data, selectedProducts]);

    useEffect(() => {
        // if (chartContainer && chartContainer.current) {
        //     const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
        //     setChartInstance(newChartInstance);
        // }
    }, [chartContainer]);

    return (
        <div className="chart-container">
            <canvas ref={chartContainer} height={80} />
        </div>
    );
};

export default Chart;
