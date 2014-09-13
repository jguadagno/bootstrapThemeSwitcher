/**
* jQuery Twitter Bootstrap Theme Switcher v1.0.2
* https://github.com/jguadagno/bootstrapThemeSwitcher
*
* Copyright 2014, Joseph Guadagno
* Released under Apache 2.0 license
* http://apache.org/licenses/LICENSE-2.0.html
*/
;(function ($, window, document, undefined) {

    "use strict";

    var old = $.fn.bootstrapThemeSwitcher;

    // Constructor
    var BootstrapThemeSwitcher = function (element, options) {

        this.$element = $(element);
        this.settings = $.extend({}, $.fn.bootstrapThemeSwitcher.defaults, options);
        this.themes = [];
        this.getThemes();

        return this;
    };

    // Prototype
    BootstrapThemeSwitcher.prototype = {
        clear: function () {
            console.log('bootstrapThemeSwitcher.clear');
            return this.$element.each(function () {
                this.$element.empty();
            });
        },
        update: function () {
            console.log('bootstrapThemeSwitcher.update');
            this.getThemes();
        },
        switchTheme: function (name, cssFile) {
            console.log('bootstrapThemeSwitcher.switchTheme: name: "' + name + '", cssFile: "' + cssFile + '"');
            var $this = $(this);
            var settings = $.extend({}, $.fn.bootstrapThemeSwitcher.defaults, $this.data('bootstrapThemeSwitcher'));

            var id = settings.cssThemeLink;

            if (cssFile === undefined) {
                cssFile = this.settings.defaultCssFile;
            }
            if (name === undefined) {
                name = cssFile;
            }

            // Remove any existing bootstrap stylesheet that are not the theme ones
            $('head link[href*="bootstrap.min.css"][id!="' + id + '"]').remove();

            // Replace the theme file
            var selector = '#' + id;
            var cssLink = $(selector);
            if (cssLink.length === 0) {
                var cssLinkHtml = "<link rel='stylesheet' id='" + id + "' href='" + cssFile + "' type='text/css' />";
                $('head link[rel="stylesheet"]:first').before(cssLinkHtml);
                cssLink = $(selector);
            }
            cssLink.attr('href', cssFile);

            // check to see if they want it to be saved
            if (settings.saveToCookie) {
                if ($.cookie === undefined) {
                    console.warn('bootstrapThemeSwitcher: saveToCookie is set to true but jQuery.cookie is not present');
                    return;
                }
                $.cookie(settings.cookieThemeName, name, { expires: settings.cookieExpiration, path: settings.cookiePath });
                $.cookie(settings.cookieThemeCss, cssFile, { expires: settings.cookieExpiration, path: settings.cookiePath });
            }
        },
        loadThemeFromCookie: function (options) {
            if ($.cookie === undefined) {
                console.warn('bootstrapThemeSwitcher: loadThemeFromCookie was called but jQuery.cookie is not present');
                return;
            }
            var settings = $.extend({}, $.fn.bootstrapThemeSwitcher.defaults, options);
            var themeName = $.cookie(settings.cookieThemeName);
            var themeCss = $.cookie(settings.cookieThemeCss);
            this.switchTheme(themeName, themeCss);

        },

        addThemesToControl: function() {

            if (this.$element === undefined) {
                console.error('bootstrapThemeSelector: addThemesToControl: Element is undefined');
                return;
            }

            if (this.themes === undefined) {
                console.error('bootstrapThemeSelector: addThemesToControl: Themes is undefined');
                return;
            }

            var base = this;

            if (this.$element.is('ul')) {

                console.log('bootstrapThemeSelector: UL element selected');
                this.$element.empty();
                $.each(this.themes, function (i, value) {

                    var li = $("<li />")
                        .append("<a href='#'>" + value.name + "</a>")
                        .on('click', function () {
                            base.switchTheme(value.name, value.cssCdn);
                        });
                    base.$element.append(li);
                });

            } else if (this.$element.is('select')) {
                console.log('bootstrapThemeSelector: SELECT element selected');
                this.$element.empty();

                $.each(this.themes, function (i, value) {
                    base.$element.append("<option value='" + value.cssCdn + "'>" + value.name + "</option>");
                });
                this.$element.on('change', function () {
                    var optionSelected = $("option:selected", this);
                    base.switchTheme(optionSelected.text(), optionSelected.val());
                });

            } else {
                console.warn('bootstrapThemeSelector only works with ul or select elements');
            }
        },

        getThemes: function() {

            var base = this;

            $.ajax({
                url: this.settings.bootswatchApiUrl + "/" + this.settings.bootswatchApiVersion,
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data.themes === undefined) {
                        return null;
                    }
                    //base.themes = data.themes;
                    //base.themes.push({name: 'default',cssCdn: base.settings.defaultCssFile} );
                    base.themes = data.themes;
                    base.themes.splice(0,0, {name: 'default',cssCdn: base.settings.defaultCssFile});

                    base.addThemesToControl();
                }
            });
        }
    };


    // Plugin
    $.fn.bootstrapThemeSwitcher = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $this = $(this);
        var data = $this.data('bootstrapThemeSwitcher');
        var options = typeof option === 'object' && option;

        if (!data) {
            $this.data('bootstrapThemeSwitcher', (data = new BootstrapThemeSwitcher(this, options) ));
        }
        if (typeof option === 'string') {
            methodReturn = data[ option ].apply(data, args);
        }
        return ( methodReturn === undefined ) ? $this : methodReturn;
    };

    $.fn.bootstrapThemeSwitcher.defaults = {
        cssThemeLink: 'bootstrapTheme',
        saveToCookie: true,
        cookieThemeName: 'bootstrapTheme.name',
        cookieThemeCss: 'boostrapTheme.css',
        cookieExpiration: 7,
        cookiePath: '/',
        defaultCssFile: '//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css',
        bootswatchApiUrl: 'http://api.bootswatch.com',
        bootswatchApiVersion: '3',
    };

    $.fn.bootstrapThemeSwitcher.Constructor = BootstrapThemeSwitcher;

    $.fn.bootstrapThemeSwitcher.noConflict = function () {
        $.fn.BootstrapThemeSwitcher = old;
        return this;
    };
})(jQuery, window, document);
