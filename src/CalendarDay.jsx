import React from 'react';
import classnames from 'classnames';

const CalendarDay = ({day, isToday, events}) => {
    const dayClasses = classnames({
        'flexColumn': true,
        'day': true,
        'inactive': day.siblingMonth,
        'today': isToday,
    });

    return (
        <div className={dayClasses}>
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
};

export default CalendarDay;