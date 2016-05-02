import React from 'react';
import classnames from 'classnames';


class CalendarEvent extends React.Component {

  render() {
    // Return a placeholder element if there is no event data 
    if(!this.props.eventData) {
        return <div className="event-slot"></div>;
    }

    const showLabel = this.props.eventData.isFirstDay || this.props.day.weekDay === 0;

    const eventClasses = classnames({
        'event-slot': true,
        'event': true,
        'event-first-day': this.props.eventData.isFirstDay,
        'event-last-day': this.props.eventData.isLastDay,
        'event-has-label': showLabel,
    });

    // Generate a dynamic identifier
    const title = showLabel ? this.props.eventData.title : '';

    return (
            <div className={eventClasses}
                 onClick={this.props.onClick.bind(null, this, this.props.eventData, this.props.day)}
                 onMouseOut={this.props.onMouseOut.bind(null, this, this.props.eventData, this.props.day)}
                 onMouseOver={this.props.onMouseOver.bind(null, this, this.props.eventData, this.props.day)}
            >
                <div className="event-title">
                    {title}    
                </div>
        </div>
    );
  }
}

CalendarEvent.propTypes = {
  day: React.PropTypes.object.isRequired,
  eventData: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  onClick: React.PropTypes.func,
  onMouseOut: React.PropTypes.func,
  onMouseOver: React.PropTypes.func,
};


export default CalendarEvent;