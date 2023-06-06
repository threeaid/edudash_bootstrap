/* Pie Chart */
function pieChart(idName, series, width, height) {
    var optionsPie = {
        series: series,
        labels: ['Completed', 'In Progress'],
        colors: ['#7811FF', 'rgba(120,17,255,.50)'],
        chart: {
            type: 'pie',
            group: 'social',
            width: width,
            height: height,
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '15px',
            fontFamily: 'poppins, sans-serif',
            fontWeight: 400,
            labels: {
                colors: '#525768',
            },
            markers: {
                width: 7,
                height: 7,
                radius: 20,
                offsetX: -4,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 10,
            },
            onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            },
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    minAngleToShowLabel: undefined
                },
            }
        },
        responsive: [{
            breakpoint: 1399,
            options: {
                chart: {
                    width: "100%"
                },

            }
        }]
    };
    if ($(idName).length > 0) {
        new ApexCharts(document.querySelector(idName), optionsPie).render();
    }
}

pieChart('.apexPie', [65, 35], '100%', 330);
pieChart('.apexPie2', [65, 35], '100%', 330);


/* bar Chart */
function barChart(idName, series, width, height) {
    var optionBar = {
        series: [{
            name: "sales",
            data: [{
                x: '2019/01/01',
                y: 400
            }, {
                x: '2019/04/01',
                y: 430
            }, {
                x: '2019/07/01',
                y: 448
            }, {
                x: '2019/10/01',
                y: 470
            }, {
                x: '2020/01/01',
                y: 540
            }, {
                x: '2020/04/01',
                y: 580
            }, {
                x: '2020/07/01',
                y: 690
            }, {
                x: '2020/10/01',
                y: 690
            }]
        }],
        chart: {
            type: 'bar',
            height: 380
        },
        xaxis: {
            type: 'category',
            group: {
                style: {
                    fontSize: '10px',
                    fontWeight: 700
                },
                groups: [{
                        title: '2019',
                        cols: 4
                    },
                    {
                        title: '2020',
                        cols: 4
                    }
                ]
            }
        },
        title: {
            text: 'Grouped Labels on the X-axis',
        },
        tooltip: {
            x: {
                formatter: function (val) {
                    return "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY")
                }
            }
        },
    };
    if ($(idName).length > 0) {
        new ApexCharts(document.querySelector(idName), optionBar).render();
    }
}

barChart('.apexDonutChart', [65, 35], '100%', 330);