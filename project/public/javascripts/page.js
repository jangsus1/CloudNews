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