require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-event-calendar":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calendarBase = require('calendar-base');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

// require('babel/polyfill');

var propTypes = {
    events: _react2['default'].PropTypes.array,
    month: _react2['default'].PropTypes.number.isRequired,
    year: _react2['default'].PropTypes.number.isRequired,
    onEventClick: _react2['default'].PropTypes.func,
    onEventMouseOver: _react2['default'].PropTypes.func
};

var defaultProps = {
    daysOfTheWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    events: []
};

var Schedule = (function (_React$Component) {
    _inherits(Schedule, _React$Component);

    function Schedule(props) {
        _classCallCheck(this, Schedule);

        _get(Object.getPrototypeOf(Schedule.prototype), 'constructor', this).call(this, props);

        this.state = {
            days: []
        };

        // Bind methods
        this.getCalendarDays = this.getCalendarDays.bind(this);
        this.getDaysWithEvents = this.getDaysWithEvents.bind(this);
        this.getEventMeta = this.getEventMeta.bind(this);
    }

    _createClass(Schedule, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.calendar = new _calendarBase.Calendar({ siblingMonths: true });
            this.setState({
                days: this.getDaysWithEvents()
            });
        }
    }, {
        key: 'getCalendarDays',
        value: function getCalendarDays() {
            return this.calendar.getCalendar(this.props.year, this.props.month).map(function (day) {
                day.eventSlots = Array(3).fill(false);
                return day;
            });
        }
    }, {
        key: 'getEventMeta',
        value: function getEventMeta(days, eventStart, eventEnd) {
            var eventStartInView = this.calendar.isDateSelected(eventStart);
            var eventEndInView = this.calendar.isDateSelected(eventEnd);
            var firstDayOfMonth = days[0];
            var lastDayOfMonth = days[days.length - 1];

            var eventMeta = {
                // Asserts Event is visible in this month view
                isVisibleInView: false,
                visibleEventLength: days.length,
                // Returns the index (interval from first visible day) of [...days] of event's first "visible" day
                firstVisibleDayIndex: eventStartInView ? _calendarBase.Calendar.interval(firstDayOfMonth, eventStart) - 1 : 0
            };

            // Asserts Event is visible in this month view
            if (eventStartInView || eventEndInView) {
                // Asserts event's first or last day is visible in this month view
                eventMeta.isVisibleInView = true;
            } else if (eventStart.month < this.props.month && eventEnd.month > this.props.month) {
                // Asserts at least part of month is
                eventMeta.isVisibleInView = true;
            }

            // Determine the visible length of the event during the month
            if (eventStartInView && eventEndInView) {
                eventMeta.visibleEventLength = _calendarBase.Calendar.interval(eventStart, eventEnd);
            } else if (!eventStartInView && eventEndInView) {
                eventMeta.visibleEventLength = _calendarBase.Calendar.interval(firstDayOfMonth, eventEnd);
            } else if (eventStartInView && !eventEndInView) {
                eventMeta.visibleEventLength = _calendarBase.Calendar.interval(eventStart, lastDayOfMonth);
            }

            return eventMeta;
        }
    }, {
        key: 'getDaysWithEvents',
        value: function getDaysWithEvents() {
            var _this = this;

            // Get all the days in this months calendar view
            // Sibling Months included
            var days = this.getCalendarDays();

            // Set Range Limits on calendar
            this.calendar.setStartDate(days[0]);
            this.calendar.setEndDate(days[days.length - 1]);

            // Iterate over each of the supplied events
            this.props.events.forEach(function (eventItem) {

                var eventStart = _this.getCalendarDayObject(eventItem.start);
                var eventEnd = _this.getCalendarDayObject(eventItem.end);
                var eventMeta = _this.getEventMeta(days, eventStart, eventEnd);

                if (eventMeta.isVisibleInView) {
                    var eventLength = eventMeta.visibleEventLength;
                    var eventSlotIndex = days[eventMeta.firstVisibleDayIndex].eventSlots.indexOf(false);
                    var dayIndex = 0;

                    // For each day in the event
                    while (dayIndex < eventLength) {
                        // Clone the event object so we acn add day specfic data
                        var eventData = _extends({}, eventItem);

                        if (dayIndex === 0) {
                            // Flag first day of event
                            eventData.isFirstDay = true;
                        } else if (dayIndex === eventLength - 1) {
                            // Flag last day of event
                            eventData.isLastDay = true;
                        } else {
                            // Flag between day of event
                            eventData.isBetweenDay = true;
                        }

                        // Apply Event Data to the correct slot for that day
                        days[eventMeta.firstVisibleDayIndex + dayIndex].eventSlots[eventSlotIndex] = eventData;

                        // Move to next day of event
                        dayIndex++;
                    }
                }
            });

            return days;
        }
    }, {
        key: 'getCalendarDayObject',
        value: function getCalendarDayObject(date) {
            var dateArray = date.split('-');
            return {
                year: dateArray[0],
                month: dateArray[1],
                day: dateArray[2]
            };
        }
    }, {
        key: 'renderDaysOfTheWeek',
        value: function renderDaysOfTheWeek() {
            return this.props.daysOfTheWeek.map(function (element) {
                return _react2['default'].createElement(
                    'div',
                    { className: 'flexColumn' },
                    element
                );
            });
        }
    }, {
        key: 'renderEvent',
        value: function renderEvent(eventData, day) {
            var showLabel = eventData.isFirstDay || day.weekDay === 0;

            var eventClasses = (0, _classnames2['default'])({
                'event-slot': true,
                'event': true,
                'event-first-day': eventData.isFirstDay,
                'event-last-day': eventData.isLastDay,
                'event-has-label': showLabel
            });

            return _react2['default'].createElement(
                'div',
                { className: eventClasses,
                    onClick: this.props.onEventClick,
                    onMouseOver: this.props.onEventMouseOver },
                eventData.title
            );
        }
    }, {
        key: 'renderEvents',
        value: function renderEvents(day) {
            var _this2 = this;

            var placeholder = _react2['default'].createElement(
                'div',
                { className: 'event-slot' },
                ' '
            );
            return day.eventSlots.map(function (eventData) {
                return eventData ? _this2.renderEvent(eventData, day) : placeholder;
            });
        }
    }, {
        key: 'renderCalendarDays',
        value: function renderCalendarDays() {
            var _this3 = this;

            return this.state.days.map(function (day) {

                var dayClasses = (0, _classnames2['default'])({
                    'flexColumn': true,
                    'day': true,
                    'inactive': day.siblingMonth
                });

                return _react2['default'].createElement(
                    'div',
                    { className: dayClasses },
                    _react2['default'].createElement(
                        'div',
                        { className: 'inner-grid' },
                        _react2['default'].createElement(
                            'div',
                            { className: 'date' },
                            day.day
                        ),
                        _this3.renderEvents(day)
                    )
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                { className: 'flexContainer' },
                this.renderDaysOfTheWeek(),
                this.renderCalendarDays()
            );
        }
    }]);

    return Schedule;
})(_react2['default'].Component);

Schedule.propTypes = propTypes;
Schedule.defaultProps = defaultProps;

exports['default'] = Schedule;
module.exports = exports['default'];

},{"calendar-base":undefined,"classnames":undefined,"react":undefined}]},{},[]);
