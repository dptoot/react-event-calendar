import React from 'react';
import classnames from 'classnames';

class CalendarDay extends React.Component {
  render () {
    const dayClasses = classnames({
        'flexColumn': true,
        'day': true,
        'inactive': this.props.day.siblingMonth,
        'today': this.props.isToday,
    });

    return (
      <div 
        onClick={this.props.onClick.bind(null, this, this.props.day)}
        className={dayClasses}>
            <div className="inner-grid">
                <div className="date">
                    {this.props.day.day}
                </div>
                {this.props.events}
            </div>
        </div>
    );
  }
}

CalendarDay.propTypes = {
  day: React.PropTypes.object.isRequired,
  isToday: React.PropTypes.bool,
  events: React.PropTypes.array,
  onClick: React.PropTypes.func,
};

CalendarDay.defaultProps = {
  onClick: () => {},
}

export default CalendarDay;
