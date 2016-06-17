(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactEventCalender"] = factory(require("react"));
	else
		root["ReactEventCalender"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _calendarBase = __webpack_require__(2);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _CalendarDay = __webpack_require__(4);
	
	var _CalendarDay2 = _interopRequireDefault(_CalendarDay);
	
	var _CalendarEvent = __webpack_require__(5);
	
	var _CalendarEvent2 = _interopRequireDefault(_CalendarEvent);
	
	var _CalendarTitle = __webpack_require__(6);
	
	var _CalendarTitle2 = _interopRequireDefault(_CalendarTitle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EventCalendar = function (_React$Component) {
	    _inherits(EventCalendar, _React$Component);
	
	    function EventCalendar(props) {
	        _classCallCheck(this, EventCalendar);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventCalendar).call(this, props));
	
	        _this._eventTargets = {};
	
	        _this.state = {
	            today: _this.getToday()
	        };
	
	        _this.calendar = new _calendarBase.Calendar({ siblingMonths: true });
	
	        // Bind methods
	        _this.getCalendarDays = _this.getCalendarDays.bind(_this);
	        _this.getDaysWithEvents = _this.getDaysWithEvents.bind(_this);
	        _this.getEventMeta = _this.getEventMeta.bind(_this);
	        _this.getToday = _this.getToday.bind(_this);
	
	        return _this;
	    }
	
	    _createClass(EventCalendar, [{
	        key: 'getToday',
	        value: function getToday() {
	            var today = new Date();
	            return {
	                day: today.getDate(),
	                month: today.getMonth(),
	                year: today.getFullYear()
	            };
	        }
	    }, {
	        key: 'getCalendarDays',
	        value: function getCalendarDays() {
	            var _this2 = this;
	
	            return this.calendar.getCalendar(this.props.year, this.props.month).map(function (day) {
	                day.eventSlots = Array(_this2.props.maxEventSlots).fill(false);
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
	            var _this3 = this;
	
	            // Get all the days in this months calendar view
	            // Sibling Months included
	            var days = this.getCalendarDays();
	
	            // Set Range Limits on calendar
	            this.calendar.setStartDate(days[0]);
	            this.calendar.setEndDate(days[days.length - 1]);
	
	            // Iterate over each of the supplied events
	            this.props.events.forEach(function (eventItem) {
	
	                var eventStart = _this3.getCalendarDayObject(eventItem.start);
	                var eventEnd = _this3.getCalendarDayObject(eventItem.end);
	                var eventMeta = _this3.getEventMeta(days, eventStart, eventEnd);
	
	                if (eventMeta.isVisibleInView) {
	                    var eventLength = eventMeta.visibleEventLength;
	                    var eventSlotIndex = days[eventMeta.firstVisibleDayIndex].eventSlots.indexOf(false);
	                    var dayIndex = 0;
	
	                    // For each day in the event
	                    while (dayIndex < eventLength) {
	                        // Clone the event object so we acn add day specfic data
	                        var eventData = Object.assign({}, eventItem);
	
	                        if (dayIndex === 0) {
	                            // Flag first day of event
	                            eventData.isFirstDay = true;
	                        }
	
	                        if (dayIndex === eventLength - 1) {
	                            // Flag last day of event
	                            eventData.isLastDay = true;
	                        }
	
	                        if (!eventData.isFirstDay || !eventData.isLastDay) {
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
	                // Subtract 1 from month to allow for human declared months
	                month: dateArray[1] - 1,
	                day: dateArray[2]
	            };
	        }
	    }, {
	        key: 'getLastIndexOfEvent',
	        value: function getLastIndexOfEvent(slots) {
	
	            var lastIndexOfEvent = slots.map(function (slot, index) {
	                return slot !== false ? index : false;
	            }).filter(function (element) {
	                return element;
	            }).pop();
	
	            return lastIndexOfEvent < 3 || lastIndexOfEvent === undefined ? 2 : lastIndexOfEvent;
	        }
	    }, {
	        key: 'getSerializedDay',
	        value: function getSerializedDay(day) {
	            return [day.weekDay, day.day, day.month, day.year].join('');
	        }
	    }, {
	        key: 'renderDaysOfTheWeek',
	        value: function renderDaysOfTheWeek() {
	            return this.props.daysOfTheWeek.map(function (title, index) {
	                return _react2.default.createElement(_CalendarTitle2.default, {
	                    key: 'title_' + index,
	                    title: title
	                });
	            });
	        }
	    }, {
	        key: 'renderEvents',
	        value: function renderEvents(day) {
	            var _this4 = this;
	
	            // Trim excess slots
	            var eventSlots = day.eventSlots.slice(0, this.getLastIndexOfEvent(day.eventSlots) + 1);
	
	            return eventSlots.map(function (eventData, index) {
	                return _react2.default.createElement(_CalendarEvent2.default, {
	                    key: 'event_' + index + _this4.getSerializedDay(day),
	                    day: day,
	                    eventData: eventData,
	                    onClick: _this4.props.onEventClick,
	                    onMouseOut: _this4.props.onEventMouseOut,
	                    onMouseOver: _this4.props.onEventMouseOver,
	                    wrapTitle: _this4.props.wrapTitle
	                });
	            });
	        }
	    }, {
	        key: 'renderCalendarDays',
	        value: function renderCalendarDays() {
	            var _this5 = this;
	
	            return this.getDaysWithEvents().map(function (day, index) {
	                var isToday = _calendarBase.Calendar.interval(day, _this5.state.today) === 1;
	                var events = _this5.renderEvents(day);
	
	                return _react2.default.createElement(_CalendarDay2.default, {
	                    key: 'day_' + _this5.getSerializedDay(day),
	                    day: day,
	                    events: events,
	                    isToday: isToday,
	                    onClick: _this5.props.onDayClick
	                });
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'flexContainer' },
	                this.renderDaysOfTheWeek(),
	                this.renderCalendarDays()
	            );
	        }
	    }]);
	
	    return EventCalendar;
	}(_react2.default.Component);
	
	EventCalendar.propTypes = {
	    daysOfTheWeek: _react2.default.PropTypes.array,
	    events: _react2.default.PropTypes.array,
	    maxEventSlots: _react2.default.PropTypes.number,
	    month: _react2.default.PropTypes.number.isRequired,
	    onEventClick: _react2.default.PropTypes.func,
	    onEventMouseOut: _react2.default.PropTypes.func,
	    onEventMouseOver: _react2.default.PropTypes.func,
	    onDayClick: _react2.default.PropTypes.func,
	    wrapTitle: _react2.default.PropTypes.bool,
	    year: _react2.default.PropTypes.number.isRequired
	
	};
	
	EventCalendar.defaultProps = {
	    daysOfTheWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	    events: [],
	    wrapTitle: true,
	    maxEventSlots: 10
	};
	
	exports.default = EventCalendar;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Calendar constructor
	 *
	 * @param   {Object}  options               Calendar options
	 *   @param {Object}  options.startDate     Date object indicating the selected start date
	 *   @param {Object}  options.endDate       Date object indicating the selected end date
	 *   @param {Boolean} options.siblingMonths Calculate dates from sibling months (before and after the current month, based on weekStart)
	 *   @param {Boolean} options.weekNumbers   Caclulate the week days
	 *   @param {Number}  options.weekStart     Day of the week to start the calendar, respects `Date.prototype.getDay` (defaults to `0`, Sunday)
	 */
	function Calendar (options) {
		options = options || {};
	
		this.startDate = options.startDate;
		this.endDate = options.endDate;
		this.siblingMonths = options.siblingMonths;
		this.weekNumbers = options.weekNumbers;
		this.weekStart = options.weekStart;
	
		if (this.weekStart === undefined) {
			this.weekStart = 0;
		}
	
		this.date = new Date(1986, 9, 14, 0, 0, 0);
	}
	
	/**
	 * Calculate a calendar month
	 *
	 * @param  {Number} year  Year
	 * @param  {Number} month Month [0-11]
	 * @return {Array}        Calendar days
	 */
	Calendar.prototype.getCalendar = function (year, month) {
		this.date.setUTCFullYear(year);
		this.date.setUTCMonth(month);
		this.date.setUTCDate(1);
	
		year = this.date.getUTCFullYear();
		month = this.date.getUTCMonth();
	
		var calendar = [],
			firstDay = this.date.getUTCDay(),
	
			firstDate = - (((7 - this.weekStart) + firstDay) % 7),
			lastDate = Calendar.daysInMonth(year, month),
			lastDay = ((lastDate - firstDate) % 7),
			lastDatePreviousMonth = Calendar.daysInMonth(year, month - 1),
			i = firstDate,
			max = (lastDate - i) + (lastDay != 0 ? 7 - lastDay : 0) + firstDate,
			currentDay,
			currentDate,
			currentDateObject,
			currentWeekNumber = null,
			otherMonth,
			otherYear;
	
		while (i < max) {
			currentDate = i + 1;
			currentDay = ((i < 1 ? 7 + i : i) + firstDay) % 7;
			if (currentDate < 1 || currentDate > lastDate) {
				if (this.siblingMonths) {
					if (currentDate < 1) {
						otherMonth = month - 1;
						otherYear = year;
						if (otherMonth < 0) {
							otherMonth = 11;
							otherYear --;
						}
						currentDate = lastDatePreviousMonth + currentDate;
					}
					else if (currentDate > lastDate) {
						otherMonth = month + 1;
						otherYear = year;
						if (otherMonth > 11) {
							otherMonth = 0;
							otherYear ++;
						}
						currentDate = i - lastDate + 1;
					}
					currentDateObject = {
						day: currentDate,
						weekDay: currentDay,
						month: otherMonth,
						year: otherYear,
						siblingMonth: true
					};
				}
				else {
					currentDateObject = false;
				}
			}
			else {
				currentDateObject = {
					day: currentDate,
					weekDay: currentDay,
					month: month,
					year: year
				};
			}
	
			if (currentDateObject && this.weekNumbers) {
				if (currentWeekNumber === null) {
					currentWeekNumber = Calendar.calculateWeekNumber(currentDateObject);
				}
				else if (currentDay == 1 && currentWeekNumber == 52) {
					currentWeekNumber = 1;
				}
				else if (currentDay == 1) {
					currentWeekNumber ++;
				}
				currentDateObject.weekNumber = currentWeekNumber;
			}
	
			if (currentDateObject && this.startDate) {
				currentDateObject.selected = this.isDateSelected(currentDateObject);
			}
	
			calendar.push(currentDateObject);
			i ++;
		}
	
		return calendar;
	};
	
	/**
	 * Checks if a date is selected
	 *
	 * @param  {Object}  date Date object
	 * @return {Boolean}      Selected status of the date
	 */
	Calendar.prototype.isDateSelected = function (date) {
		if (date.year == this.startDate.year && date.month == this.startDate.month && date.day == this.startDate.day) {
			return true;
		}
		else if (this.endDate) {
			if (date.year == this.startDate.year && date.month == this.startDate.month && date.day < this.startDate.day) {
				return false;
			}
			else if (date.year == this.endDate.year && date.month == this.endDate.month && date.day > this.endDate.day) {
				return false;
			}
			else if (date.year == this.startDate.year && date.month < this.startDate.month) {
				return false;
			}
			else if (date.year == this.endDate.year && date.month > this.endDate.month) {
				return false;
			}
			else if (date.year < this.startDate.year) {
				return false;
			}
			else if (date.year > this.endDate.year) {
				return false;
			}
			return true;
		}
		return false;
	};
	
	/**
	 * Sets the selected period start
	 *
	 * @param {Object} date Date object
	 */
	Calendar.prototype.setStartDate = function (date) {
		this.startDate = date;
	};
	
	/**
	 * Sets the selected period end
	 *
	 * @param {Object} date Date object
	 */
	Calendar.prototype.setEndDate = function (date) {
		this.endDate = date;
	};
	
	/**
	 * Sets one selected date
	 *
	 * @param {Object} date Date object
	 */
	Calendar.prototype.setDate = Calendar.prototype.setStartDate;
	
	/**
	 * Calculates the difference between two dates (date1 - date2), in days
	 *
	 * @param  {Object} date1 Date object
	 * @param  {Object} date2 Date object
	 * @return {Number}       Days between the dates
	 */
	Calendar.diff = function (date1, date2) {
		var oDate1 = new Date(1986, 9, 14, 0, 0, 0), oDate2 = new Date(1986, 9, 14, 0, 0, 0);
	
		oDate1.setUTCFullYear(date1.year);
		oDate1.setUTCMonth(date1.month);
		oDate1.setUTCDate(date1.day);
	
		oDate2.setUTCFullYear(date2.year);
		oDate2.setUTCMonth(date2.month);
		oDate2.setUTCDate(date2.day);
	
		return Math.ceil((oDate1.getTime() - oDate2.getTime()) / 86400000);
	};
	
	/**
	 * Calculates the interval between two dates
	 *
	 * @param  {Object} date1 Date object
	 * @param  {Object} date2 Date object
	 * @return {Number}       Number of days
	 */
	Calendar.interval = function (date1, date2) {
		return Math.abs(Calendar.diff(date1, date2)) + 1;
	};
	
	/**
	 * Calculates the number of days in a month
	 *
	 * @param  {Number} year  Year
	 * @param  {Number} month Month [0-11]
	 * @return {Number}       Length of the month
	 */
	Calendar.daysInMonth = function (year, month) {
		return new Date(year, month + 1, 0).getDate();
	};
	
	/**
	 * Calculates if a given year is a leap year
	 *
	 * @param  {Number}  year Year
	 * @return {Boolean}      Leap year or not
	 */
	Calendar.isLeapYear = function (year) {
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}
	
	/**
	 * Calculates the week number for a given date
	 *
	 * @param  {Object} date Date object
	 * @return {Number}      Week number
	 */
	// Adapted from http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
	Calendar.calculateWeekNumber = function (date) {
		// Creates the requested date
		var current = new Date(1986, 9, 14, 0, 0, 0);
		current.setUTCFullYear(date.year);
		current.setUTCMonth(date.month);
		current.setUTCDate(date.day);
	
		// Create a copy of the object
		var target = new Date(current.valueOf());
	
		// ISO week date weeks start on monday so correct the day number
		var dayNr = (current.getUTCDay() + 6) % 7;
	
		// ISO 8601 states that week 1 is the week with the first thursday of that
		// year. Set the target date to the thursday in the target week.
		target.setUTCDate(target.getUTCDate() - dayNr + 3);
	
		// Store the millisecond value of the target date
		var firstThursday = target.valueOf();
	
		// Set the target to the first thursday of the year
	
		// First set the target to january first
		target.setUTCMonth(0, 1);
	
		// Not a thursday? Correct the date to the next thursday
		if (target.getUTCDay() != 4) {
			target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
		}
	
		// The weeknumber is the number of weeks between the  first thursday of the
		// year and the thursday in the target week.
		// 604800000 = 7 * 24 * 3600 * 1000
		return 1 + Math.ceil((firstThursday - target) / 604800000);
	}
	
	/**
	 * Exports the Calendar
	 */
	module.exports = { Calendar: Calendar };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CalendarDay = function (_React$Component) {
	    _inherits(CalendarDay, _React$Component);
	
	    function CalendarDay() {
	        _classCallCheck(this, CalendarDay);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(CalendarDay).apply(this, arguments));
	    }
	
	    _createClass(CalendarDay, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var day = _props.day;
	            var isToday = _props.isToday;
	            var events = _props.events;
	            var onClick = _props.onClick;
	
	            var dayClasses = (0, _classnames2.default)({
	                'flexColumn': true,
	                'day': true,
	                'inactive': day.siblingMonth,
	                'today': isToday
	            });
	
	            return _react2.default.createElement(
	                'div',
	                {
	                    onClick: onClick.bind(null, this, day),
	                    className: dayClasses },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'inner-grid' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'date' },
	                        day.day
	                    ),
	                    events
	                )
	            );
	        }
	    }]);
	
	    return CalendarDay;
	}(_react2.default.Component);
	
	exports.default = CalendarDay;
	
	
	CalendarDay.propTypes = {
	    day: _react2.default.PropTypes.object.isRequired,
	    isToday: _react2.default.PropTypes.bool,
	    events: _react2.default.PropTypes.array,
	    onClick: _react2.default.PropTypes.func
	};
	
	CalendarDay.defaultProps = {
	    onClick: function onClick() {}
	};
	
	exports.default = CalendarDay;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CalendarEvent = function (_React$Component) {
	    _inherits(CalendarEvent, _React$Component);
	
	    function CalendarEvent(props) {
	        _classCallCheck(this, CalendarEvent);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CalendarEvent).call(this, props));
	
	        _this.sharedArguments = [null, _this, _this.props.eventData, _this.props.day];
	        // Bind methods
	        _this.handleClick = _this.handleClick.bind(_this);
	        return _this;
	    }
	
	    _createClass(CalendarEvent, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            var _props;
	
	            (_props = this.props).onClick.apply(_props, _toConsumableArray(this.sharedArguments.slice(1)));
	            e.stopPropagation();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props$onMouseOut, _props$onMouseOver;
	
	            // Return a placeholder element if there is no event data
	            if (!this.props.eventData) {
	                return _react2.default.createElement('div', { className: 'event-slot' });
	            }
	
	            var showLabel = this.props.eventData.isFirstDay || this.props.day.weekDay === 0 && this.props.wrapTitle;
	            var title = showLabel ? this.props.eventData.title : '';
	
	            var eventClasses = (0, _classnames2.default)({
	                'event-slot': true,
	                'event': true,
	                'event-first-day': this.props.eventData.isFirstDay,
	                'event-last-day': this.props.eventData.isLastDay,
	                'event-has-label': showLabel
	            }, this.props.eventData.eventClasses);
	
	            return _react2.default.createElement(
	                'div',
	                { className: eventClasses,
	                    onClick: this.handleClick,
	                    onMouseOut: (_props$onMouseOut = this.props.onMouseOut).bind.apply(_props$onMouseOut, _toConsumableArray(this.sharedArguments)),
	                    onMouseOver: (_props$onMouseOver = this.props.onMouseOver).bind.apply(_props$onMouseOver, _toConsumableArray(this.sharedArguments))
	                },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'event-title' },
	                    title
	                )
	            );
	        }
	    }]);
	
	    return CalendarEvent;
	}(_react2.default.Component);
	
	CalendarEvent.propTypes = {
	    day: _react2.default.PropTypes.object.isRequired,
	    eventData: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.bool]),
	    onClick: _react2.default.PropTypes.func,
	    onMouseOut: _react2.default.PropTypes.func,
	    onMouseOver: _react2.default.PropTypes.func,
	    wrapTitle: _react2.default.PropTypes.bool
	};
	
	CalendarEvent.defaultProps = {
	    onClick: function onClick() {},
	    onMouseOut: function onMouseOut() {},
	    onMouseOver: function onMouseOver() {}
	};
	
	exports.default = CalendarEvent;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CalendarTitle = function CalendarTitle(_ref) {
	    var title = _ref.title;
	
	    return _react2.default.createElement(
	        "div",
	        { className: "flexColumn" },
	        title
	    );
	};
	
	CalendarTitle.propTypes = {
	    title: _react2.default.PropTypes.string.isRequired
	};
	
	exports.default = CalendarTitle;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-event-calendar.js.map