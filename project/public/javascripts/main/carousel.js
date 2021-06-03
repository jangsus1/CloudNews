let items = document.querySelectorAll('#portfolio .news-item')

items.forEach((el) => {
    // number of slides per carousel-item
    const minPerSlide = 3
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
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
	let firstElement = $('.news-item.active');
	$('#newsCarouselLeft').click(function(){
	});
	
	$('#newsCarouselRight').click(function(){
		let current = $('.news-item.active');
		let next = current.next();
		if(!next) next = firstElement;
		console.log(current, next);
		next.css('translateX', '33.3%');
		next.css('display', 'flex');
		
		next.css('transition', '2s all;');
		current.css('transition', '2s all;');
		
		next.css('translateX', '0');
		current.css('translateX', '-33.3%');
		
		next.css('transition', 'none');
		current.css('transition', 'none');
		
		current.css('display', 'none');
		
		current.removeClass('active');
		next.addClass('active');
	});
})