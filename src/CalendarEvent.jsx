import React from 'react';
import classnames from 'classnames';


const CalendarEvent = ({day, eventData, onClick, onMouseOut, onMouseOver}) => {

    // Return a placeholder element if there is no event data 
    if(!eventData) {
        return <div className="event-slot"></div>;
    }

    const showLabel = eventData.isFirstDay || day.weekDay === 0;

    const eventClasses = classnames({
        'event-slot': true,
        'event': true,
        'event-first-day': eventData.isFirstDay,
        'event-last-day': eventData.isLastDay,
        'event-has-label': showLabel,
    });

    // Generate a dynamic identifier
    const title = showLabel ? eventData.title : '';

    return (
            <div className={eventClasses}
                 onClick={onClick}
                 onMouseOut={onMouseOut}
                 onMouseOver={onMouseOver}
            >
                <div className="event-title">
                    {title}    
                </div>
        </div>
    );
}

CalendarEvent.propTypes = {
  day: React.PropTypes.object.isRequired,
  eventData: React.PropTypes.object,
  onClick: React.PropTypes.func,
  onMouseOut: React.PropTypes.func,
  onMouseOver: React.PropTypes.func,
};


export default CalendarEvent;