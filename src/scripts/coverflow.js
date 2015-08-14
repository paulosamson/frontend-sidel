$(function () {

    if ($("#covers-wrapper").length > 0) {

        var nrItems, defaultShownItems, shownItems, coverWidth, temp;
        defaultShownItems = 4;
        shownItems = defaultShownItems;
        temp = 0;
        nrItems = $('#covers .item').length;


        if (nrItems < shownItems) {
            shownItems = nrItems;
            $('#covers').addClass('nr' + nrItems);
        }

        if ((nrItems > 1) && (nrItems < 7)) {
            $('#covers').find('.item').each(function () {
                temp += 1
                $(this).addClass('origitem-' + temp).clone().addClass('clone').appendTo('#covers');
            });
        }
        coverWidth = 600;

        if (nrItems > 1) {

            $("#covers").carouFredSel({
                circular: true,
                auto: false,
                width: 600,
                height: 337,
                items: {
                    visible: shownItems,
                    minimum: shownItems,
                    width: (600 / shownItems)
                },
                direction: "right",
                scroll: {
                    items: 1,
                    fx: "none",
                    onBefore: function (data) {

                        var pos = $("#covers").triggerHandler("currentPosition");
                        var nr = (defaultShownItems - shownItems);

                        data.items.old.add(data.items.visible).find('.descbox, .image-play').stop().fadeOut();

                        data.items.old.add(data.items.visible).addClass('add');
                        //data.items.old.find('.item').css('height','330px');

                        //data.items.visible.last().addClass('last');

                        $('#covers').children().each(function () {
                            $(this).removeClass('visible-1 visible-2 visible-3 visible-4 add last current shown');
                        });

                        data.items.visible.each(function () {
                            $(this).addClass('shown');
                        })

                        $('#covers-thumbs ul li').removeClass('active');
                        //$('#covers-thumbs ul li:nth-child('+(pos+1)+')').toggleClass('active');

                        $('#covers-thumbs ul li[data-slide=".origitem-' + (data.items.visible.last().data("sliden")) + '"]').toggleClass('active');


                        data.items.visible.last().addClass('current');



                        data.items.visible.each(function () {
                            $(this).addClass('shown');

                            nr += 1;
                            $(this).addClass('visible-' + nr);

                        })

                    },
                    onAfter: function (data) {
                        data.items.visible.last().find('.descbox, .image-play').stop().fadeIn();

                        $('#covers').children('.shown').each(function () {
                            $(this).removeClass('old');
                        });
                        data.items.old.last().addClass('old');

                        var nr = (defaultShownItems - shownItems);
                        data.items.visible.each(function () {
                            $(this).addClass('shown');

                            nr += 1;
                            $(this).addClass('visible-' + nr);
                        })
                    },
                    onCreate: function (data) {


                        data.items.visible.each(function () {
                            $(this).addClass('shown');

                            nr += 1;
                            $(this).addClass('visible-' + nr);
                        })
                    }
                }
            });

            for (i = 1; i <= nrItems; i++) {
                if (nrItems > 0 /*shownItems*/) {
                    $('#covers-wrapper').find('#covers-thumbs ul').append('<li data-slide=".origitem-' + i + '"></li>');
                }
            }

            $('#covers-thumbs ul li').on('click', function () {
                var ind = $(this).index() - (shownItems - nrItems) + 1;
                $('#covers').trigger('slideTo', [ind]);
            });


            $('#covers').trigger('slideTo', [0, -(nrItems - 1)]);

            $('#covers').children().click(function () {
                $('#covers').trigger('slideTo', [this, -(shownItems - 1)]);
            });



        } else {
            $('#covers .item').addClass('current');
        }


        $('#covers').children().each(function () {
            var src = $(this).find('.featuredimg').attr('src');
            $(this).find('.front').css({ "background-image": "url(" + src + ")" });
        });


        $('#covers .item .card .cover .front').on("click", function () {
            var el = $(this).closest('.item');
            var elnr = el.index();
            var vid = el.data('youtube');
            var title = el.find('.heading').text();
            if ((elnr == (shownItems - 1)) || (nrItems == 1)) {
                $(this).closest('.card').toggleClass('flip');
                el.toggleClass('fillcover');
                $(this).parent().find('.back').append("<iframe class='main-player' width='" + coverWidth + "' height='337' src='https://www.youtube.com/embed/" + vid + "?rel=0&autohide=1&showinfo=0&autoplay=1&wmode=transparent' frameborder='0' allowfullscreen></iframe>");
                $("#covers-thumbs").fadeToggle();
                $("#covers-wrapper .btn-close .title-current-slide").text(title);
                $("#covers-wrapper .btn-close .exit-video, #covers-wrapper .btn-close .title-current-slide").fadeIn();
            }
        });

        $("#covers-wrapper .btn-close .exit-video").on("click", function () {
            var el = $('#covers').find('.current');
            var elnr = el.index();
            if ((elnr == (shownItems - 1)) || (nrItems == 1)) {
                el.find('.card.flip').toggleClass('flip');
                el.toggleClass('fillcover');
                $("#covers .item .back iframe").remove();
                $("#covers-thumbs").fadeToggle();
                $(this).siblings('.title-current-slide').fadeOut();
            }
            $(this).fadeOut();
        });



        $('#covers .item .front .descbox .otherlinks').on('click', function (e) {
            e.stopPropagation();
        });

    }

});
