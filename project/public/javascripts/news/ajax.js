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
		const keyword = $('#keywordInput').val();
		const start = $start.val();
		const end = $end.val();
		const page = 1;
		$.get( "/api/publishers/"+$(this).attr('pid')+"/news?start="+start+"&end="+end+(keyword && "&keyword="+keyword)+(page && "&page="+page), function(data){
			const {pagination, newsList, keywordList} = data;
			console.log(data)
			$('.newsCol').css('display', 'none')
			
			newsList.forEach((news, ind) => {
				const el = $('#item'+(ind+1))
				el.css('display', 'flex')
				el.find('.newsBlock').attr('nid', news.id)
				el.find('.mainImage').attr('src', news.mainImageURL)
				el.find('.mainImage').css('display', 'none')
				el.find('.spinner-border').css('display', 'block')
				el.find('#text').text(moment(news.issueDate).format('YYYY년 MM월 DD일 발행'))
				el.find('#key1').text("1. "+keywordList[ind][0].word)
				el.find('#key2').text("2. "+keywordList[ind][1].word)
				el.find('#key3').text("3. "+keywordList[ind][2].word)
			})
			
		})
		
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

$('img.mainImage').on('load', function(){
		console.log("hehehe")
		$(this).css('display', 'block');
		$(this).prev().css('display', 'none')
	})