require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var EventCalendar = require('react-event-calendar');

var events = [{
    start: '2015-01-15',
    end: '2015-01-20',
    title: 'Invalid Event'
}, {
    start: '2015-06-20',
    end: '2015-07-02',
    title: 'test event',
    description: 'This is a test description of an event'
}, {
    start: '2015-07-04',
    end: '2015-07-05',
    title: 'Short Event',
    description: 'This is a test description of an event'
}, {
    start: '2015-07-07',
    end: '2015-07-13',
    title: '2 weeks'
}, {
    start: '2015-06-15',
    end: '2015-08-15',
    title: 'multi-month '
}, {
    start: '2015-07-10',
    end: '2015-07-12',
    title: '3 events'
}];

var App = React.createClass({
    displayName: 'App',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(EventCalendar, {
                month: 7,
                year: 2015,
                events: events,
                onEventClick: function () {
                    return console.log('click');
                },
                onEventMouseOver: function () {
                    return console.log('hover');
                }
            })
        );
    }
});

React.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-event-calendar":undefined}]},{},[1]);
