import React from 'react';
import {Calendar} from 'calendar-base';
import classnames from 'classnames';

import CalendarDay from './components/CalendarDay';
import CalendarEvent from './components/CalendarEvent';
import CalendarTitle from './components/CalendarTitle';

class EventCalendar extends React.Component {

    constructor(props) {
        super(props);

        this._eventTargets = {};

        this.state = {
            today: this.getToday(),
        };
        
        this.calendar = new Calendar({siblingMonths: true, });

        // Bind methods
        this.getCalendarDays = this.getCalendarDays.bind(this);
        this.getDaysWithEvents = this.getDaysWithEvents.bind(this);
        this.getEventMeta = this.getEventMeta.bind(this);
        this.getToday = this.getToday.bind(this);

    }

    getToday() {
        var today = new Date();
        return {
            day: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear(),
        };
    }

    getCalendarDays() {
        return this.calendar.getCalendar(this.props.year, this.props.month).map((day) => {
            day.eventSlots = Array(this.props.maxEventSlots).fill(false); 
            return day;
        });
    }

    getEventMeta(days, eventStart, eventEnd) {
        const eventStartInView = this.calendar.isDateSelected(eventStart);
        const eventEndInView = this.calendar.isDateSelected(eventEnd);
        const firstDayOfMonth = days[0];
        const lastDayOfMonth = days[days.length - 1];

        const eventMeta = {
            // Asserts Event is visible in this month view
            isVisibleInView: false,
            visibleEventLength: days.length,
            // Returns the index (interval from first visible day) of [...days] of event's first "visible" day
            firstVisibleDayIndex: eventStartInView ? Calendar.interval(firstDayOfMonth, eventStart) - 1 : 0,
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
            eventMeta.visibleEventLength = Calendar.interval(eventStart, eventEnd);
        } else if (!eventStartInView && eventEndInView) {
            eventMeta.visibleEventLength = Calendar.interval(firstDayOfMonth, eventEnd);
        } else if (eventStartInView && !eventEndInView) {
            eventMeta.visibleEventLength = Calendar.interval(eventStart, lastDayOfMonth);
        }

        return eventMeta;
    }

    getDaysWithEvents() {
        // Get all the days in this months calendar view
        // Sibling Months included
        const days = this.getCalendarDays();

        // Set Range Limits on calendar
        this.calendar.setStartDate(days[0]);
        this.calendar.setEndDate(days[days.length - 1]);

        // Iterate over each of the supplied events
        this.props.events.forEach((eventItem) => {

            const eventStart = this.getCalendarDayObject(eventItem.start);
            const eventEnd = this.getCalendarDayObject(eventItem.end);
            const eventMeta = this.getEventMeta(days, eventStart, eventEnd);

            if (eventMeta.isVisibleInView) {
                const eventLength = eventMeta.visibleEventLength;
                const eventSlotIndex = days[eventMeta.firstVisibleDayIndex].eventSlots.indexOf(false);
                let dayIndex = 0;

                // For each day in the event
                while (dayIndex < eventLength) {
                    // Clone the event object so we acn add day specfic data
                    const eventData = Object.assign({}, eventItem);

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

    getCalendarDayObject(date) {
        const dateArray = date.split('-');
        return {
            year: dateArray[0],
            // Subtract 1 from month to allow for human declared months
            month: dateArray[1] - 1,
            day: dateArray[2],
        };
    }

    getLastIndexOfEvent(slots) {

        const lastIndexOfEvent = slots.map((slot, index) => {
            return slot !== false ? index : false;
        }).filter((element) => {
            return element;
        }).pop();

        return lastIndexOfEvent < 3 || lastIndexOfEvent === undefined ? 2 : lastIndexOfEvent;
    }

    getSerializedDay(day) {
        return [day.weekDay, day.day, day.month, day.year].join('');
    }

    renderDaysOfTheWeek() {
        return this.props.daysOfTheWeek.map((title, index) => {
            return (
                <CalendarTitle 
                    key={'title_'+ index}
                    title={title} 
                />
            )   
        });
    }

    renderEvents(day) {
        
        // Trim excess slots
        const eventSlots = day.eventSlots.slice(0, this.getLastIndexOfEvent(day.eventSlots) + 1)

        return eventSlots.map((eventData, index) => {
            return (
                <CalendarEvent 
                    key={'event_'+index+this.getSerializedDay(day)}
                    day={day}
                    eventData={eventData}
                    onClick={this.props.onEventClick}
                    onMouseOut={this.props.onEventMouseOut}
                    onMouseOver={this.props.onEventMouseOver}
                    wrapTitle={this.props.wrapTitle}
                    />
            );
        });
    }

    renderCalendarDays() {
        return this.getDaysWithEvents().map((day, index) => {
            const isToday = Calendar.interval(day, this.state.today) === 1;
            const events = this.renderEvents(day);
            
            return (
                <CalendarDay 
                    key={'day_'+this.getSerializedDay(day)}
                    day={day} 
                    events={events}
                    isToday={isToday} 
                    onClick={this.props.onDayClick}
                    />
                );
        });
    }

    render() {
        return (
            <div className="flexContainer">
                {this.renderDaysOfTheWeek()}
                {this.renderCalendarDays()}
            </div>
        );
    }
}

EventCalendar.propTypes = {
    daysOfTheWeek: React.PropTypes.array,
    events: React.PropTypes.array,
    maxEventSlots: React.PropTypes.number,
    month: React.PropTypes.number.isRequired,
    onEventClick: React.PropTypes.func,
    onEventMouseOut: React.PropTypes.func,
    onEventMouseOver: React.PropTypes.func,
    onDayClick: React.PropTypes.func,
    wrapTitle: React.PropTypes.bool,
    year: React.PropTypes.number.isRequired,

};

EventCalendar.defaultProps = {
    daysOfTheWeek: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ],
    events: [],
    wrapTitle: true,
    maxEventSlots: 10,
};

export default EventCalendar;
