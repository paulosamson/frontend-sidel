$(window).load(function(){
	
	if($('.main-menu').find('.main-menu-item > a').length > 0)
		var altmenu = $('.main-menu').find('.main-menu-item > a');
	else
		var altmenu = $('.main-menu').find('.main-menu-item > span');
	
	altmenu.each(function(){
		var hyt = $(this).height();
		//alert(hyt);
		if (hyt > 20){
			//$(this).css('margin','27px 0');
			$(this).animate({
				'margin-top':27,
				'margin-bottom':27
			},300);
		}
	});
	
});


$(document).ready(function () {
    var objA, wd;
    objA = $('.sidebar-widget-contact .widget-title a');
    wd = objA.height();
    if (wd >= 40) {
        objA.css('font-size', '16px');
    }
	
	
	/*
	$(".main-menu-item").mouseenter(function() {
		$(this).find(".sub-wrapper").addClass("nav-menu-open");
	}).mouseleave(function() {
		$(this).find(".nav-menu-open").removeClass("nav-menu-open");
	});
	*/
		
		if(Modernizr.touch){
			
			$("#menu .main-menu").children("li").addClass("main-menu-item");
			$("#menu .main-menu").find(".sub-wrapper").addClass("sub-menu");
			
			var myArray = $('.main-menu-item > a');
			$.each(myArray, function(index, value){
				console.log("INDEX: " + index + " VALUE: " + value);
				mytext = $('.main-menu-item > a:eq('+index+')').html();
				$('.main-menu-item:eq('+index+')').prepend("<span data-url='"+value+"'>"+mytext+"</span>");
			});
			$('.main-menu-item > a').remove();
			//$('.drop').hide();
			
			$('.main-menu-item').on('click', function(e) {
				
				if($(this).find(".sub-menu").hasClass("nav-menu-open") || $(this).find(".sub-menu").length == 0){

					$(location).attr('href', $(this).children("span").data("url"));
				
				}else{
					
					$(".main-menu").find(".sub-wrapper").removeClass("nav-menu-open");
					$(this).find(".sub-wrapper").addClass("nav-menu-open");
					
				}
				
			});
			
			$('.container').click(function() {
				$(".main-menu").find(".sub-wrapper").removeClass("nav-menu-open");
			});
			
			$('#menu').click(function(event){
				event.stopPropagation();
			});
			
			
		}else{
			$("nav#menu").accessibleMegaMenu({
				uuidPrefix: "accessible-megamenu",
				menuClass: "main-menu",		
				topNavItemClass: "main-menu-item",
				panelClass: "sub-menu",		
				panelGroupClass: "sub-menu-group",
				hoverClass: "nav-menu-hover",
				focusClass: "nav-menu-focus",
				openClass: "nav-menu-open"
			});
		}
	
	/*-- FILTERS AREA ---*/
	//for custom checkbox and radio inputs
	$('.filters input[type=checkbox], .filters input[type=radio]').customRadioCheck();
	
	$(".filter .form-checkboxes .custom-label:odd").css('background-color','f7f8f8');
	$(".filter .form-checkboxes .custom-label:even").css('background-color','#eaebeb');
	
	

	//$('.filter').prepend('<span class="btn-toggle" style="position:absolute;top:0px;right:0px;width:50px;height:40px;z-index:1;"></span>');
	$('.active .btn-toggle').click(function(e){
		$('.filter').removeClass('active');
	});
	
	$('.filter').on('click',function (e) {
		$('.filters .active').not(this).removeClass('active');
		$(this).toggleClass('active');
	});
	
	$("#widget-side-links").stick_in_parent();
	
	
	/*-- fouc control --*/
	$('.fouc').removeClass('fouc');
});


if ($('iframe#player').length > 0) {
    var tag = document.createElement("script");
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var videoArray = new Array();
    var playerArray = new Array();

    var onSidelTv = $('iframe#player').length > 0;
    var iframeSrc = $('iframe#player').attr("src");

    //SIDEL TV
    if (onSidelTv) {

        if (Modernizr.csstransitions == false) {
            var loaderAnim = '<div class="spinner"><img src="/images/orange-loader.gif" width="50" height="50" /></div>';
        }
        else {
            var loaderAnim = '<div class="spinner"><div class="spinner-container unit1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container unit2">';
            loaderAnim += '<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>';
            loaderAnim += '<div class="spinner-container unit3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
        }

        $('.image figure').append(loaderAnim);

        var imgEl = $('#image-iframe');
        imgEl.hide();
        var img = imgEl.attr('src');
        imgEl.load(img, function () {
            $(this).fadeIn();
        });
    }
    else {
        (function (a) {
            function b() {
                var c = 0;
                jQuery("iframe").each(function () {
                    var f = a(this);
                    if (f.attr("src") === undefined) {
                        var g = ""
                    } else {
                        var g = f.attr("src")
                    }
                    var e = /h?t?t?p?s?\:?\/\/www\.youtube\.com\/embed\/([\w-]{11})(?:\?.*)?/;
                    var d = g.match(e);
                    if (d && d.length > 1) {
                        videoArray[c] = d[1];
                        a(this).attr("id", d[1]);
                        c++
                    }
                })
            }
            a(document).ready(function () {
                b()
            })
        })(jQuery);
    }


    var player;
    function onYouTubeIframeAPIReady() {
        if (onSidelTv) {
            player = new YT.Player('player', {
                events: {
                    'onReady': onPlayerReadySidelTv,
                    'onStateChange': onPlayerStateChangeSidelTv
                }
            });
        }
        else {
            for (var a = 0; a < videoArray.length; a++) {
                //YT.Player.AddEventListener('onStateChange', function (e) {
                //    console.log('State is:', e.data);
                //});
                playerArray[a] = new YT.Player(videoArray[a], {
                    events: {
                        'onStateChange': onPlayerStateChangeRegularPage,
                        'onReady': onPlayerReadyRegularPage
                    }
                })
            }
        }

    }

    var _pauseFlag = false;
    function onPlayerStateChangeRegularPage(a) {
        videoarraynum = a.target.id - 1;
        if (a.data == YT.PlayerState.PLAYING) {
            _gaq.push(["_trackEvent", "Video", "Play", videoArray[videoarraynum]]);
            _pauseFlag = false
        }
        if (a.data == YT.PlayerState.ENDED) {
            _gaq.push(["_trackEvent", "Video", "End", videoArray[videoarraynum]])
        }
    }

    function onPlayerReadyRegularPage() { }

    function onPlayerReadySidelTv(event) {
        setTimeout(function () {
            event.target.playVideo()
        }, 0);
    }

    var done = false;
    function onPlayerStateChangeSidelTv(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            $('.image figure').fadeToggle('slow');
            done = true;
        }

        _gaq.push(["_trackEvent", "Video", "Play", iframeSrc]);
        //event tracking
        if (event.data == YT.PlayerState.PLAYING) {
            _gaq.push(["_trackEvent", "Video", "Play", iframeSrc]);
        }
        else if (event.data == YT.PlayerState.ENDED) {
            _gaq.push(["_trackEvent", "Video", "End", iframeSrc]);
        }

    }

    function stopVideo() {
        player.stopVideo();
    }
}


function lazyLoadImage(el) {
    if (typeof el === "undefined" || el === null)
        return;

    var src = el.getAttribute('data-src');
    if (src) {
        if (el.tagName === "IMG")
            el.setAttribute('src', src);
        else {
            $(el).css("background-image", "url('" + src + "')");
        }

        el.removeAttribute('data-src');
    }
}

$(window).bind("load", function () {
    //article images
    $(".article-previews .lazy").each(function () {
        lazyLoadImage(this);
    });

    //first item in sliders and service banners
    //$('.owl-carousel').each(function () {
    //    var el = $(this).find(".lazy:first");
    //    lazyLoadImage(el[0]);
    //});

    //images in footer
    $(".footer .lazy").each(function () {
        lazyLoadImage(this);
    });

    //rest of the service banners
    setTimeout(function () {
        $(".services-banner .lazy").each(function () {
            lazyLoadImage(this);
        });
    }, 500);


    //rest of the sliders
    setTimeout(function () {
        $(".hero-banner .lazy").each(function () {
            lazyLoadImage(this);
        });
    }, 500);
});

$(document).ready(function () {
    if ($("#slideshow-hero"))
        lazyLoadImage($("#slideshow-hero").find(".lazy:first")[0]);
});