$(function($){
	var scroll = 0;
	var maxScroll = $(".newsIMG").prop('scrollHeight')-$(".newsIMG").height();
	$(".carouselButtons").on("wheel", function(e){
		
		if(e.originalEvent.deltaY < 0 && scroll > 0) {
		scroll -= 10;
		}
		else if(e.originalEvent.deltaY > 0 && scroll < maxScroll){
			scroll += 10;
		}
		console.log(maxScroll, scroll);
		$(".newsIMG").scrollTop(scroll);
	});
})

// ajax
let nowPage = 1;
$("#next").click(function() {
	let code = window.location.href;
	code = code.slice(code.indexOf("/", 10), code.length);
	
	let param = { "page" : nowPage };
	
	$.ajax({
		type: "POST",
		url: code + "/next",
		data: param,
		dataType: 'json',
		success: function(res) {
			$("#Summary").html(res.pageImageURL);
			nowPage++;
			console.log("loaded");
			console.log("nowPage: " + nowPage);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
			console.log("failed");
		}
	});
});

// dynamic graph
// setup
const DATA_COUNT = 20;
const NUMBER_CFG = { count: DATA_COUNT, min: 1, max: 100 };

const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
			    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];
const data = {
	labels: labels,
    datasets: [
        {
			label: false,
			data: [12, 19, 2, 5, 2, 3, 12, 19, 2, 5, 2, 3, 12, 19, 2, 5, 2, 3, 12, 19],
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

// config
const config = {
    type: 'bar',
    data: data/*{
		labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
		datasets: [{
			label: '# of Votes',
			data: [12, 19, 2, 5, 2, 3],
			backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
		}]
	}*/,
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
                            ' 빈도수 ' +
                            tooltipItems.formattedValue +
                            '  '
                        );
                    },
                },
            },
            legend: {
				display: false
            },
            title: {
                display: true,
                text: 'Keyword bla bla',
            }
        },
    },
};

// chart

let ctx = $("#container")[0].getContext('2d');
let chart = new Chart(ctx, config);

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