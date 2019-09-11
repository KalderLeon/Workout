// ============================
// MAIN
// ============================

$(document).ready(function() {
	var mediaBp = [1130, 980, 767, 640, 480];

	$('.custom-form__input[name="phone"]').inputmask('+7 (999) 999-99-99');

	$(window).scroll(function(event) {
		activeAnchor();
		fixedIt();
	});
	activeAnchor();
	fixedIt();
	// ============================
	// NAV
	// ============================
	function fixedIt () {
		var anchor = $('.preview-block').outerHeight(),
			docTop = $(document).scrollTop();

		if ( mediaQuery('min', 981) ) {
			if ( docTop > anchor ) {
				$('.nav').addClass('nav_active');
			} else {
				$('.nav_active').removeClass('nav_active');
			};
		};
	}

	function activeAnchor () {

		var fromTop = $(window).scrollTop() + $('.nav').outerHeight() + 30,
			lastId;

		var anchors = $('a[href^="#anchor"]').map(function(){
			return $(this).attr('href');
		}),

		itemId = $('div[id^="anchor"]').map(function(){
			if ( $(this).offset().top < fromTop ) {
				return $(this).attr('id');
			};
		});

		itemId = itemId[itemId.length - 1];

		if ( lastId !== itemId) {
			lastId = itemId;
			$('a[href^="#anchor"]').removeClass('active');
			$('a[href="#' + itemId + '"]').addClass('active');
		} else {
			$('a[href^="#anchor"]').removeClass('active');
		};
	}

	$('a[href^="#anchor"]').click(function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top,
			navHeight = mediaQuery('min', 981) ? $('.nav').outerHeight() : 0;

		$('html,body').animate({scrollTop: top - navHeight}, 500);
	});

	$('.header__burger').click(function(event) {
		$('.nav').toggleClass('nav_active');
		$('body').toggleClass('stopped');
	});

	// ============================
	// SLIDER
	// ============================

	$('.review-slider').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
		responsive: [
			{
				breakpoint: mediaBp[0] + 1,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	$('.how-order-slider').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		responsive: [
			{
				breakpoint: mediaBp[1] + 1,
				settings: {
					dots: true,
					slidesToShow: 2
				}
			},
			{
				breakpoint: mediaBp[2] + 1,
				settings: {
					dots: true,
					slidesToShow: 1
				}
			}
		]
	});

	$('.quality-grid').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		responsive: [
			{
				breakpoint: mediaBp[1] + 1,
				settings: {
					dots: true,
					slidesToShow: 2
				}
			},
			{
				breakpoint: mediaBp[3] + 1,
				settings: {
					dots: true,
					slidesToShow: 1
				}
			}
		]
	});

	// ============================
	// FAQ
	// ============================
	$('.faq__question').click(function(event) {
		event.preventDefault();
		$(this).toggleClass('faq__question_active');

		if ( $(this).hasClass('faq__question_active') ) {
			$(this)
				.next('.faq__answer')
				.slideDown(300);
		} else {
			$(this)
				.next('.faq__answer')
				.slideUp(300);
		};
	});
	// ============================
	// file
	// ============================
	function readURL(input, that) {

		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.readAsDataURL(input.files[0]);
			that.parents('.custom-form__file').find('span').html(input.files[0].name);
		};
	};

	$("#loadFile").change(function(){
		readURL(this, $(this));
	});

	// prevdef catalog card
	$('.catalog-item__img-container, .catalog-item__btn, .catalog-item__more').click(function(event) {
		event.preventDefault();
	});

	// CATALOG
	$('.catalog-item').click(function(event) {
		var modal  = $('#good'),
			elem   = $(this),
			img    = elem.find('.catalog-item__img-image[data-place="origin"] img').attr('data-big'),
			title  = elem.find('.catalog-item__title').text(),
			inCase = elem.find('.catalog-item__title').next('div').html(),
			price1 = +elem.attr('data-price-a'),
			price2 = +elem.attr('data-price-b'),
			price3 = +elem.attr('data-price-c'),
			info   = elem.find('.catalog-modal').html();

		modal.find('.good-card__img img').attr('src', img);
		modal.find('.good-card__title').html(title);
		modal.find('input[name="good"]').attr('value', title);
		modal.find('.good-card__in-case').html(inCase);
		modal.find('.good-card__characteristic').html(info);

		modal.find('#dPipe1').attr('data-price', price1);
		modal.find('#dPipe2').attr('data-price', price2);
		modal.find('#dPipe3').attr('data-price', price3);

		modal.find('.good-card__price').html(price1 + ' руб.');

		$('.dPipe-grid__input').change(function(event) {
			modal.find('.good-card__price').html($(this).attr('data-price') + ' руб.');
		});

		$.fancybox.open(modal, {
			afterClose : function( instance, current ) {
				modal.find('.good-card__img img').removeAttr('src');
				modal.find('form').trigger('reset');
			}
		});
	});

	// ============================
	// CATALOG TOGGLE
	// ============================
	$('.catalog__btn').click(function(event) {
		event.preventDefault();

		$(this).toggleClass('catalog__btn_active');

		if ( mediaQuery('min', 641) ) {

			if ( $(this).hasClass('catalog__btn_active') ) {
				$('.catalog-grid_2 .catalog-col:nth-child(n + 17)')
					.slideDown(300);
			} else{
				$('.catalog-grid_2 .catalog-col:nth-child(n + 17)')
					.slideUp(300, function () {
						$(this).removeAttr('style');
					});
			};

		} else {

			if ( $(this).hasClass('catalog__btn_active') ) {
				$('.catalog-grid_1 .catalog-col:nth-child(n + 4), .catalog-grid_2 .catalog-col')
					.slideDown(300);
			} else{
				$('.catalog-grid_1 .catalog-col:nth-child(n + 4), .catalog-grid_2 .catalog-col')
					.slideUp(300, function () {
						$(this).removeAttr('style');
					});
			};

		};
	});

	// ============================
	// VALIDATE
	// ============================
	$('.custom-form__btn').on('click', function(event) {
		var check = $(this).parents('form').find('.custom-form-accept__input').prop('checked');

		if (!check) {
			event.preventDefault();
			$(this).parents('form').find('.custom-form-accept__input').addClass('error');
		};
	});

	$('form').each(function(index, el) {
		$(this).find('.custom-form-accept__input').attr('id', 'accept' + index);
		$(this).find('.custom-form-accept__label').attr('for', 'accept' + index);

		$(el).validate({
			rules:{
				'phone':{ required:true }
				// 'mail':{ required:true, email: true }
			},
			submitHandler: function(form){
				$(form).ajaxSubmit({
					type: 'POST',
					url: 'mail.php',
					success: function() {
						$(form).trigger( 'reset' );
						document.location.href = "thanks.html";
					}
				});
			}
		});
	});
});