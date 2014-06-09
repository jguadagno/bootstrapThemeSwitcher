; (function ($) {

    "use strict";

    var methods = {
        init: function (options) {

            var themes = getThemes();

            return $(this).each(function () {
                var $this = $(this);

                var settings = $.extend({}, $.fn.bootstrapThemeSwitcher.defaults, options);
                $this.data('bootstrapThemeSwitcher', settings);
                addThemesToControl($this, settings, themes);
                return this;
            });
        },
        destroy: function () {
            return $(this).each(function () {
                var $this = $(this);
                $this.removeData('bootstrapThemeSwitcher');
            });
        },
        clear: function () {
            console.log('bootstrapThemeSwitcher.clear');
            return $(this).each(function () {
                $(this).empty();
            });
        },
        update: function () {
            console.log('bootstrapThemeSwitcher.update');
            var themes = getThemes();
            return $(this).each(function () {
                var $this = $(this);
                addThemesToControl($this, $this.data('bootstrapThemeSwitcher'), themes);
                return this;
            });
        },
        switchTheme: function (name, cssFile) {
            console.log('bootstrapThemeSwitcher.switchTheme: name: "' + name + '", cssFile: "' + cssFile + '"');
            var $this = $(this);
            var settings = $.extend({}, $.fn.bootstrapThemeSwitcher.defaults, $this.data('bootstrapThemeSwitcher'));

            var id = settings.cssThemeLink;

            if (cssFile == undefined) {
                cssFile = '//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css';
            }
            if (name == undefined) {
                name = cssFile;
            }

            // Remove any existing bootstrap stylesheet that are not the theme ones
            $('head link[href*="bootstrap.min.css"][id!="' + id + '"]').remove();

            // Replace the theme file
            var selector = '#' + id;
            var cssLink = $(selector);
            if (cssLink.length == 0) {
                var cssLinkHtml = "<link rel='stylesheet' id='" + id + "' href='" + cssFile + "' type='text/css' />";
                $('head link[rel="stylesheet"]:first').before(cssLinkHtml);
                cssLink = $(selector);
            }
            cssLink.attr('href', cssFile);

            // check to see if they want it to be saved
            if (settings.saveToCookie) {
                if ($.cookie == undefined) {
                    console.warn('bootstrapThemeSwitcher: saveToCookie is set to true but jQuery.cookie is not present');
                    return;
                }
                $.cookie(settings.cookieThemeName, name, { expires: settings.cookieExpiration, path: settings.cookiePath });
                $.cookie(settings.cookieThemeCss, cssFile, { expires: settings.cookieExpiration, path: settings.cookiePath });
            }
        },
        loadThemeFromCookie: function (options) {
            if ($.cookie == undefined) {
                console.warn('bootstrapThemeSwitcher: loadThemeFromCookie was called but jQuery.cookie is not present');
                return;
            }
            var settings = $.extend({}, $.fn.bootstrapThemeSwitcher.defaults, options);
            var themeName = $.cookie(settings.cookieThemeName);
            var themeCss = $.cookie(settings.cookieThemeCss);
            $().bootstrapThemeSwitcher('switchTheme', themeName, themeCss);

        }
    };

    function addThemesToControl(control, settings, themes) {

        if (control.is('ul')) {

            console.log('bootstrapThemeSelector: UL element selected');
            control.empty();
            $.each(themes, function (i, value) {
                var $this = $(this);
                $this.data('bootstrapThemeSwitcher', settings);
                var li = $("<li />")
                    .append("<a href='#'>" + value.name + "</a>")
                    .data('bootstrapThemeSwitcher', settings)
                    .on('click', function () {
                        $(this).bootstrapThemeSwitcher('switchTheme', value.name, value.cssCdn);
                    });
                control.append(li);
            });

        } else if (control.is('select')) {
            console.log('bootstrapThemeSelector: SELECT element selected');
            control.empty();

            $.each(themes, function (i, value) {
                control.append("<option value='" + value.cssCdn + "'>" + value.name + "</option>");
            });
            control.on('change', function () {
                var optionSelected = $("option:selected", this);
                $(this).bootstrapThemeSwitcher('switchTheme', optionSelected.text(), optionSelected.val());
            });

        } else {
            console.warn('bootstrapThemeSelector only works with ul or select elements');
        }
    };

    function getThemes() {
        var themes;
        $.ajax({
            url: 'http://api.bootswatch.com/3/',
            async: false,
            dataType: 'json',
            success: function (data) {
                themes = data.themes;
            }
        });
        themes.splice(0,0, {name: 'default', cssCdn: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css'});
        return themes;
    }

    $.fn.bootstrapThemeSwitcher = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        $.error('Method "' + method + '" is not supported by bootstrapThemeSwitcher()');
    };

    $.fn.bootstrapThemeSwitcher.defaults = {
        cssThemeLink: 'bootstrapTheme',
        saveToCookie: true,
        cookieThemeName: 'bootstrapTheme.name',
        cookieThemeCss: 'boostrapTheme.css',
        cookieExpiration: 7,
        cookiePath: '/'
    };
})(jQuery);
