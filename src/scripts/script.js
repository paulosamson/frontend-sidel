

$(document).ready(function(){
  $('.dropdown').hover(function(){
    $(this).toggleClass('dropdown-active');
  });
  
  $(".toggle-content .trigger").click(function (e) {
      var parentli = $(this).parents("li");
      if (parentli.hasClass("open")) {
          parentli.removeClass("open");
      } else {
          parentli.siblings().removeClass("open");
          parentli.addClass("open");
          $('html,body').animate({
              scrollTop: parentli.offset().top
          }, 300);
      }
  });

  $(".toggle-content .openall").click(function (e) {
      var ulElem = $(this).parents("ul");
      var parentli = $(this).parents("li");
      if (parentli.hasClass("allclose")) {
          $(".per-all").removeClass("allclose");
          $(".per-all").addClass("allopen");
          $(".openall").text(ulElem.data("closeall"));
          $(".per-content").addClass("open");
      } else if (parentli.hasClass("allopen")) {
          $(".per-all").removeClass("allopen");
          $(".per-all").addClass("allclose");
          $(".openall").text(ulElem.data("openall"));
          $(".per-content").removeClass("open");
      }
  });

  
	var slideshow = $("#slideshow-hero");
	var slideshowServices = $("#slideshow-services");
	
	

	if (Modernizr.csstransitions) {

	    slideshow.owlCarousel({
	        items: 1,
	        responsiveRefreshRate: 1,
	        navigation: true, // Show next and prev buttons
	        slideSpeed: 300,
	        paginationSpeed: 400,
	        singleItem: true,
	        responsive: true,
	        navigationText: ["", ""],
	        autoHeight: false,
	        rewindNav: true,
	        mouseDrag: false,
	        touchDrag: false,
	        transitionStyle: 'fade'
	    });


	    var slideHero = $('#slideshow-hero').data('owlCarousel');
	  var edgeBtns='<div class="edge-btn-left" style="cursor:pointer;position: absolute;width: 400px;height: 100%;left: 50%;margin-left: -950px;top:0px"></div>';
	  edgeBtns+='<div class="edge-btn-right" style="cursor:pointer;position: absolute;width: 400px;height: 100%;right: 50%;margin-right: -950px;top:0px"></div>';
	  $("#slideshow-hero").append(edgeBtns);
	  $('.hero-banner').css('overflow','hidden');
	  $('.edge-btn-right').on('click',function(e){
				slideHero.next();
		});
		
	  $('.edge-btn-left').on('click',function(e){ slideHero.prev(); });
	  
	  
	  slideshowServices.owlCarousel({
		autoPlay: 8000,
		responsiveRefreshRate:1,
		items : 1,
		navigation : false, // Show next and prev buttons
		pagination : false,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		responsive: true,
		autoHeight : false,
		rewindNav : true,
		mouseDrag : false,
		touchDrag : false,
		transitionStyle: 'fade'
	  });
	  
	  var topBannerCount = $('.banner-wrapper,.owl-wrapper').length;
	  if (topBannerCount > 0){
		$('body').addClass('has-top-banner');
	  }
	  
	}else{
		slideshow.removeClass('owl-carousel');
		slideshowServices.removeClass('owl-carousel');
		slideshow.removeClass('owl-theme');
		slideshowServices.removeClass('owl-theme');
		
		var ctrlhtml = '';
		ctrlhtml+='<div class="alt-controls" style="text-align: center;position: absolute;width: 100%;bottom: 0px;height: 50px;margin: 0;z-index:99999;">';
		ctrlhtml+='<div class="alt-thumbnails" style="opacity:0.5;position: absolute;width: 100%;bottom: 20px;"></div>';
		ctrlhtml+='<div class="alt-buttons" style="opacity:0.5;position: relative;width: 1100px;margin: 0 auto;">';
		ctrlhtml+='<div class="alt-prev" style="opacity:0.5;left: 0px;background: url(images/img-slideshow-prev.png) top left no-repeat;position: absolute;width: 50px;height: 50px;margin: 0px;padding: 0px;font-size: 12px;bottom: 200px;"></div>';
		ctrlhtml+='<div class="alt-next" style="opacity:0.5;right: 0px;background: url(images/img-slideshow-next.png) top left no-repeat;position: absolute;width: 50px;height: 50px;margin: 0px;padding: 0px;font-size: 12px;bottom: 200px;"></div>';
		ctrlhtml+='</div></div>';

        //transfer the data-src url into div.item-image background style
	    $.each(slideshow.find(".lazyOwl"), function() {
	        var src = $(this).data("src");

	        $(this).css("background-image", "url('" + src + "')");
	    });

		slideshow.parent().append(ctrlhtml);
		slideshow.carouFredSel({  
			items       : {
				visible : 1
			},
			responsive  : true,
			scroll      : {  
				fx          : "crossfade" 
			},  
			prev    : {
				button  : ".alt-prev",
				key     : "left"
			},
			next    : {
				button  : ".alt-next",
				key     : "right"
			},
			auto        : false,  
			pagination  : {  
				container       : ".alt-thumbnails",  
				anchorBuilder   : function( nr ) {  
					var src = $("img", this).attr( "src" );  
					src = src.replace( "/large/", "/small/");  
					return '<div style="display: inline-block;zoom: 1;"><span style="display: block;width: 24px;height: 14px;margin: 5px 3px;filter: Alpha(Opacity=50);opacity: 0.5;background: #fff;"><img src="' + src + '" / style="width:100%;height:auto;display:none;"></span></div>';  
				}  

			}  
		}).parent().parent().addClass('fallback-ie'); 
		
		slideshowServices.carouFredSel({  
			items       : {
				visible : 1,
				width: 1200
			}, 
			responsive  : true,
			scroll      : {  
				fx          : "crossfade" 
			},
			auto:true
		}).parent().parent().addClass('fallback-ie');
	}
  
  var topBannerCount = $('.banner-wrapper,.owl-wrapper,.caroufredsel_wrapper').length;
  if (topBannerCount > 0){
    $('body').addClass('has-top-banner');
  }
  
  
  
  
  
  /* css way 
  $(".sidel-widget .widget-body ul li .btn-toggle").on('click',function(){
    $(this).parent().toggleClass('active');
  });
  */

    
  
  $(".footer-links nav li").addClass('dontend');
  if ($(".with-nl").length == 0)
  {
      $(".footer-links nav").columnize({
          columns: 2
      });
  }
  
  
  
  
  $('.hastip').tooltipsy({
    offset: [-10, 0],
    show: function (e, $el) {
      $el.css({
        'left': parseInt($el[0].style.left.replace(/[a-z]/g, '')) - 30 + 'px',
        'opacity': '0.0',
        'display': 'block'
      }).animate({
        'left': parseInt($el[0].style.left.replace(/[a-z]/g, '')) + 30 + 'px',
        'opacity': '1.0'
      }, 300);
    },
    hide: function (e, $el) {
      $el.slideUp(100);
    }
  });
  
  /* columnized 
  $('.article-download-body li').addClass('dontend');
  $(".article-download-body").columnize({
      columns: 3
  });
  */
  
  $('.article-preview .widget-body,.article-related-videos .widget-body').append('<div class="ghost"></div><div class="ghost"></div><div class="ghost"></div>');
  
  
  // sidel TV
  /*
  $('#image-iframe-play').on('click',function(e){
    e.preventDefault();
    var vidUrl = $('img#image-iframe').data('vidurl');
    $(this).parent().append('<iframe id="video-iframe" src="'+vidUrl+'&autoplay=1" width="627" height="397"></iframe>');
    $('img#image-iframe').hide(200);
    $(this).hide();
  });
  */
  

  

  (function () {
      //load calculator
      var i = $("#calculator-wrap").length > 0 ? true : false;
      Modernizr.load({
          test: i,
          yep: ["/frontend/css/calculator.css?v=6", "/frontend/js/jquery.tmpl.min.js", "/frontend/js/jquery.validate.js", "/frontend/js/jquery.form.js", "/frontend/js/calculator.js?v=6"]
      });

      //load packaging calculator
      var f = $("#pack-calc-wrap").length > 0 ? true : false;
      Modernizr.load({
          test: f,
          yep: [
                "/scripts/icheck/skins/flat/orange.css",
                "/scripts/icheck/icheck.min.js",
                "/scripts/selectric/jquery.selectric.min.js",
                "/frontend/js/jquery.tmpl.min.js",
                "/frontend/js/jquery.validate.js",
                "/frontend/js/jquery.form.js",
                "/scripts/packaging-calculator.js?v=7"]
      })
  }());


  (function () {
      var t = true;
      var s = $("#appInfomercial");
      var i = $("#close-infomercial");
      if (t) {
          if ($("body").data("splash") == 1) {
              $("body").append('<script type="text/javascript" src="/frontend/js/pet-banner-script.js"></script>')
          }
      }
      if (!s[0]) {
          return
      }
      if (navigator.userAgent.match(/iPad/i)) {
          t = false;
          $(".show-appinfomercial").on("click touchend", function () {
              var u = $(this).attr("href");
              s.fadeIn(250);
              i.data("close-link", u);
              return false
          })
      } else {
          if (navigator.userAgent.match(/iPhone/i)) {
              t = false;
              s.addClass("iPhone");
              $(".show-appinfomercial").on("click touchend", function () {
                  var u = $(this).attr("href");
                  s.fadeIn(250);
                  i.data("close-link", u);
                  return false
              })
          } else {
              s.remove()
          }
      }
      i.on("click touchend", function () {
          window.location = i.data("close-link")
      })
  }());

  (function () {
      if (window.addthis) {
          var i;
          i = {
              ui_offset_top: 0
          };
          
          addthis.button("#btn-share-network")
      }
  }());

    //login form
  (function () {
      var i = $("#select-list-categories");
      i.on("change", function (t) {
          var s, u;
          s = $(this).find("option:selected").data("catid");
          u = (s === undefined) ? "?none" : "?cat=" + $(this).find("option:selected").data("catid");
          window.location = u
      })
  }());

  (function () {
      var i = $("#forgotPasswordForm");
      $("#forgotPassword").on("click", function (s) {
          i.removeClass("hide");
          return false
      })
  }());

    //breadcrumb
  (function () {
      var s, u, B, t, v;
      s = $(".breadcrumb").length > 0;
      if (s) {
          u = $(".breadcrumb > li "), B = null, t = $(".breadcrumb-lvl2-wrapper"), v = null;
          u.on({
              mouseenter: function () {
                  var C = $(this);
                  var i = C.find(".breadcrumb-lvl2-wrapper");
                  clearTimeout(v);
                  if (!i.is(":animated") && !i.is(":visible")) {
                      $(".breadcrumb-active").hide();
                      i.addClass("breadcrumb-active");
                      i.stop(true, true).animate({
                          height: "toggle",
                          easing: "swing"
                      }, 550, function () { })
                  }
              },
              mouseleave: function () {
                  var C = $(this);
                  var i = C.find(".breadcrumb-lvl2-wrapper");
                  if (!i.is(":animated") && i.is(":visible") && !i.hasClass("hoveredIn")) {
                      i.stop(true, true).slideUp(880);
                      C.removeClass("breadcrumb-active");
                      C.removeClass("hoveredIn")
                  }
              }
          });
          t.on({
              mouseenter: function () {
                  var i = $(this);
                  i.addClass("hoveredIn");
                  if (i.is(":animated")) {
                      i.clearQueue();
                      clearTimeout(v)
                  }
              },
              mouseleave: function () {
                  var i = $(this);
                  v = setTimeout(function () {
                      if (i.is(":visible")) {
                          i.stop(true, true).animate({
                              height: "toggle",
                              easing: "swing"
                          }, 550, function () {
                              clearTimeout(v)
                          })
                      }
                      i.removeClass("breadcrumb-active");
                      i.removeClass("hoveredIn")
                  }, 500)
              }
          });

         
      }
  }());
    //end breadcrumb

    //sitemap
  (function () {
      var v = $("#sitemap");
      var i = v.find(".has-children");
      var s = v.find("ul.hide");
      var u = null;
      var t = null;
      i.on("mouseenter mouseleave", function (w) {
          var x = $(this);
          clearTimeout(t);
          if (w.type === "mouseenter") {
              t = setTimeout(function () {
                  x.next().show()
              }, 300)
          } else {
              u = setTimeout(function () {
                  x.next().hide()
              }, 500)
          }
      });
      s.on("mouseenter mouseleave", function (w) {
          var x = $(this);
          if (w.type === "mouseenter") {
              clearTimeout(u)
          } else {
              u = setTimeout(function () {
                  x.hide()
              }, 500)
          }
      })
  }());
    //end sitemap

    //right side navigation on hover
  $(function () {
      var ef = null;
      var lf = null;
      var e = $(".sidel-widget .widget-body ul li");
      e.on('mouseenter mouseleave', function (w) {
          clearTimeout(ef);
          if ($(this).hasClass("current"))
              return;

          var t = $(this);
          var subs = $(t).find('ul.sub-list');

          if (subs.length > 0) {
              if (w.type == "mouseenter") {
                  ef = setTimeout(function () {
                      $(parent).addClass('active');
                      $(subs).show();
                  }, 300);
              }
              else {
                  
                  $(parent).removeClass('active');
                  $(subs).hide();
                  
              }
          }
      });
  });
    //end right side navigation on hover
});

    

if (typeof jQuery != "undefined") {
    jQuery(document).ready(function (a) {
        var c = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
        var b = "";
        if (jQuery("base").attr("href") != undefined) {
            b = jQuery("base").attr("href")
        }
        jQuery("a").each(function () {
            var d = jQuery(this).attr("href");
            if (d && (d.match(/^https?\:/i)) && (!d.match(document.domain))) {
                jQuery(this).click(function (event) {
                    var e = d.replace(/^https?\:\/\//i, "");
                    _gaq.push(["_trackEvent", "Ekstern link", "Klik", e]);
                    if (d != undefined && d.toLowerCase().indexOf("sidel") >= 0) {
                        if (jQuery(this).attr("target") != undefined && jQuery(this).attr("target").toLowerCase() != "_blank") {
                            setTimeout(function () {
                                location.href = d
                            }, 200);
                            return false
                        }
                    }
                    else {
                        event.preventDefault();
                        event.stopPropagation();
                        window.open(d, '_blank');
                    }
                    
                    
                })
            } else {
                if (d && d.match(/^mailto\:/i)) {
                    jQuery(this).click(function () {
                        var e = d.replace(/^mailto\:/i, "");
                        _gaq.push(["_trackEvent", "E-mail link", "Klik", e])
                    })
                } else {
                    if (d && d.match(c)) {
                        jQuery(this).click(function () {
                            var e = (/[.]/.exec(d)) ? /[^.]+$/.exec(d) : undefined;
                            var f = d;
                            _gaq.push(["_trackEvent", "Download", "Klik-" + e, f]);
                            if (jQuery(this).attr("target") != undefined && jQuery(this).attr("target").toLowerCase() != "_blank") {
                                setTimeout(function () {
                                    location.href = b + d
                                }, 200);
                                return false
                            }
                        })
                    }
                }
            }
        })
    })
}


  
  var c,hyt,hiHyt;
  c=0;
  hiHyt=20;
  
  $('.main-menu-item .sub-menu').each(function(){
    c+=1;
    $(this).find('ul').each(function(){
      hyt = parseInt($(this).outerHeight());
      if (hiHyt < hyt){
        hiHyt = hyt;
      }
    });
    $(this).find('ul').each(function(){
      //$(this).css('height',hiHyt);
    });
    //alert('hightest height on '+c+' is '+hiHyt);
  });
  

  
$(function () {
    var bg = $(".big-link");
    if (bg.length == 0)
        return;

    $(bg).click(function () {
        var a = $(this);
        window.open($(a).attr("data-href"), $(a).attr("data-target"));
        
    });
  
  
});

$(function () {
    var currentPage = window.location.protocol + "//" + window.location.host + location.pathname;

    $(".footer section.social > ul > li > a, #widget-side-links ul li a").click(function () {
        var t = $(this);
        var className = t.attr("class");
        var title = t.attr("title");

        if (className == "newsletter-icon") {
            _gaq.push(['_trackEvent', 'Newsletter sign up', "Icon", currentPage]);
            //console.warn("Newsletter sign up - Icon " + currentPage);
        }
        else {
            var scLink = t.attr("href").replace(/^https?\:\/\//i, "");
            _gaq.push(['_trackEvent', 'Social media links', scLink, currentPage]);
            //console.warn('Social media links - ' + scLink + " - " + currentPage);
        }
    });

    $(".newsletter-signup-now").click(function () {
         _gaq.push(['_trackEvent', 'Newsletter sign up', "Signup button", currentPage]);
        //console.warn("Newsletter sign up - Signup button " + currentPage);
    });

});

function FnIsValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


$(window).bind("load", function () {
    //Load language menu
    var lMenu = $("#languageMenu");
    if (lMenu) {
        if (!lMenu.data("loaded")) {
            $.ajax({
                url: "/Base/LanguageMenu/GetLanguageMenu/?nodeName=" + encodeURIComponent(lMenu.data("nodename")) + "&level=" + lMenu.data("level"),
                type: "GET",
                success: function (result) {
                    lMenu.attr("data-loaded", "true");
                    lMenu.html(result);
                }
            });
        }
    }
});

   


