$(function(){
	const $start = $('#startDate');
	$start.val(moment().format('YYYY-MM-DD'));
	const $end = $('#endDate');
	$end.val(moment().format('YYYY-MM-DD'));
	$('input[name="daterange"]').daterangepicker({}, 
		function(start, end, label){
			$start.val(moment(start).format('YYYY-MM-DD'));
			$end.val(moment(end).format('YYYY-MM-DD'));
		}
	)
	
	$('#searchButton').click(function(el){
		const keyword = $('#keywordInput').val();
		const start = $start.val();
		const end = $end.val();
		const page = 1;
		$.get( "/api/publishers/"+$(this).attr('pid')+"/news?start="+start+"&end="+end+(keyword && "&keyword="+keyword)+(page && "&page="+page), function(data){
			const {pagination, newsList} = data;
			console.log(data)
			$('.newsCol').css('display', 'none')
			
			newsList.map((news, ind) => {
				const el = $('#item'+(ind+1))
				el.css('display', 'flex')
				el.find('.newsBlock').attr('nid', news.id)
				el.find('#mainImage').attr('src', news.mainImageURL)
				el.find('#text').text(moment(news.issueDate).format('YYYY년 MM월 DD일 발행'))
			})
			
		})
		
	})
	
	$('.NewsBlock').click(function(){
		window.location = '/news/'+$(this).attr('nid');
	})
	
	
})