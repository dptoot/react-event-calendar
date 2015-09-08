import React from 'react';
import {Calendar} from 'calendar-base';
import classnames from 'classnames';

const propTypes = {
    events: React.PropTypes.array,
    month: React.PropTypes.number.isRequired,
    year: React.PropTypes.number.isRequired,
    onEventClick: React.PropTypes.func,
    onEventMouseOver: React.PropTypes.func,
};

const defaultProps = {
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
};

class EventCalendar extends React.Component {

    constructor(props) {
        super(props);

        // Bind methods
        this.getCalendarDays = this.getCalendarDays.bind(this);
        this.getDaysWithEvents = this.getDaysWithEvents.bind(this);
        this.getEventMeta = this.getEventMeta.bind(this);
        this.getToday = this.getToday.bind(this);

        this.state = {
            today: this.getToday(),
        };
    }

    componentWillMount() {
        this.calendar = new Calendar({siblingMonths: true, });
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
            // Could be done with fill but why require the polyfill
            day.eventSlots = [false,false,false,false,false,false,false,false,false,false,];
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

    renderDaysOfTheWeek() {
        return this.props.daysOfTheWeek.map((element, index) => {
            return (
                <div className="flexColumn"
                    key={index}>
                    {element}
                </div>
            );
        });
    }

    renderEvent(eventData, day, index) {
        const showLabel = eventData.isFirstDay || day.weekDay === 0;

        const eventClasses = classnames({
            'event-slot': true,
            'event': true,
            'event-first-day': eventData.isFirstDay,
            'event-last-day': eventData.isLastDay,
            'event-has-label': showLabel,
        });

        // Generate a dynamic ref
        const ref = [day.month, day.day, index].join('_');

        return (
            <div className={eventClasses}
                key={ref}
                ref={ref}
                onClick={this.props.onEventClick.bind(null, ref, eventData)}
                onMouseOver={this.props.onEventMouseOver.bind(null, ref, eventData)}
                onMouseOut={this.props.onEventMouseOut.bind(null, ref, eventData)}>
                {eventData.title}
            </div>
        );
    }

    renderEvents(day) {
        const placeholder = <div className="event-slot">&nbsp;</div>;
        // Trim excess slots
        const eventSlots = day.eventSlots.slice(0, this.getLastIndexOfEvent(day.eventSlots) + 1)

        return eventSlots.map((eventData, index) => {
           
           return (
                <div key={index}>
                    {(eventData) ? this.renderEvent(eventData, day, index) : placeholder}
                </div>
            );
        });
    }

    renderCalendarDays() {

        return this.getDaysWithEvents().map((day, index) => {

            const dayClasses = classnames({
                'flexColumn': true,
                'day': true,
                'inactive': day.siblingMonth,
                'today': Calendar.interval(day, this.state.today) === 1,
            });

            return (
                <div key={index} 
                     className={dayClasses}>
                    <div className="inner-grid">
                        <div className="date">{day.day}</div>
                        {this.renderEvents(day)}
                    </div>
                </div>
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

EventCalendar.propTypes = propTypes;
EventCalendar.defaultProps = defaultProps;

export default EventCalendar;
