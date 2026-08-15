import { Button } from '@/components/ui/button';
import { getMarketChart } from '@/State/Coin/Action';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';

const StockChart = ({coinId}) => {

    const dispatch=useDispatch()
    const {coin} = useSelector(store=>store)

    const timeSeries = [
        {
            keyword: "DIGITAL_CURRENCY_DAILY",
            key: "TIME SERIES (Daily)",
            lable: "1 Day",
            value: 1,
        },
        {
            keyword: "DIGITAL_CURRENCY_WEEKLY",
            key: "WEEKLY TIME SERIES",
            lable: "1 Week",
            value: 7,
        },
        {
            keyword: "DIGITAL_CURRENCY_MONTHLY",
            key: "MONTHLY TIME SERIES",
            lable: "1 Month",
            value: 30,
        }
    ]

    const [activeLable,setActiveLable] = useState(timeSeries[0]);

    const series = [
        {
            data:coin.marketChart.data,
        },
    ]

    const options = {
        chart: {
            id:"area-datetime",
            height:300,
            zoom:{
                autoScaleYaxis:true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: "datetime",
            tickAmount: 6
        },
        yaxis: {
            labels: {
                formatter: (value) => value.toFixed(0)
            }
        },
        colors: ["#758AA2"],
        markers: {
            colors: ["#fff"],
            strokeColor: "#fff",
            size:0,
            strokeWidth:1,
            style:"hollow",
        },
        tooltip: {
            theme: "dark"
        },
        fill: {
            type:"gradient",
            gradient: {
                shadeIntensity:1,
                opacityFrom:0.8,
                opacityTo:0.9,
                stops:[0,100]
            }
        },
        grid: {
            borderColor: "#47535E",
            strokeDashArray:4,
            show:true
        }
    }

    const handleActiveLable= (value)=> {
        setActiveLable(value);
    }

    useEffect(() => {
        dispatch(getMarketChart(coinId, activeLable.value))
    },[coinId,activeLable])

  return (
    <div>
        <div className='space-x-3'>
            {timeSeries.map((item) => 
                <Button key={item.lable} onClick={()=>handleActiveLable(item)} variant={activeLable.lable==item.lable ? "default" : "outline"}>
                    {item.lable}
                </Button>
            )}
        </div>
        <div id="chart-timelines">
            <ReactApexChart options={options} series={series} type="area" height={300} />
        </div>
    </div>
  )
}

export default StockChart
