// @ts-nocheck

function formatter_decimal_comma(value) {
	if (value !== undefined && value !== null) {
		return value.toString().replace(/\./g, ',');
	}
	return '';
}

export const chart_consumption = {
	series: [
		{
			name: '340323432',
			data: [6500, 6418, 6456, 6526, 6356, 6456, 6500, 6418, 6456, 6526, 6356, 6456],
			color: '#1A56DB'
		},
		{
			name: '384759379',
			data: [6456, 6356, 6526, 6332, 6418, null, null, 6500, 6418],
			color: '#7E3AF2'
		},
		{
			name: '1212121212',
			data: [6322, null, null, 6433, 6322, 6211, 6632, 6433, 6222, 6333],
			color: '#223AF2'
		}
	],

	chart: {
		height: '400px',
		maxWidth: '100%',
		type: 'line',
		group: 'social',
		fontFamily: 'Inter, sans-serif',
		dropShadow: {
			enabled: false
		},
		toolbar: {
			show: true,
			tools: {
				download: true,
				selection: false,
				zoom: true,
				zoomin: false,
				zoomout: false,
				pan: false
			}
		}
	},
	stroke: {
		curve: 'smooth'
	},
	tooltip: {
		enabled: true
	},

	dataLabels: {
		enabled: true,
		formatter: formatter_decimal_comma
	},
	fill: {
		type: 'gradient'
	},
	stroke: {
		width: 6
	},
	grid: {
		show: true,
		strokeDashArray: 4,
		padding: {
			left: 2,
			right: 2,
			top: -26
		}
	},
	legend: {
		show: true,
		position: 'top',
		fontFamily: 'Inter, sans-serif',
		labels: {
			colors: '999' // Set your desired legend text color here
		}
	},
	xaxis: {
		title: {
			text: 'Months',
			style: {
				fontFamily: 'Inter, sans-serif',
				fontSize: '14px',
				fontWeight: 'bold',
				cssClass: 'dark:fill-gray-400'
			}
		},
		categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		floating: false,
		tooltip: {
			enabled: false // Disables the tooltip only for the bottom X-axis
		},
		labels: {
			show: true,
			style: {
				fontFamily: 'Inter, sans-serif',
				cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		title: {
			text: 'Impuls',
			style: {
				fontFamily: 'Inter, sans-serif',
				fontSize: '14px',
				fontWeight: 'bold',
				cssClass: 'dark:fill-gray-400'
			}
		},
		labels: {
			show: true,
			style: {
				fontFamily: 'Inter, sans-serif',
				cssClass: 'dark:fill-gray-400'
			},
			formatter: formatter_decimal_comma
		},
		show: true
	}
};

export const chart_home = {
	series: [
		{
			name: 'Water',
			color: '#1A56DB',
			data: [
				{ x: '1', y: 231 },
				{ x: '2', y: 122 },
				{ x: '3', y: 63 },
				{ x: '4', y: 421 },
				{ x: '5', y: 122 },
				{ x: '6', y: 323 },
				{ x: '7', y: 231 },
				{ x: '8', y: 122 },
				{ x: '9', y: 63 },
				{ x: '10', y: 421 },
				{ x: '11', y: 122 },
				{ x: '12', y: 323 }
			]
		},
		{
			name: 'Gas',
			color: '#FDBA8C',
			data: [
				{ x: '1', y: 232 },
				{ x: '2', y: 113 },
				{ x: '3', y: 341 },
				{ x: '4', y: 224 },
				{ x: '5', y: 522 },
				{ x: '6', y: 411 },
				{ x: '7', y: 232 },
				{ x: '8', y: 113 },
				{ x: '9', y: 341 },
				{ x: '10', y: 224 },
				{ x: '11', y: 522 },
				{ x: '12', y: 411 }
			]
		},
		{
			name: 'Heat',
			color: '#FF0000',
			data: [
				{ x: '1', y: 120 },
				{ x: '2', y: 80 },
				{ x: '3', y: 310 },
				{ x: '4', y: 410 },
				{ x: '5', y: 250 },
				{ x: '6', y: 470 },
				{ x: '7', y: 200 },
				{ x: '8', y: 170 },
				{ x: '9', y: 341 },
				{ x: '10', y: 421 },
				{ x: '11', y: 300 },
				{ x: '12', y: 200 }
			]
		}
	],
	chart: {
		type: 'bar',
		height: '473px',
		fontFamily: 'Inter, sans-serif',
		toolbar: {
			show: true,
			tools: {
				download: true,
				selection: false,
				zoom: true,
				zoomin: false,
				zoomout: false,
				pan: false
			}
		}
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '70%',
			borderRadiusApplication: 'end',
			borderRadius: 8
		}
	},
	tooltip: {
		shared: true,
		intersect: false,
		style: {
			fontFamily: 'Inter, sans-serif'
		}
	},
	states: {
		hover: {
			filter: {
				type: 'darken',
				value: 1
			}
		}
	},
	stroke: {
		show: true,
		width: 0,
		colors: ['transparent']
	},
	grid: {
		show: false,
		strokeDashArray: 4,
		padding: {
			left: 2,
			right: 2,
			top: -14
		}
	},
	dataLabels: {
		enabled: false
	},
	legend: {
		show: true,
		position: 'top',
		labels: {
			colors: '999' // Set your desired legend text color here
		}
	},
	xaxis: {
		title: {
			text: 'Months',
			style: {
				fontFamily: 'Inter, sans-serif',
				fontSize: '14px',
				fontWeight: 'bold',
				cssClass: 'dark:fill-gray-400'
			}
		},
		floating: false,
		labels: {
			show: true,
			style: {
				fontFamily: 'Inter, sans-serif',
				cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		title: {
			text: 'Impuls',
			style: {
				fontFamily: 'Inter, sans-serif',
				fontSize: '14px',
				fontWeight: 'bold',
				cssClass: 'dark:fill-gray-400'
			}
		},
		labels: {
			show: true,
			style: {
				fontFamily: 'Inter, sans-serif',
				cssClass: 'dark:fill-gray-400'
			},
			formatter: formatter_decimal_comma
		},
		show: true
	},
	fill: {
		opacity: 1
	}
};

export const pie_chart_home = {
	series: [90, 85, 70],
	colors: ['#1C64F2', '#E3A008', '#FF0000'],
	chart: {
		background: 'transparent',
		height: '380px',
		width: '100%',
		type: 'radialBar',
		sparkline: {
			enabled: true
		},
		toolbar: {
			show: true,
			tools: {
				download: true,
				selection: false,
				zoom: true,
				zoomin: false,
				zoomout: false,
				pan: false
			}
		}
	},
	plotOptions: {
		radialBar: {
			track: {
				background: '#E5E7EB'
			},
			dataLabels: {
				show: true,

				style: {
					colors: ['#FF0000', '#FF0000', '#FF0000']
				}
			},
			hollow: {
				margin: 0,
				size: '32%'
			}
		}
	},
	grid: {
		show: false,
		strokeDashArray: 4,
		padding: {
			left: 2,
			right: 2,
			top: -23,
			bottom: -20
		}
	},
	labels: ['Water', 'Gas', 'Heat'],
	legend: {
		show: true,
		position: 'bottom',
		fontFamily: 'Inter, sans-serif',
		labels: {
			colors: '999' // Set your desired legend text color here
		}
	},
	tooltip: {
		enabled: true,
		x: {
			show: false
		}
	},
	yaxis: {
		show: false,
		labels: {
			formatter: function (value) {
				return value + '%';
			},
			style: {
				fontFamily: 'Inter, sans-serif',
				cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
			}
		}
	}
};
