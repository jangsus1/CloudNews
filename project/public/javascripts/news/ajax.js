function updatePage() {
	const {page, keyword, start, end, publisherId} = params;
	$.get( "/api/publishers/"+publisherId+"/news?start="+start+"&end="+end+(keyword && "&keyword="+keyword)+(page && "&page="+page), function(data) {
		const {pagination, newsList, keywordList} = data;
		
		$('.newsCol').css('opacity', '0')
		$('.newsCol').css('pointer-events', 'none')

		$('#currentPage').html(pagination.page);
		$('#totalPage').html(pagination.pageMax);

		newsList.forEach((news, ind) => {
			const el = $('#item'+(ind+1))
			el.css('opacity', '1')
			el.css('pointer-events', 'auto')
			el.find('.NewsBlock').attr('nid', news.id)
			el.find('.mainImage').attr('src', news.mainImageURL)
			el.find('.mainImage').css('display', 'none')
			el.find('.spinner-border').css('display', 'block')
			el.find('#text').text(moment(news.issueDate).format('YYYY년 MM월 DD일 발행'))
			el.find('#key1').text("1. "+keywordList[ind][0].word)
			el.find('#key2').text("2. "+keywordList[ind][1].word)
			el.find('#key3').text("3. "+keywordList[ind][2].word)
		})
		params.page = pagination.page;
		params.pageMax = pagination.pageMax;
		$('#paginationNext').attr('disabled', params.page == 1);
		$('#paginationNext').attr('disabled', params.page == params.pageMax);
		
	});
	
}


$(function(){
	const $start = $('#startDate');
	$start.val("2020-01-01");
	const $end = $("#endDate");
	$end.val("2022-01-01");
	$('input[name="daterange"]').daterangepicker({
		startDate : "01/01/2020",
		endDate : "01/01/2022"
	}, 
		function(start, end, label){
			$start.val(moment(start).format('YYYY-MM-DD'));
			$end.val(moment(end).format('YYYY-MM-DD'));
		}
	)
	
	$('#searchButton').click(function(el){
		params.keyword = $('#keywordInput').val();
		params.start = $start.val();
		params.end = $end.val();
		updatePage()
	})
	
	$('#paginationNext').click(function(){
		params.page += 1;
		updatePage()
		
	})
	$('#paginationPrev').click(function(){
		params.page -= 1;
		updatePage()
	})
	
	$('#keywordInput').keypress(function(e){
		if(e.which==13) {
			params.keyword = $('#keywordInput').val();
			params.start = $start.val();
			params.end = $end.val();
			updatePage()
		}
	})
	
	$('.NewsBlock').click(function(){
		window.location = '/news/'+$(this).attr('nid');
	})
	$('.NewsBlock').hover(function(){
		$(this).find('.overlay-keyword').css('opacity', 0.8);
		$(this).find('img').css('filter', 'blur(3px)')
	}, function(){
		$(this).find('.overlay-keyword').css('opacity', 0);
		$(this).find('img').css('filter', 'blur(0)');
	})
	
})

$('.mainImage').on('load', function(){
		$(this).css('display', 'block');
		$(this).prev().css('display', 'none')
	})