
// ajax
var currentPageNum = 1;
const $next = $("#next");
const $prev = $("#prev");

// dynamic graph
// setup


var graph = null;

function createGraph(){
	const current = pages[currentPageNum-1];
	if(!current) return;
	const {labels, values} = current.keywords.reduce((acc, k) => {
		acc.labels.push(k.word);
		acc.values.push(k.count);
		return acc;
	}, {labels:[], values:[]})
	
	if (graph) {
		graph.data.datasets[0].data = values;
		graph.data.labels = labels;
		graph.update();
	}
	else {
		const data = {
	labels: labels,
    datasets: [
        {
			label: false,
			data: values,
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)'
			],
			borderColor: [
				'rgba(255,99,132,1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
				'rgba(255,99,132,1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
				'rgba(255,99,132,1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
				'rgba(255,99,132,1)',
				'rgba(54, 162, 235, 1)'
			],
			borderWidth: 1
			}],
		borderColor: 'rgb(75, 192, 192)',
		backgroundColor: 'rgb(90, 207, 207)',
	};
	const config = {
    type: 'bar',
    data: data,
    options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
		
        responsive: true,
        plugins: {
            tooltip: {
                bodyFont: {
                    lineHeight: 1.3,
                    family: 'Helvetica',
                    size: 15,
                    weight: '',
                },
                bodyAlign: 'center',

                borderWidth: 3,
                borderColor: '#18D992',
                backgroundColor: '#020202',
                displayColors: false,

                callbacks: {
                    title: function (tooltipItems, data) {},
                    label: function (tooltipItems, data) {
                        return (
                            '  ' +
                            tooltipItems.label +
                            ' : ' +
                            tooltipItems.formattedValue +
                            '회 '
                        );
                    },
                },
            },
            legend: {
				display: false
            },
            title: {
                display: true,
                text: '키워드 분석 차트',
            }
        },
   	},
	};
		const ctx = document.getElementById("graph").getContext('2d');
		graph =  new Chart(ctx, config);
	}
	
}

createGraph();

const carousel = new bootstrap.Carousel(document.querySelector('#carousel'), {
	interval : false
})


$next.click(function() {
	if(currentPageNum < pages.length) {
		currentPageNum++;
		createGraph()
		carousel.next();
	}
	
	
});

$prev.click(function() {
	if(currentPageNum > 1) {
		currentPageNum--;
		createGraph()
		carousel.prev();
	}
	
});

// actions
// const actions = [
//     {
//         name: 'Randomize',
//         handler(chart) {
//             chart.data.datasets.forEach((dataset) => {
//                 dataset.data = Utils.numbers({ count: chart.data.labels.length, min: 1, max: 100 });
//             });
//             chart.update();
//         },
//     },
//     {
//         name: 'Add Dataset',
//         handler(chart) {
//             const data = chart.data;
//             const dsColor = Utils.namedColor(chart.data.datasets.length);
//             const newDataset = {
//                 label: 'Dataset ' + (data.datasets.length + 1),
//                 backgroundColor: Utils.transparentize(dsColor, 0.5),
//                 borderColor: dsColor,
//                 borderWidth: 1,
//                 data: Utils.numbers({ count: data.labels.length, min: 1, max: 100 }),
//             };
//             chart.data.datasets.push(newDataset);
//             chart.update();
//         },
//     },
//     {
//         name: 'Add Data',
//         handler(chart) {
//             const data = chart.data;
//             if (data.datasets.length > 0) {
//                 data.labels = Utils.months({ count: data.labels.length + 1 });

//                 for (var index = 0; index < data.datasets.length; ++index) {
//                     data.datasets[index].data.push(Utils.rand(1, 100));
//                 }

//                 chart.update();
//             }
//         },
//     },
//     {
//         name: 'Remove Dataset',
//         handler(chart) {
//             chart.data.datasets.pop();
//             chart.update();
//         },
//     },
//     {
//         name: 'Remove Data',
//         handler(chart) {
//             chart.data.labels.splice(-1, 1); // remove the label first

//             chart.data.datasets.forEach((dataset) => {
//                 dataset.data.pop();
//             });

//             chart.update();
//         },
//     },
// ];