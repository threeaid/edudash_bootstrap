/* ======= Custom Tooltip ====== */
const customTooltips = function (context) {
    // Tooltip Element
    let tooltipEl = document.getElementById('chartjs-tooltip');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.className = "chartjs-tooltip";
        tooltipEl.innerHTML = '<table></table>';
        document.body.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    const tooltipModel = context.tooltip;
    if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem) {
        return bodyItem.lines;
    }

    // Set Text
    if (tooltipModel.body) {
        const titleLines = tooltipModel.title || [];
        const bodyLines = tooltipModel.body.map(getBody);

        let innerHtml = '<thead>';

        titleLines.forEach(function (title) {
            innerHtml += `<div class='tooltip-title'>${title}</div>`;
        });
        innerHtml += '</thead><tbody>';

        bodyLines.forEach(function (body, i) {
            const colors = tooltipModel.labelColors[i];
            let style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            style += "; border-radius: 30px";
            const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
            innerHtml += `<tr><td>${span}${body}</td></tr>`;
        });
        innerHtml += '</tbody>';

        let tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
    }

    const toolTip = document.querySelector('.chartjs-tooltip');
    const position = context.chart.canvas.getBoundingClientRect();
    const toolTipHeight = toolTip.clientHeight;
    const rtl = document.querySelector('html[dir="rtl"]');


    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = `${position.left + window.pageXOffset + tooltipModel.caretX - (rtl !== null ? toolTip.clientWidth : 0)}px`;
    tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY-(tooltipModel.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)}px`;
    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
    tooltipEl.style.pointerEvents = 'none';
}

/* Index Page */

/* =======  Bar chart ======= */

function chartjsCourse(selector, height = "125", dataCur, labels, dataBwidth) {
    let delayed;
    var ctx = document.getElementById(selector);
    if (ctx) {
        ctx.getContext("2d");
        ctx.height = window.innerWidth <= 575 ? 250 : height;
        var chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    data: dataCur,
                    backgroundColor: "rgba(120,17,255, 0.50)",
                    hoverBackgroundColor: "#7811FF",
                    label: "Hours",
                    borderRadius: 2,
                    barPercentage: 0.39,
                }],
            },
            options: {
                maintainAspectRatio: true,
                responsive: true,
                interaction: {
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        usePointStyle: true,
                        enabled: false,
                        external: customTooltips,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';

                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat().format(context.parsed.y);
                                }
                                return `<span class="data-label">${label} hr</span>`;
                            }
                        },
                    },
                },
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                            delay = context.dataIndex * 200 + context.datasetIndex * 50;
                        }
                        return delay;
                    },
                },
                layout: {
                    padding: {
                        left: -10,
                        right: 0,
                        top: 53,
                        bottom: 11,
                    },
                },
                scales: {
                    y: {
                        stacked: true,
                        grid: {
                            display: true,
                            color: "#485e9029",
                            tickMarkLength: 1,
                            borderDash: [3, 3],
                            drawTicks: false,
                            drawBorder: false,
                            zeroLineWidth: 3,
                            borderWidth: 0,
                        },
                        ticks: {
                            beginAtZero: true,
                            font: {
                                size: 14,
                            },
                            color: "#8C90A4",
                            padding: 10,
                            max: 7,
                            min: 1,
                            stepSize: 1,
                            callback(value, index, values) {
                                return `${value}hr`;
                            },
                        },
                    },
                    x: {
                        stacked: true,
                        grid: {
                            display: false,
                            drawTicks: true,
                            drawBorder: false,
                        },
                        ticks: {
                            beginAtZero: false,
                            color: "#8C90A4",
                            font: {
                                size: 14,
                            },
                            display: true,
                        },
                    },
                },
            },
        });
    }
}
chartjsCourse(
    "courseActivity",
    "157",
    (data = [1.70, 4, 2.90, 4.30, 2.30, 4.80, 2.70]),
    labels = [
        "Sat",
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri"
    ],
);

/* ======= Line chart ======= */
function chartjsAreaChart(selector, height) {
    let delayed;
    const legendMargin = {
        id: 'legendMargin',
        beforeInit(chart, legend, options) {
            const fitValue = chart.legend.fit;
            chart.legend.fit = function fit() {
                fitValue.bind(chart.legend)();
                return this.height += 24;
            }
        }
    };
    var ctx = document.getElementById(selector);
    if (ctx) {
        ctx.getContext("2d");
        ctx.height = window.innerWidth <= 575 ? 200 : height;
        var chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
                datasets: [{
                        data: [1, 2.70, 2.50, 1.2, 2, 3.5, 1.9, 2.6, 2.3, 3.2, 2.8, 4.9],
                        borderColor: "#7811FF",
                        label: "Reading",
                        borderWidth: 2,
                        fill: false,
                        backgroundColor: "#7811FF",
                        hoverBackgroundColor: "#7811FF",
                        tension: 0.4,
                        pointHoverBorderColor: 'white',
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHitRadius: 30,
                        pointStyle: 'circle',
                        pointHoverBorderWidth: 2,
                    },
                    {
                        data: [2, 1.98, 3.50, 2, 2.95, 1.85, 2.50, 1, 2.20, 4.35, 3.30, 3.15],
                        borderColor: "#00AAFF",
                        label: "Writing",
                        borderWidth: 2,
                        fill: false,
                        backgroundColor: "#00AAFF",
                        hoverBackgroundColor: "#00AAFF",
                        tension: 0.4,
                        pointHoverBorderColor: 'white',
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHitRadius: 30,
                        pointStyle: 'circle',
                        pointHoverBorderWidth: 2,
                    },
                ],
            },
            options: {
                maintainAspectRatio: true,
                responsive: true,
                interaction: {
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: "top",
                        align: "center",
                        labels: {
                            usePointStyle: true,
                            color: "#525768",
                            textAlign: 'center',
                            boxWidth: 20,
                            boxHeight: 4,
                            maxHeight: 100,
                            pointStyleWidth: 6,
                            padding: 25,
                            family: "poppins, sans-serif",
                            font: {
                                size: 16,
                                weight: 400,
                            },
                        },
                    },
                    tooltip: {
                        usePointStyle: true,
                        enabled: false,
                        external: customTooltips,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';

                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat().format(context.parsed.y);
                                }
                                return `<span class="data-label">${label}hr</span>`;
                            }
                        },
                    },
                },
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                            delay = context.dataIndex * 200 + context.datasetIndex * 50;
                        }
                        return delay;
                    },
                },
                layout: {
                    padding: {
                        left: -13,
                        right: -10,
                        top: 0,
                        bottom: 0,
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked: false,
                        min: 1,
                        max: 5,
                        grid: {
                            color: "#E3E6EF",
                            borderDash: [3, 3],
                            zeroLineColor: "#E3E6EF",
                            zeroLineWidth: 1,
                            zeroLineBorderDash: [3, 3],
                            drawTicks: false,
                            drawBorder: false,
                            zeroLineWidth: 3,
                            borderWidth: 0,
                        },
                        ticks: {
                            beginAtZero: true,
                            font: {
                                size: 14,
                            },
                            color: "#8C90A4",
                            padding: 15,
                            max: 5,
                            stepSize: 1,
                            callback(value, index, values) {
                                return `${value}hr`;
                            },
                        },
                    },
                    x: {
                        stacked: false,
                        grid: {
                            display: true,
                            zeroLineWidth: 2,
                            zeroLineColor: "transparent",
                            color: "transparent",
                            z: 1,
                            tickMarkLength: 10,
                            drawTicks: true,
                            drawBorder: false,
                        },

                        ticks: {
                            beginAtZero: true,
                            font: {
                                size: 14,
                            },
                            color: "#8C90A4",
                        },
                    },
                },
            },
            plugins: [legendMargin]
        });
    }
}
chartjsAreaChart("areaChart", "99");


/* ======= bar chart ======= */
function chartjsBar(selector, height) {

    var ctx = document.getElementById(selector);
    if (ctx) {
        ctx.getContext("2d");
        ctx.height = window.innerWidth <= 575 ? 200 : height;
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ["1900", "1950", "1999", "2050"],
              datasets: [{
                  label: "Europe",
                  type: "bar",
                  backgroundColor: "rgba(120,17,255,0.2)",
                  data: [408,547,675,734],
                }, {
                  label: "Africa",
                  type: "bar",
                  backgroundColor: "rgba(1, 184, 26,0.2)",
                  backgroundColorHover: "#3e95cd",
                  data: [133,221,783,2478]
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Population growth (millions): Europe & Africa'
              },
              legend: { display: false }
            }
        });
    }
}

chartjsBar("barChartVertical", "99");


/* ======= Line chart ======= */
function chartjsLine(selector, height) {

    var ctx = document.getElementById(selector);
    if (ctx) {
        ctx.getContext("2d");
        ctx.height = window.innerWidth <= 575 ? 200 : height;
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
              datasets: [{ 
                  data: [86,114,106,106,107,111,133,221,783,2478],
                  label: "Africa",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: [282,350,411,502,635,809,947,1402,3700,5267],
                  label: "Asia",
                  borderColor: "#8e5ea2",
                  fill: false
                }, { 
                  data: [168,170,178,190,203,276,408,547,675,734],
                  label: "Europe",
                  borderColor: "#3cba9f",
                  fill: false
                }, { 
                  data: [40,20,10,16,24,38,74,167,508,784],
                  label: "Latin America",
                  borderColor: "#e8c3b9",
                  fill: false
                }, { 
                  data: [6,3,2,2,7,26,82,172,312,433],
                  label: "North America",
                  borderColor: "#c45850",
                  fill: false
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'World population per region (in millions)'
              }
            }
        });
    }
}

chartjsLine("lineChartBasic", "99");