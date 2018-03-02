import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class CalendarDay extends React.Component {
    render () {
        const { day, isToday, events, onClick } = this.props;
        const dayClasses = classnames({
            'flexColumn': true,
            'day': true,
            'inactive': day.siblingMonth,
            'today': isToday,
        });

        return (
            <div 
                onClick={onClick.bind(null, this, day)}
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
}

CalendarDay.propTypes = {
    day: PropTypes.object.isRequired,
    isToday: PropTypes.bool,
    events: PropTypes.array,
    onClick: PropTypes.func,
};

CalendarDay.defaultProps = {
    onClick: () => {},
}
