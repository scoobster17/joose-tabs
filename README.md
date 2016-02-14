# Joose Tabs Component

A lightweight, minimal and unstyled tab component. This component belongs to the Joose component library, but can be used completely independently.

Please see [joose](https://github.com/scoobster17/joose) for the whole component library.

The package includes a basic CSS file (along with source Sass files) to handle the showing and hiding of content as an example. No styling has been applied other than simple show/hide. This means you can have horizontally aligned tabs or vertically aligned tabs. You can utilise the existing HTML/CSS as per the example, or you can add your own classes / selectors of your choice and customise as you wish, for example to add animations or effects.

## Installation

To install this component independently using [bower](http://bower.io/search/?q=joose-accordion) use the following command:

`bower install joose-tabs`

To install this component independently using [npm](https://www.npmjs.com/package/joose-accordion) use the following command:

`npm install joose-tabs`

## Usage

The tabs can be initialised in two different ways
`var componentTabs = new joose.classes.Tabs('componentContainer', 1);`  
or  
`<section id="tabsContainer" data-component="tabs" data-default-tab="1">`

On page load the script searches the page for the `data-component` attribute to pick up any components that haven't been manually initialised using the `new` keyword as demonstrated above.
