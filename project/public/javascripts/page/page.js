
$(function(){
	// ajax
	var currentPageNum = 1;
	var isHover = false;
	const $next = $(".nextButton");
	const $prev = $(".prevButton");

	// dynamic graph
	// setup

	const colors = [...Array(4).fill('rgba(213, 51, 105, 1)'),
				   ...Array(4).fill('rgba(215, 77, 100, 1)'),
				   ...Array(4).fill('rgba(215, 110, 93, 1)'),
				   ...Array(4).fill('rgba(217, 140, 88, 1)'),
				   ...Array(4).fill('rgba(218, 174, 81, 1)')]

	var chart = null;

	const $keywords = $('.keywords');
	const $tooltips = $('.tooltips');
	const $wordcloud = $('#wordcloud');
	const $pageNumber = $('#pageNumber');
	const $pageLocator =  $('#pageLocator');
	const $pdfBar = $('.pdfBar');

	function createGraph(){
		const current = pages[currentPageNum-1];
		if(!current) return;
		const {labels, values} = current.keywords.reduce((acc, k, ind) => {
			acc.labels.push(k.word);
			acc.values.push(k.count);
			return acc;
		}, {labels:[], values:[]})

		if (chart) {
			chart.data.datasets[0].data = values;
			chart.data.datasets[1].data = values;
			chart.data.labels = labels;
			chart.update();
		}
		else {
			const data = {
		labels: labels,
		datasets: [
			{
				type : 'bar',
				label: false,
				data: values,
				backgroundColor: colors,
				borderColor: colors,
				borderWidth: 1
			}, {
				type : 'line',
				data : values
			}],
			borderColor: 'rgb(75, 192, 192)',
			backgroundColor: 'rgb(90, 207, 207)',
		};
		const config = {
		data: data,
		options: {
			indexAxis: 'y',
			elements: {
				bar: {
					borderWidth: 2,
				},
			},
			responsive: true,
			maintainAspectRatio : false,
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
			const ctx = document.getElementById("chart").getContext('2d');
			chart =  new Chart(ctx, config);
		}

	}
	
	
	const carousel = new bootstrap.Carousel(document.getElementById('carousel'), {
		interval : false
	})

	document.getElementById('carousel').addEventListener('slid.bs.carousel', function () {
		if(currentPageNum < pages.length) $next.css('pointer-events', 'auto');
		if(currentPageNum > 1) $prev.css('pointer-events', 'auto');
	})

	function updateWords(){
		const keywordsList = pages[currentPageNum-1].keywords;
		for(let ind=0;ind<10;ind++){
			$keywords[ind].innerHTML = keywordsList[ind] ? keywordsList[ind].word : "";
			$tooltips[ind].title = keywordsList[ind] ? "카운트 : "+keywordsList[ind].count+"회" : "";
			$tooltips[ind].setAttribute('data-bs-original-title', $tooltips[ind].title)
		}

	}


	function paint(){
		$wordcloud.attr('src', pages[currentPageNum-1].wordcloudURL)
		$pageNumber.html(currentPageNum+"면");
		$pageLocator.val(currentPageNum);
		updateWords()
		createGraph();
		carousel.to(currentPageNum-1);
	}





	$next.click(function() {
		if(currentPageNum < pages.length) {
			$next.css('pointer-events', 'none');
			currentPageNum++;
			paint()
		}

	});



	$prev.click(function() {
		if(currentPageNum > 1) {
			$prev.css('pointer-events', 'none');
			currentPageNum--;
			paint()
		}
	});


	$pageLocator.keypress(function(e){
		if(e.which==13) {
			$next.css('pointer-events', 'none');
			$prev.css('pointer-events', 'none');
			currentPageNum = $pageLocator.val();
			paint()
		}
	})



	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	  return new bootstrap.Tooltip(tooltipTriggerEl)
	})

	$pdfBar.hover(()=>{
			$pdfBar.css('opacity', 1)
			isHover=true;
		}, function(){
		isHover=false;
		setTimeout(()=>{
			if(!isHover) {
				$pdfBar.css('opacity', 0)
			}
		}, 1000);
	})
	
	
	function initialize(){
		createGraph()
		updateWords()
		$('#wordcloud').css('opacity', 1);
	}
	
	$('#firstPage').on('load', initialize)
	



})
