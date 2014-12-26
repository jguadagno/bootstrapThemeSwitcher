#bootstrapThemeSwitcher

jQuery plugin for dynamically loading Twitter Bootstrap themes from Bootswatch. This plugin allows for the automatic populating of `UL` and `SELECT` elements with the names of themes available, can switch a theme, save the selected theme to a cookie and load the selected theme from a cookie.

## Support

* Bugs and Feature requests
**Bugs** and **Feature requests** can be reported using the [issues tracker](https://github.com/jguadagno/bootstrapThemeSwitcher/issues).
Please read the [issue guidelines](https://github.com/jguadagno/bootstrapThemeSwitcher/blob/master/CONTRIBUTING.md) before posting.

## Features

**Dynamically Load Theme Name**
The plugin will pull in a list of the latest themes from [Bootswatch](http://www.bootswatch.com). This will populate a `select` or `ul` element with a list of themes to choose.
**Switch the Bootstrap Theme**
The dynamically loaded themes will automatically switch the theme when chosen.
**Saves theme to a cookie**
Takes the selected theme information and saves it to a cookie to reload later
**Loads a theme from a cookie**
Loads a previous saved theme from a cookie

## Requirements

### Mandatory requirements
* [jQuery](http://jquery.com/) v1.11+
* [jQuery Cookie plugin](https://github.com/carhartl/jquery-cookie)

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Usage

### Clear
```javascript
$(selector).bootstrapThemeSelector('clear');
```

Empties/removes the loaded `ul` or `select` element theme names

### Destroy
```javascript
$(selector).bootstrapThemeSelector('destroy');
```

Removes any reference to the bootstrapThemeSelector, empties the loaded control and removes the events.


### LoadThemeFromCookies
```javascript
$(selector).bootstrapThemeSelector('loadThemeFromCookies');
```

Checks for the presence of the theme cookie and loads that theme. `options` can be passed in to change the default cookies, path, etc.

### switchTheme
```javascript
$(selector).bootstrapThemeSelector('switchTheme', themeName, cssFile);
```

Loads a theme with the given `cssFile`. If the cssFile is `undefined`, the default bootstrap theme will be loaded from a CDN.  You can use this option to load your own custom theme.

### Update
```javascript
$(selector).bootstrapThemeSelector('update');
```

Refreshs the theme list for the provided `selector`

## Examples

Setup an `UL` or `SELECT` with the id of `#ThemeSelect` with a list of themes
``` javascript
    // Setup the theme selectors
    $('#ThemeSelect').bootstrapThemeSwitcher();
```

Change the theme
``` javascript
    // Change the theme
    $().bootstrapThemeSwitcher('switchTheme', 'default', '//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css');
```

Load the previously saved theme from the site cookie
``` javascript
    // Load the previously selected theme from the cookies
    $().bootstrapThemeSwitcher('loadThemeFromCookie');
```
## Plugin Options

Bootstrap Theme Switcher can be set globally by setting the `$.bootstrapThemeSwitcher.defaults` object or individually for each call to `$.bootstrapThemeSwitcher()` by
passing a plain object to the options arguement. Per-call options over the default options.

### cssThemeLink

    cssThemeLink: 'bootstrapTheme'

The ID used for the bootstrap theme css file

### saveToCookie

    saveToCookie: true

If true, a cookie will be saved with the currently selected theme

### cookieThemeName

    bootstrapTheme.name

The name of the cookie to be used to store the theme name

### cookieThemeCss

    cookieThemeCss: 'bootstrapTheme.css'

The name of the cookie to be used to store the css file used for the theme

### cookieExpiration

    expires: 7

The number of days the cookies should expire

### cookiePath

    cookiePath: '/'

The path the cookie should be stored

### defaultCssFile

    defaultCssFile: '//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'

The default css file the plugin should use if it can not load the themes from Bootswatch

### bootswatchApiUrl

    bootswatchApiUrl: 'http://api.bootswatch.com'

The url for the bootswatch api

### bootswatchApiVersion

    bootswatchApiVersion: '3'

The version of the bootswatch api to use.

### localFeed

    localFeed: ''

The path to a JSON file that contains the themes you want to use. If this parameter is used, the control will be loaded
the themes from here and not go to the bootswatchApiUrl. A sample of the json file can be found at [themes.json](https://github.com/jguadagno/bootstrapThemeSwitcher/blob/master/Examples/themes.json)

### excludeBootswatch

    excludeBootswatch: ''

Comma seperated list of BootSwatch names (e.g. Slate,Yeti) that should be excluded from the rendered &lt;ul&gt; or &lt;select&gt;
