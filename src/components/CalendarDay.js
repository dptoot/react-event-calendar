import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

const CalendarDay = ({day, isToday, events, onClick}) => {
    const dayClasses = classnames({
        'flexColumn': true,
        'day': true,
        'inactive': day.siblingMonth,
        'today': isToday,
    });

    return (
      <div 
        onClick = {onClick.bind(null, 'day', day)}
        className={dayClasses}>
            <div className="inner-grid">
                <div className="date">
                    {day.day}
                </div>
                {events}
            </div>
        </div>
    );
}

CalendarDay.propTypes = {
  day: React.PropTypes.object.isRequired,
  isToday: React.PropTypes.bool,
  events: React.PropTypes.array,
  onClick: React.PropTypes.func,
};

export default CalendarDay;
