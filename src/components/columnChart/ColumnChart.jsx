import React from 'react'
import ReactApexChart from 'react-apexcharts'

const ColumnChart = (props) => {
	const { series } = props
	const options = {
		colors: ['#22C55E', '#2196F3', '#ff8c01'],
		chart: {
			height: 350,
			type: 'bar',
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				distributed: true,
				columnWidth: '30px',
				borderRadius: 5,
				dataLabels: {
					position: 'center', // top, center, bottom
				},
			}
		},
		dataLabels: {
			enabled: true,
			style: {
				fontSize: '12px',
				colors: ["#fff"]
			}
		},
		legend: {
			show: false,
		},
		xaxis: {
			categories: ["Jan", "Feb", "Mar"],
			tooltip: {
				enabled: false,
			}
		},
		yaxis: {
			axisTicks: {
				show: true,
			},
			labels: {
				show: true,
			}
		}
	}

	return (
		<div>
			<ReactApexChart options={options} series={series} height={500} type='bar' />
		</div >
	)
}

export default ColumnChart