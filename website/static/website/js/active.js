(function($) {
	'use strict';
	// Preloader
	$(window).on('load',function(){
		$(".preloader").fadeOut(500);
	});

	// Header Sticky
	$(window).on('scroll', function() {
		if ($(this).scrollTop() >150){  
			$('.navbar').addClass("is-sticky");
		}
		else{
			$('.navbar').removeClass("is-sticky");
		}
	});

	// Dropdown
	$('.navbar-light .dropdown').on('hover', function () {
		$(this).on('find', '.dropdown-menu').first().stop(true, true).slideDown(100);
	}, function () {
		$(this).on('find', '.dropdown-menu').first().stop(true, true).slideUp(50)
	});

	// Home Slides
	$('.hero-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		autoplayHoverPause: true,
		autoplay: true,
		smartSpeed: 1000,
		items: 1,
		navText: [
			"<i class='fa fa-angle-left'></i>",
			"<i class='fa fa-angle-right'></i>",
		],
	});
	$(".hero-slider").on("translate.owl.carousel", function(){
		$(".slider-text h1").removeClass("animated fadeInUp").css("opacity", "0");
		$(".slider-text p").removeClass("animated fadeInUp").css("opacity", "0");
		$(".slider-text .default-btn").removeClass("animated fadeInUp").css("opacity", "0");
	});
	$(".hero-slider").on("translated.owl.carousel", function(){
		$(".slider-text h1").addClass("animated fadeInUp").css("opacity", "1");
		$(".slider-text p").addClass("animated fadeInUp").css("opacity", "1");
		$(".slider-text .default-btn").addClass("animated fadeInUp").css("opacity", "1");
	});
	
	// Testimonial Slides
	$('.testimonial-wrapper').owlCarousel({
		loop: true,
		margin: 10,
		nav: false,
		items: 1,
		dots: true,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			991: {
				items: 3
			},
			1200: {
				items: 3
			}
		},
	});

	// Partner Slides
	$('.partner-wrapper').owlCarousel({
		loop: true,
		margin: 15,
		nav: false,
		items: 1,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 2
			},
			576: {
				items: 3
			},
			768: {
				items: 4
			},
			1200: {
				items: 5
			}
		},
	});

	// Pricing Slides
	$('.pricing-wrapper').owlCarousel({
		loop: true,
		margin: 15,
		nav: false,
		items: 1,
		dots: true,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 1
			},
			991: {
				items: 2
			},
			1200: {
				items: 2
			}
		},
	});

	// Back to top
	$('body').append('<div id="toTop" class="back-to-top"><i class="fas fa-chevron-up" //aria-hidden="true"></i></div>');
	$(window).on('scroll', function () {
		if ($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	}); 
	$('#toTop').on("click", function(){
		$("html, body").animate({ scrollTop: 0 }, 50);
		return false;
	});

	// Subscribe form
	$(".newsletter-form").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
		// handle the invalid form...
			formErrorSub();
			submitMSGSub(false, "Please enter your email correctly.");
		} else {
			// everything looks good!
			event.preventDefault();
		}
	});
	function callbackFunction (resp) {
		if (resp.result === "success") {
			formSuccessSub();
		}
		else {
			formErrorSub();
		}
	}
	function formSuccessSub(){
		$(".newsletter-form")[0].reset();
		submitMSGSub(true, "Thank you for subscribing!");
		setTimeout(function() {
			$("#validator-newsletter").addClass('hide');
		}, 4000)
	}
	function formErrorSub(){
		$(".newsletter-form").addClass("animated shake");
		setTimeout(function() {
			$(".newsletter-form").removeClass("animated shake");
		}, 1000)
	}
	function submitMSGSub(valid, msg){
		if(valid){
			var msgClasses = "validation-success";
		} else {
			var msgClasses = "validation-danger";
		}
		$("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
	}
	// AJAX MailChimp
	$(".newsletter-form").ajaxChimp({
		url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
		callback: callbackFunction
	});

	// WOW JS
	new WOW().init();
	
	// FAQ JS
	$(".faq-panel > .faq-title").on("click", function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass("active");
			$(this).siblings('.faq-textarea').slideUp(200);
			$(".faq-panel > .faq-title i").removeClass("fa fa-minus").addClass("fa fa-plus");
		} else {
			$(".faq-panel > .faq-title i").removeClass("fa fa-minus").addClass("fa fa-plus");
			$(this).find("i").removeClass("fa fa-plus").addClass("fa fa-minus");
			$(".faq-panel > .faq-title").removeClass("active");
			$(this).addClass("active");
			$('.faq-textarea').slideUp(200);
			$(this).siblings('.faq-textarea').slideDown(200);
		}
	});
	var accordion = (function() {
		var $accordion = $('.js-accordion');
		var $accordion_header = $accordion.find('.js-accordion-header');
		var $accordion_item = $('.js-accordion-item');
		var settings = {
			speed: 400,
			oneOpen: false
		};
		return {
			init: function($settings) {
				$accordion_header.on('click', function() {
					accordion.toggle($(this));
				});
				$.extend(settings, $settings);
				if (settings.oneOpen && $('.js-accordion-item.active').length > 1) {
					$('.js-accordion-item.active:not(:first)').removeClass('active');
				}
				$('.js-accordion-item.active').find('> .js-accordion-body').show();
			},
			toggle: function($this) {
				if (settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
					$this.closest('.js-accordion').find('> .js-accordion-item').removeClass('active').find('.js-accordion-body').slideUp()
				}
				$this.closest('.js-accordion-item').toggleClass('active');
				$this.next().stop().slideToggle(settings.speed);
			}
		}
	})();
	$(document).on('ready',function() {
		accordion.init({
			speed: 300,
			oneOpen: true
		});
	});
})(jQuery);