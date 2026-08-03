import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const StockChart = () => {

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

    const [activeLable,setActiveLable] = useState("1 Day");

    const series = [
        {
            data: [
                [1782572431255, 60514.094952996],
                [1782576158002, 60726.0944020887],
                [1782579650153, 60700.4694755931],
                [1782583242883, 60481.7772698944],
                [1782586865709, 60456.3751481772],
                [1782590447981, 60076.9768757978],
                [1782594047339, 60183.7618724845],
                [1782597632855, 60109.8378797153],
                [1782601337242, 60142.2118333599],
                [1782604895720, 59943.1107741247],
                [1782608478284, 60094.3233900009],
                [1782612010104, 60127.4254375115],
                [1782615675763, 60089.0126725934],
                [1782619335109, 60118.5418004962],
                [1782622836735, 60038.8760734366],
                [1782626436970, 59891.7826084665],
                [1782630056745, 59920.6678257378],
                [1782633653079, 60116.6018829797],
                [1782637335158, 60298.3502279578],
                [1782640930927, 60185.5972585219],
                [1782644414312, 60082.0097043649],
                [1782648004796, 60250.0969068287],
                [1782651677221, 60209.8262832473],
                [1782655219571, 59993.6221913496],
                [1782658845787, 59958.8788459952],
                [1782662488847, 59795.7760129628],
                [1782666133276, 59603.9947035907],
                [1782669704545, 59513.5015672383],
                [1782673220584, 59524.9379942006],
                [1782676897862, 59396.8938225722],
                [1782680533381, 59569.6640318567]
            ],
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

  return (
    <div>
        <div className='space-x-3'>
            {timeSeries.map((item) => 
                <Button key={item.lable} onClick={()=>handleActiveLable(item.lable)} variant={activeLable==item.lable ? "default" : "outline"}>
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
