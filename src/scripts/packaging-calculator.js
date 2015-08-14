
var calculatorData = {};
$(function () {
  
	function priceFitToCont(){
		var tmp,o,cont,curwid,ptrn,fsiz,txt,txt2;
		o = $('.calc-totals .line .right i');
        txt = $('.calc-totals .line .right i .amount');
        txt2= $('.calc-totals .line .right i .pryr');
		tmp = parseInt(o.css('font-size').replace(/[^-\d\.]/g, '')); 
		cont = o.parent();
        fsiz = tmp;
		do{
			fsiz = fsiz - 1;
			txt.css('font-size',fsiz+'px');
			curwid = txt.width();
		}
		while (curwid > (cont.width() - (txt2.width() + 30)));
		return true;
    }
    

	
    calculatorData.Input = {
        ProductType: "Water"
    };
    
    $("#pack-calc-content").html($("#pack-calc-template").tmpl(calculatorData.Input));

    FnInitCalculatorForm();

    function initSelect() {
        $("select").each(function () {
            if ($(this).data("tip") != "") {
                $(this).parents(".selectricWrapper").first().addClass("help-tip")
            }
        });

        //select help tip
        $('.input .help-tip .selectric').on('mouseenter', function () {
            var pos, dataTip, dataY;
            dataTip = $(this).parent().find('select').data('tip');

            pos = $(this).position();
            dataY = pos.top;
            $('#data-tip').text(dataTip).fadeIn(0);
        }).on('mouseleave', function () {
            $('#data-tip').fadeOut(0);
        }).mousemove(function (e) {
            var pos,
            pos = $('.calc').offset();
            $('#data-tip').css({ 'top': e.pageY - pos.top + 15, 'left': e.pageX - pos.left + 10 });
        }).on('click', function () {
            $('#data-tip').fadeOut(0);
        });

    }

    function initTextbox() {
        //text help tip        
        $('.input input[type=text].help-tip').on('mouseenter', function () {
            var pos, dataTip, dataY;
            dataTip = $(this).data('tip');

            pos = $(this).position();
            dataY = pos.top;
            $('#data-tip').html(dataTip).fadeIn(0);

        }).on('mouseleave', function () {
            $('#data-tip').fadeOut(0);
        }).mousemove(function (e) {
            var pos,
            pos = $('.calc').offset();
            $('#data-tip').css({ 'top': e.pageY - pos.top + 15, 'left': e.pageX - pos.left + 10 });
        }).on('focus', function () {
            $('#data-tip').fadeOut(0);
        }).on('keyup', function () {
            $('#data-tip').fadeOut(0);
        });
    }

    function initCheckbox() {
        //checkbox help tip
        $(".input label.help-tip").on('mouseenter', function () {
            var pos, dataTip, dataY;
            dataTip = $(this).data('tip');

            pos = $(this).position();
            dataY = pos.top;
            $('#data-tip').html(dataTip).fadeIn(0);
        }).on('mouseleave', function () {
            $('#data-tip').fadeOut(0);
        }).mousemove(function (e) {
            var pos,
            pos = $('.calc').offset();
            $('#data-tip').css({ 'top': e.pageY - pos.top + 15, 'left': e.pageX - pos.left + 10 });
        });
    }

    function FnInitCalculatorForm()
    {
        //contact an expert
        $(".contact-expert").attr("href", "mailto:" + $("#pack-calc-wrap").attr("data-expert-email"));

        $('.input input[type=radio]').iCheck({
            checkboxClass: 'icheckbox_flat-orange',
            radioClass: 'iradio_flat-orange'
        });

        $(".option-neck-format").each(function (e) {
            $(this).html($(this).attr("data-" + calculatorData.Input.ProductType));
        });

        $("input[name='productCategory']").on("ifChecked", function (event) {
            var selected = $(this).val();

            $(".option-neck-format").each(function (e) {
                $(this).html($(this).attr("data-" + selected));
            });

            $('.input select').selectric('init');

            initSelect();
        });

        $("#pack-calc-form select").change(function () {
            if ($(this).val() != '') {
                var selectric = $(this).parents(".selectricWrapper").find(".selectric");
                $(selectric).css("border-color", "#DDD");
                $(selectric).siblings(".error").remove();
            }
        });


        $('.input select').selectric({
            maxHeight: 200
        });


        initSelect();
     
        initTextbox();

        initCheckbox();
         
       


        $("#pack-calc-form").validate({
          
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    url: "/Base/PackagingCalculator/Calculate/",
                    type: "POST",
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        _gaq.push(['_trackEvent', 'Packaging Calculator', 'Calculate step 1', window.location.host + location.pathname]);

                        //save display text
                        data.Input.DisplayProductType = $("input[name='productCategory'][value='" + data.Input.ProductType + "']").val();
                        data.Input.DisplayBottleNeckFormat = $("select[name='bottleNeckFormat'] option[value='" + data.Input.BottleNeckFormat + "']").attr("data-" + data.Input.ProductType);
                        data.Input.DisplayBottleSize = $.trim($("select[name='bottleSize'] option[value='" + data.Input.BottleSize + "']").text());
                        data.Input.DisplayEquipmentType = $.trim($("select[name='blowerEquipmentType'] option[value='" + data.Input.BlowerEquipmentType + "']").text());
                        

                        data.Output.MailBodyTextDisplay = encodeURIComponent(
                                                            $("#mailbodyText").val()
                                                                .replace("${Input.DisplayProductType}", data.Input.DisplayProductType)
                                                                .replace("${Input.DisplayBottleNeckFormat}", data.Input.DisplayBottleNeckFormat)
                                                                .replace("${Input.FmtdPETCostPerTonForBottle}", data.Input.FmtdPETCostPerTonForBottle)
                                                                .replace("${Input.FmtdHDPECostPerTonForCap}", data.Input.FmtdHDPECostPerTonForCap)
                                                                .replace("${Input.FmtdFormattedAnnualProductionHours}", data.Input.FmtdFormattedAnnualProductionHours)
                                                                .replace("${Input.FmtdBlowerSpeed}", data.Input.FmtdBlowerSpeed)
                                                                .replace("${Input.DisplayBottleSize}", data.Input.DisplayBottleSize)
                                                                .replace("${Input.DisplayEquipmentType}", data.Input.DisplayEquipmentType)

                                                                .replace("${Output.StrPETRawMaterialSavings}", data.Output.StrPETRawMaterialSavings)
                                                                .replace("${Output.StrHDPERawMaterialSavings}", data.Output.StrHDPERawMaterialSavings)
                                                                .replace("${Output.StrPETCostSavings}", data.Output.StrPETCostSavings)
                                                                .replace("${Output.StrHDPECostSavings}", data.Output.StrHDPECostSavings)
                                                                .replace("${Output.StrEnergySavings}", data.Output.StrEnergySavings)
                                                                .replace("${Output.StrTotalCostSavings}", data.Output.StrTotalCostSavings)
                                                        );
                        calculatorData = data;
                        $("#pack-calc-content").html($("#pack-result-template").tmpl(calculatorData));
                        
                        InitResult();
                    }
                });
            },
            ignore: "",
            rules: {
                productCategory: { required: true },
                bottleNeckFormat: { required: true },
                petCostPerTonForBottle: {
                    required: true,
                    number: true
                },
                hdpeCostPerTonForCap: {
                    required: true,
                    number: true
                },
                annualProductionHours: {
                    required: true,
                    number: true
                },
                blowerSpeed: {
                    required: true,
                    number: true
                },
                bottleSize: { required: true },
                blowerEquipmentType: { required: true }
            },
            messages: {
                productCategory: $("#productTypeCnt").data("error-msg"),
                bottleNeckFormat: $("#bottleNeckFormatCnt").data("error-msg"),
                petCostPerTonForBottle: $("#petCostPerTonForBottleCnt").data("error-msg"),
                hdpeCostPerTonForCap: $("#hdpeCostPerTonForCapCnt").data("error-msg"),
                annualProductionHours: $("#annualProductionHoursCnt").data("error-msg"),
                blowerSpeed: $("#blowerSpeedCnt").data("error-msg"),
                bottleSize: $("#bottleSizeCnt").data("error-msg"),
                blowerEquipmentType: $("#blowerEquipmentTypeCnt").data("error-msg")
            },
            highlight: function (element, errorClass, validClass) {
                if ($(element).is('input'))
                {
                    $(element).css("border-color", "red");
                    
                }
                else
                {
                    $(element).parents(".selectricWrapper").find(".selectric").css("border-color", "red");
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                if ($(element).is('input'))
                    $(element).css("border-color", "#dedede");
                else {
                    $(element).parents(".selectricWrapper").find(".selectric").css("border-color", "#DDD");
                }
            },
            errorPlacement: function (error, element) {
                //if (element.is("select"))
                //    error.insertAfter($(element).parents(".selectricWrapper").first().find(".selectricInput"));
                //else
                //    error.insertAfter(element);
            }
        });

       
    }

    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }


    function InitResult()
    {
        //contact an expert
        $(".contact-expert").attr("href",$(".contact-me").attr("href"));

        jQuery.validator.addMethod("multipleEmailValidation", function (value, element) {
            var retVal = false;
            $.each(value.split(','), function (i) {
                if (IsEmail(this.toString()))
                    retVal = true;
                else {
                    retVal = false;
                    return false;
                }
            });
            return retVal;
        }, "Please enter a valid email address/es");

        $("#send-mail-form").validate({
            rules: {
                email: {
                    required: true,
                    multipleEmailValidation: []
                }
            },
            messages: {
                email: $("#send-mail-form").attr("data-validation-msg")
            },
            submitHandler: function (form) {
                
                var wrapper = $("#pack-calc-wrap");
                $("#submit-email").hide();
                $("#loader").show();

                $(form).ajaxSubmit({
                    url: "/Base/PackagingCalculator/SendEmail/",
                    type: "POST",
                    data: {
                        'calculatorData': JSON.stringify(calculatorData),
                        'templateUrl': $(wrapper).attr("data-email-template"),
                        'mailSubject': $(wrapper).attr("data-from-name"),
                        'fromName': $(wrapper).attr("data-mail-subject"),
                        'replyTo': $(wrapper).attr("data-mail-reply-to")
                    },
                    success: function (data) {
                        _gaq.push(['_trackEvent', 'Packaging Calculator', 'Send packaging calculator to email', $("#email").val() + ' - ' + window.location.host + location.pathname]);
                        
                        if (data == "True") {
                            $("#submit-email").show();
                            $("#loader").hide();
                            $("#send-mail-form").hide();
                            $(".sent-email").show();
                            $(".error-mail").hide();
                        }
                        else {
                            FnShowError();
                        }
                    },
                    error: function () {
                        FnShowError()
                    }
                });
            }
        });


        function FnShowError()
        {
            $("#send-mail-form label.error").hide();
            $(".error-email").show();
            $("#submit-email").removeAttr("disabled");
        }

        $('.calc-results .info-tip').on('mouseenter', function () {
            var pos, dataTip, dataY;
            dataTip = [$(this).data('info-old'), $(this).data('info-new'), $(this).data('info-sav'), $(this).data('info-sav-pct')];
            pos = $(this).position();
            dataY = pos.top;
            $('#data-info-tip span.info-old-usage').text(dataTip[0]);
            $('#data-info-tip span.info-new-usage').text(dataTip[1]);
            $('#data-info-tip span.info-savings').text(dataTip[2]);
            $('#data-info-tip span.info-savings-pct').text(dataTip[3]);
            $('#data-info-tip').fadeToggle(0);
        }).on('mouseleave', function () {
            $('#data-info-tip').fadeToggle(0);
        }).mousemove(function (e) {
            var pos,
            pos = $('.calc2').offset();
            $('#data-info-tip').css({ 'top': e.pageY - pos.top + 15, 'left': e.pageX - pos.left + 10 });
        });
		
		priceFitToCont();

    }


	
	
    
    
	


	$(".new-calc").live("click", function (e) {
	    e.preventDefault();
	    $("#pack-calc-content").html($("#pack-calc-template").tmpl(calculatorData.Input));
	    FnInitCalculatorForm();
	});

	$(".contact-me").live("click", function () {
	    _gaq.push(['_trackEvent', 'Packaging Calculator', 'Contact a Packaging calculator expert', window.location.host + location.pathname]);
	});
});


