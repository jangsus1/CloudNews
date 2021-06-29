let items = document.querySelectorAll('.news-item')

items.forEach((el) => {
    // number of slides per carousel-item
    const minPerSlide = 3
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next || !next.classList.contains('news-item')) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
	if(!el.classList.contains('active')){
		el.style.display = "none";
	}
})

$(function(){
	$('#newsCarouselLeft').click(function(){
		let current = $('.news-item.active');
		let prev = current.prev();
		if(!prev.length) prev =  $('.news-item.last');
		
		current.removeClass('active');
		prev.addClass('active');
		
		current.css('transform', 'translateX(33.3%)');
		setTimeout(() => {
			current.css({'display': 'none', transform : 'translateX(0)'});
			prev.css('display', 'flex')
		}, 500)
	});
	
	$('#newsCarouselRight').click(function(){
		let current = $('.news-item.active');
		let next = current.next();
		if(!next.length) next =  $('.news-item.first');
		
		current.removeClass('active');
		next.addClass('active');
		
		current.css('transform', 'translateX(-33.3%)');
		setTimeout(() => {
			current.css({'display': 'none', transform : 'translateX(0)'});
			next.css('display', 'flex')
		}, 500)
		
	});
	
	$('.item-overlay').hover(function(){
		$(this).css('opacity', 1);
	}, function(){
		$(this).css('opacity', 0);
	})
	
	$('.link').click(function(){
		window.location = $(this).attr('href');
	})
})