/*
Joose Tabs Component
@author Phil Gibbins

Depends on Joose.utils
*/

;var joose = window.joose || {};
joose.classes = joose.classes || {};
joose.tabs = (function(js) {
    
    "use strict";

    // set config for tabs
    var config = {
        expandedClassForTrigger: 'current',
        expandedClassForContent: 'shown'
    };

    // tabs constructor
    var Tabs = function(containerId, defaultTab) {

        // set the container element
        this.container = document.getElementById(containerId);

        // cancel if no container found
        if (!this.container) return false;

        // store the default tab, set to first as default if not supplied (0-indexed)
        this.defaultTab = (typeof defaultTab !== 'undefined') ? defaultTab : 0;

        // store the tab triggers
        this.triggers = this.container.querySelectorAll('[aria-controls]');
        this.noOfTabs = this.triggers.length;

        // perform initial setup of the tabs
        this.init();

    };

    // set common properties for tabs
    Tabs.prototype = {

        // open the relevant tab
        openTab: function(tabId) {
            
            // get the tab to open and it's trigger
            var tabTrigger = this.container.querySelector('[href="#' + tabId + '"]');
            var tabToOpen = this.container.querySelector('#' + tabId);

            // if the tab exists
            if (tabToOpen) {

                // close all other open tabs
                this.closeOpenTabs();

                // open the selected section; add class to trigger's parent for styling flexibility
                joose.utils.addClass(tabTrigger.parentNode, config.expandedClassForTrigger);
                joose.utils.addClass(tabToOpen,  config.expandedClassForContent);

            }
        },

        // close all open tabs
        closeOpenTabs: function() {
            var expandedTabTriggers = this.container.querySelectorAll('.' + config.expandedClassForTrigger);
            var expandedTabsContent = this.container.querySelectorAll('.' + config.expandedClassForContent);
            var noOfExpandedTabs = expandedTabTriggers.length;
            for (var i=0; i<noOfExpandedTabs; i++) {
                joose.utils.removeClass(expandedTabTriggers[i], config.expandedClassForTrigger);
                joose.utils.removeClass(expandedTabsContent[i], config.expandedClassForContent);
            }
        },

        // bind click event to triggers to open relevant tab
        bindEvents: function() {
            for (var i=0; i<this.noOfTabs; i++) {
                var tabs = this;
                this.triggers[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    tabs.openTab(this.getAttribute('aria-controls'));
                });
            }
        },

        // initialise the tabs
        init: function() {

            // apply data attribute for styling if not already present
            if (!this.container.hasAttribute('data-component')) {
                this.container.setAttribute('data-component', 'tabs');
            };

            // bind events to this instance of tabs
            this.bindEvents();

            // get the default tab href
            var defaultTabIdWithHash = this.triggers[this.defaultTab].href;

            // show default tab; chrome uses absolute url with hash, hence search
            this.openTab(defaultTabIdWithHash.substring(defaultTabIdWithHash.search('#') + 1));
        }
    };

    // find any instances of tabs on the page, and initialise those found
    var init = function() {

        // make tabs constructor publicly available
        joose.classes.Tabs = Tabs;

        // find all tabs on the page not manually initialised
        var tabs = document.querySelectorAll('[data-component="tabs"]');
        var noOfTabs = tabs.length;
        
        // if there are tabs we want to initialise them individually
        if (noOfTabs > 0) {

            for (var i=0; i<noOfTabs; i++) {

                // get the tabs details
                var tabId = tabs[i].getAttribute('id');

                // default the id if none supplied
                if (!tabId) {
                    tabId = 'tabs-' + i;
                    tabs[i].setAttribute('id', tabId);
                }

                // record instance of tabs to variable
                joose.tabs[tabId] = new Tabs(tabId);
            }
        }
    };

    return {
        init: init
    }

})(joose);

// initialise tabs functionality
joose.tabs.init();

// remove public method
delete joose.tabs.init;