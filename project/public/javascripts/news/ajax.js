$(function(){
	const $start = $('#startDate');
	$start.val(moment());
	const $end = $('#endDate');
	$end.val(moment());
	$('input[name="daterange"]').daterangepicker({}, 
		function(start, end, label){
			$start.val(start);
			$end.val(end);
		}
	)
	
	$('#searchButton').click(function(el){
		const keyword = $('#keywordInput').val();
		const start = $start.val();
		const end = $end.val();
		$.get( "/api/news?start="+start+"&end="+end+(keyword && "&keyword="+keyword), function(data){
			console.log(data);
		})
		
	})
	
	
	
})