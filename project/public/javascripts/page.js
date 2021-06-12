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