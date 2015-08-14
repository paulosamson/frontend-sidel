(function ($) {
    
    var coolFilter = {
        Checkboxes:  [],
        InitialPageTotal: 1,
        ParentId: 1,
        Parts: [],
        AjaxPath: "",
        Container: '',
        BeginningPathFromCookie: '',
        ScrollToElementOnFirstRun: true,
        DisableScroll: false,
        ShowInitialList: false,
        InitialList: "",
        OfflineFilter: false,
        FilterFunction: null,
        ItemsRepoContainer: ''
    };


    $.coolFilter = function (options)
    {
        var firstRun = true,
            isLoadedFromCookie = false;

        var hashManager = {
            nullChar: '~',
            hash: '',
            parts: options.Parts,
            SetInternalHash: function (value) {
                this.hash = value;
                var tmp = value;
                if (tmp[0] == '/') tmp = tmp.substring(1);
                var valueParts = tmp.split('/');
                for (var i = 0; i < valueParts.length; i++) {
                    this.parts[i] = valueParts[i] == this.nullchar ? [] : valueParts[i].split(',');
                }
            },
            Add: function (target, input) {
                var value = input.toString();
                var found = false;

                if (this.parts[target] == this.nullChar)
                    this.parts[target] = [];

                for (var i = 0; i < this.parts[target].length; i++) {
                    if (this.parts[target][i] == value)
                        found = true;
                }
                if (!found)
                    this.parts[target].push(value);


            },
            Remove: function (target, input) {
                var value = input.toString();
                for (var i = 0; i < this.parts[target].length; i++) {
                    if (this.parts[target][i] == value) {
                        this.parts[target].splice(i, 1);
                    }
                }
                if (this.parts[target].length == 0)
                    this.parts[target].push(this.nullChar);
            },
            Toggle: function (target, input) {
                var value = input.toString();
                var value = input.toString();
                var found = false;
                if (this.parts[target] == this.nullChar)
                    this.parts[target] = [];
                for (var i = 0; i < this.parts[target].length; i++) {
                    if (this.parts[target][i] == value) {
                        this.parts[target].splice(i, 1);
                        found = true;
                    }
                }
                if (!found)
                    this.parts[target].push(value);
                if (this.parts[target].length == 0)
                    this.parts[target].push(this.nullChar);
            },
            Clear: function (target) {
                this.parts[target] = [];
            },
            ClearAll: function () {
                for (var i = 0; i < this.parts.length; i++) {
                    this.Clear(i);
                }
                this.Add(0, options.ParentId);
            },
            Trigger: function () {
                this.hash = '';
                for (var i = 0; i < this.parts.length; i++) {
                    var joined = this.parts[i].join();
                    this.hash += '/' + (joined && joined != '' ? joined : this.nullChar);
                }
                SWFAddress.setValue(this.hash);
            },
            SyncSelectsWithHash: function () {
                var pathNames = SWFAddress.getPathNames();

                if (pathNames.length > 0) {
                    //paging
                    this.parts[this.PageNoIndex] = pathNames.length > this.PageNoIndex ? pathNames[this.PageNoIndex] : '';

                    //checkboxes
                    for (var i = 1; i <= options.Checkboxes.length; i++) {
                        var typeParam = pathNames.length > i ? pathNames[i] : '';
                        elementsManager.syncXboxesWithHash(options.Checkboxes[i - 1], typeParam, i);
                    }
                }
            },
            PageNoIndex: options.PageNoIndex,
            GetPageNo: function () {
                var pageParam = hashManager.parts[this.PageNoIndex];
                var page = pageParam == '' || pageParam == '~' ? 1 : pageParam * 1;

                return page;
            },
            UpdatePaging: function (nextPage) {
                hashManager.ClearPaging();
                hashManager.Add(this.PageNoIndex, nextPage);
            },
            ClearPaging: function () {
                hashManager.Clear(this.PageNoIndex);
            },
            GetPageNoBaseOnCurrentPath: function () {
                var paths = SWFAddress.getPathNames();
                var pageParam = paths.length > this.PageNoIndex ? paths[this.PageNoIndex] : '';

                var page = pageParam == '' || pageParam == '~' ? 1 : pageParam * 1;
                return page;
            },
            IsAllFiltersCleared: function () {
                var hasAnyOptionSelected = false;

                //start to 1 to skip the parent page id
                for (var i = 1; i <= this.parts.length - 1; i++) {
                    var part = this.parts[i];
                    if (typeof part == "undefined")
                        continue;

                    if (part.length > 0 && part != this.nullChar) {
                        hasAnyOptionSelected = true;
                        break;
                    }
                }

                return !hasAnyOptionSelected;
            }
        };

        var elementsManager = {
            clearOtherCheckboxExceptOnThisOne: function (checkboxes, checkbox) {
                checkboxes.each(function (i) {
                    var value = $(this).val();
                    if (value !== checkbox.val()) {
                        $(this).prop('checked', false);
                        $(this).siblings("span").first().removeClass("checked");
                    } else {
                        if (!$(this).is(':checked')) {
                            $(this).prop('checked', true);
                            $(this).siblings("span").first().addClass("checked");
                        }
                    }
                });
            },
            clearFirstCheckbox: function (checkboxes) {
                var ckAll = checkboxes.first();
                var isAllOption = ckAll.val() === "0";
                if (isAllOption) {
                    $(ckAll).prop('checked', false);
                    $(ckAll).siblings("span").first().removeClass("checked");
                }
            },
            setAllOption: function (checkboxes) {
                checkboxes.each(function (i) {
                    var value = $(this).val();
                    if (value !== "0") {
                        $(this).prop('checked', false);
                        $(this).siblings("span").first().removeClass("checked");
                    } else {
                        if (!$(this).is(':checked')) {
                            $(this).prop('checked', true);
                            $(this).siblings("span").first().addClass("checked");
                        }
                    }
                });
            },
            syncXboxesWithHash: function (checkboxes, typeParam, target) {
                if (typeParam === '~' || typeParam === '')
                    elementsManager.setAllOption(checkboxes);
                else {
                    var typeParamValues = typeParam.split(',');
                    for (var i = 0; i < typeParamValues.length; ++i) {
                        var id = typeParamValues[i];
                        hashManager.parts[target].push(id);

                        var ck = checkboxes.filter(function () { return this.value == id }).first();
                        $(ck).prop('checked', true);
                        $(ck).siblings("span").first().addClass("checked");

                        elementsManager.clearFirstCheckbox(checkboxes);
                    }
                }
            }
        };

        

        var postManager = {
            fadeTime: 150,
            TotalPage: options.InitialPageTotal,
            IsCurrentlyLoading: false,
            LastItem: null,
            SendRequest: function (path) {
                postManager.IsCurrentlyLoading = true;
                $(window).unbind('scroll', fnScrollModule);

                var currentPageNo = hashManager.GetPageNo();
                var showInitialList = options.ShowInitialList && hashManager.IsAllFiltersCleared();

                if (options.ItemsRepoContainer)
                    options.ItemsRepoContainer.hide();

                if (showInitialList) {

                    $(options.Container).hide();
                    options.ItemsRepoContainer.fadeIn();

                    options.ItemsRepoContainer.find(".article-item").fadeIn();

                }
                else if (firstRun) {
                    $(options.Container).html("");

                    for (i = 1; i <= currentPageNo; i++) {
                        fnSendRequest(path.slice(0, path.lastIndexOf('/')) + '/' + i); //The slice() method returns the selected elements in an array, as a new array object.
                    }

                    if (options.ScrollToElementOnFirstRun)
                        fnScrollToElement(postManager.LastItem);
                }
                else {
                    var currentPageNoBasedOnCurrentPath = hashManager.GetPageNoBaseOnCurrentPath();
                    if (currentPageNoBasedOnCurrentPath == currentPageNo) // handles page no that is manually inputted by a user in url
                        fnSendRequest(path);
                }

                postManager.IsCurrentlyLoading = false;
                if (!showInitialList)
                    $(window).bind('scroll', fnScrollModule);
            },
            Reset: function () {
                this.TotalPage = 0;

            }
        };


        

        function init() {
            $.each(options.Checkboxes, function (i) {
                var checkboxes = this;
                var target = i + 1;
                $(this).bind('change', function () {
                    var allOption = checkboxes.first().val() === "0" ? checkboxes.first() : null;
                    var hasAllOption = allOption != null;

                    var ck = $(this);
                    var isRadioButton = ck.parents(".form-checkboxes").first().data("isradio") == "True";

                    //When All is clicked
                    if (hasAllOption && allOption.val() === ck.val() && !ck.is(':checked'))
                    {
                        elementsManager.setAllOption(checkboxes);
                        return;
                    }
                        
                    postManager.Reset();

                    $(container).html("");

                    if (isRadioButton) {
                        hashManager.Clear(target);
                        if (ck.is(":checked") && ck.val() !== "0") {
                            hashManager.Add(target, ck.val());
                            elementsManager.clearOtherCheckboxExceptOnThisOne(checkboxes, ck);
                        } else if (hasAllOption){
                            elementsManager.setAllOption(checkboxes);
                        }

                    } else {

                        if (ck.val() !== "0" && ck.is(':checked') && hasAllOption)
                            elementsManager.clearFirstCheckbox(checkboxes);

                        var count = 0;
                        checkboxes.each(function (i) {
                            var value = $(this).val();
                            if ($(this).is(':checked') && value !== "0") {
                                hashManager.Add(target, value);
                                count++;
                            }
                            else if ($(this).is(':checked') && value == "0") {
                                elementsManager.setAllOption(checkboxes);
                            }
                            else
                                hashManager.Remove(target, value);
                        });

                        if (count === 0 && hasAllOption)
                            elementsManager.setAllOption(checkboxes);
                    }

                    //clear paging
                    hashManager.ClearPaging();
                    hashManager.Trigger();
                });
            });


            $(".form-checkboxes").mouseleave(function () {
                $(this).parent().removeClass('active');
            });

            

            if (!options.DisableScroll)
                $(window).bind('scroll', fnScrollModule);

            if (options.ShowInitialList)
                options.InitialList = options.ItemsRepoContainer.html();


            //Clear FILTER
            $(".clear-filter").bind("click",function () {
                var ckName = $(this).attr("data-checkbox-name");
                var checkboxes = $("input[name='" + ckName + "']");
                var allOption = checkboxes.first();
                var hasAllOption = allOption.val() === "0";

                if (hasAllOption) {
                    if (!allOption.is(':checked')) {
                        elementsManager.setAllOption(checkboxes);
                        $(checkboxes).first().trigger("change");
                    }
                }
                else {
                    var hasSelected = checkboxes.filter(function () { return this.checked}).length > 0;
                    
                    if (hasSelected) {
                        elementsManager.setAllOption(checkboxes);
                        $(checkboxes).first().trigger("change");
                    }
                } 
            });
        }


        SWFAddress.onInit = function () {
            var path = SWFAddress.getPath();
            if (options.BeginningPathFromCookie !== '' && path === '/') {

                SWFAddress.setValue(options.BeginningPathFromCookie);
                isLoadedFromCookie = true;
            } else if (options.OfflineFilter) {
                postManager.SendRequest("");
            }
            
                
        };


        SWFAddress.onChange = function () {
            if (isLoadedFromCookie)
            {
                //Workaround when loaded from cookie the onchange event triggers twice
                isLoadedFromCookie = false;
                return;
            }
                
            var path = SWFAddress.getPath();

            if (firstRun) {
                hashManager.SyncSelectsWithHash();
            }

            if (path && path.length > 1) {
                postManager.SendRequest(path);
            }

            firstRun = false;
        };


        function fnScrollModule() {
            if (!firstRun) {
                var footerHeight = $("#main-footer").height();
                var treshold = $(document).height() - footerHeight;
                var currentPos = $(window).scrollTop() + $(window).height();
                var computedPage = currentPos / treshold;
                var currentPage = hashManager.GetPageNo();
                var nextPage = (currentPage * 1) + 1;


                if (computedPage >= 1 && !postManager.IsCurrentlyLoading) {
                    if (nextPage <= postManager.TotalPage) {
                        hashManager.UpdatePaging(nextPage);
                        hashManager.Trigger();
                    }
                }
            }
        }


        var nonAjaxFilter = {
            SaveCookie: function(key, value) {
                document.cookie = key + "=" + value;
            },
            ShowItems: function (path) {
                var result = options.FilterFunction(path);
                nonAjaxFilter.SaveCookie("EB.Sidel" + options.ParentId, path);

                var clearFix = "<span class=\"clearfix\"></span>";

                var curLastItem = $(options.Container).find(".clearfix").last();
                if (curLastItem.length === 0)
                    options.Container.html("");
                
                
                var ctr = 1;
                for (var i = 0; i < result.Items.length; i++) {
                    var item = result.Items[i];

                    var cloned = $("#article-" + item.Id).clone();
                    cloned.hide();
                    options.Container.append(cloned);

                    if (!options.ListLayout) {
                        if (ctr === 3) {
                            options.Container.append(clearFix);
                            cloned.css("margin-right", "0px");
                            ctr = 0;
                        } else {
                            cloned.css("margin-right", "21px");
                        }
                        ctr++;
                    }
                    
                }

                if (!options.ListLayout) {
                    if (ctr !== 1)
                        options.Container.append(clearFix);
                } else {
                    options.Container.append(clearFix);
                }


                options.Container.fadeIn();
                options.Container.find(".article-item").fadeIn();

                if (!options.ListLayout) {
                    $('.oldie .article-previews ul .article-item:nth-child(4n+3)').css('margin-right', '0px');
                }
                
                postManager.TotalPage = result.TotalPage;
                postManager.LastItem = options.Container.find(".article-item").last();
            }
        };

        

        function fnSendRequest(path) {
            if (options.OfflineFilter) {
                nonAjaxFilter.ShowItems(path);
            }
            else {
                var ajaxPath = options.AjaxPath;
                $.ajax({
                    url: ajaxPath + path,
                    type: "GET",
                    async: false,
                    beforeSend: function () {

                    },
                    success: function (data) {
                        var json = JSON.parse(data);
                        var html = json.Html.replace(/\$\(readMore\)/g, options.ReadMoreText);
                        var items = $.parseHTML(html);
                        $(items).hide();

                        var curLastItem = $(options.Container).find(".clearfix").last();
                        if (curLastItem.length > 0)
                            curLastItem.after(items);
                        else
                            $(options.Container).html(items);

                        $(items).fadeIn();
                        $('.oldie .article-previews ul .article-item:nth-child(4n+3)').css('margin-right', '0px');

                        postManager.TotalPage = json.TotalPage;
                        postManager.LastItem = $(items).first();


                    },
                    complete: function () {


                    },
                    error: function (jqXhr, textStatus, errorThrown) {
                        console.log(jqXhr);
                    }
                });
            }
            
        }

        function fnScrollToElement(element) {
            var topHeight = $('.topbar').height() + $('.breadcrumbs').height() + $('.article-filter').height();

            if ($(element).length > 0)
            {
                $('html, body').animate({
                    scrollTop: topHeight + ($(element).offset().top - $(element).height() - 230)
                }, 1000);
            }
        }

        init();

        
    }
    
}(jQuery));
