var scrollpos = window.scrollY;
var header = document.getElementById('header');
var navcontent = document.getElementById('nav-content');
var navaction = document.getElementById('navAction');
var brandname = document.getElementById('brandname');
var toToggle = document.querySelectorAll('.toggleColour');

window.addEventListener('scroll', navColorChange);
window.addEventListener('load', loading);

function navColorChange() {
	/*Apply classes for slide in bar*/
	scrollpos = window.scrollY;
	console.log("scrollpos: " + scrollpos);

	if (scrollpos > 10) {
		header.classList.add('bg-white');
		header.classList.remove('gradient');
		navaction.classList.remove('bg-white');
		navaction.classList.add('gradient');
		navaction.classList.remove('text-gray-800');
		navaction.classList.add('text-white');
		//Use to switch toggleColour colours
		for (var i = 0; i < toToggle.length; i++) {
			toToggle[i].classList.add('text-gray-800');
			toToggle[i].classList.remove('text-white');
		}
		header.classList.add('shadow');
		// navcontent.classList.remove('bg-gray-100');
		// navcontent.classList.add('bg-white');
	} else {
		header.classList.remove('bg-white');
		header.classList.add('gradient');
		navaction.classList.remove('gradient');
		navaction.classList.add('bg-white');
		navaction.classList.remove('text-white');
		navaction.classList.add('text-gray-800');
		//Use to switch toggleColour colours
		for (var i = 0; i < toToggle.length; i++) {
			toToggle[i].classList.add('text-white');
			toToggle[i].classList.remove('text-gray-800');
		}

		header.classList.remove('shadow');
		// navcontent.classList.remove('bg-white');
		// navcontent.classList.add('bg-gray-100');
	}
}

function loading() {
	navColorChange();
	
	// Observer
	let target = document.querySelector('#process');
	let steps = document.querySelector('#steps');
	let options = {
	  rootMargin: '0px',
	  threshold: 0.1
	}

	let callback = (entries, observer) => {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				for (var i=0; i<steps.childElementCount; ++i) {
					steps.children[i].classList.add("loaded");
				}
			}
		});
	}

	let observer = new IntersectionObserver(callback, options);
	observer.observe(target);
}