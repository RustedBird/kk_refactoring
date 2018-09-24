;(function ($) {

    // Showing menu on desctop resolution
    window.onresize = function() {
        if (window.innerWidth > 1024) {
            $('.menu').show();
            $('.menu ul').show();
        }
    };

    // Toggling menu on mobile resolutions
    $(document).on('click', '.menu i', function () {
        var $menuIcon = $('.menu i');
        $menuIcon.toggleClass('active');
        if ($menuIcon.hasClass('active')) {
            $('.menu ul').slideDown(200);
        } else {
            $('.menu ul').slideUp(200);
        }
    });

    // Hiding and showing menu on mobile resolutions
    $(window).scroll(function () {
        if (window.innerWidth <= 1024) {
            var $menu = $('.menu');
            if ($(window).scrollTop() > 250) {
                $menu.slideUp(200);
                $menu.find('ul').slideUp(200);
            } else {
                $menu.slideDown(200);
            }
        }
    });

    //Fullpage parameters and changing bg function
    $(document).ready(function () {
        $('#fullpage').fullpage({
            navigation: false,
            autoScrolling: true,
            scrollingSpeed: 700,
            scrollHorizontally: false,
            verticalCentered: true,
            responsiveWidth: 1024,
            afterLoad: function changeBg () {
                var $activeArticle = $('.main-content .section.active');
                var imagePath = $activeArticle.attr('data-custom-background-img');
                var newImage = new Image();
                newImage.src = imagePath;
                var src = newImage.getAttribute('src');
                newImage.onload = function () {
                    if (src === $('.main-content .section.active').attr('data-custom-background-img')) {
                        $('.bg').css('background-image', 'url(' + imagePath + ')');
                    }
                };
                if (newImage.naturalWidth) {
                    $('.bg').css('background-image', 'url(' + imagePath + ')');
                }
                var activeSection = $('.section.active').attr('data-number');
                $('.menu li').removeClass('active');
                $('.menu li a[href="' + activeSection + '"]').closest('li').addClass('active');
            },
        });
    });

    //Scrolling page by menu
    $(document).on('click', '.menu a', function (e) {
        e.preventDefault();
        var activeSection = $('.section.active').attr('data-number'),
            nextSection = $(this).attr('href'),
            $this = $(this);
        $('.menu li').removeClass('active');
        $this.closest('li').addClass('active');
        if (activeSection !== nextSection) {
            $.fn.fullpage.moveTo(nextSection);
        }
    });

    //Slick slider
    $('#slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        asNavFor: '#slider-nav'
    });
    $('#slider-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#slider-for',
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    //
    $('.case_item').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var content = $(this).find('.case_content').html();
        $('#contentModal .modal-body').html(content);
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
        $('#contentModal').modal('show');
    });

    $('#contentModal').on('hidden.bs.modal', function () {
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
    });

    $('.main .button:first-of-type').on('click', function (e) {
        e.preventDefault();
        $.fn.fullpage.moveTo(3);
    })

    $('.main .button:last-of-type').on('click', function (e) {
        e.preventDefault();
        $.fn.fullpage.moveTo(2);
    })





})(jQuery);