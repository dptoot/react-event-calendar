import React from 'react';
import classnames from 'classnames';


class CalendarEvent extends React.Component {

  render() {
    // Return a placeholder element if there is no event data 
    if(!this.props.eventData) {
        return <div className="event-slot"></div>;
    }

    const showLabel = this.props.eventData.isFirstDay || (this.props.day.weekDay === 0 && this.props.wrapTitle);
    const title = showLabel ? this.props.eventData.title : '';

    const eventClasses = classnames({
        'event-slot': true,
        'event': true,
        'event-first-day': this.props.eventData.isFirstDay,
        'event-last-day': this.props.eventData.isLastDay,
        'event-has-label': showLabel,
    }, this.props.eventData.eventClasses);

    const sharedArguments = [null, this, this.props.eventData, this.props.day];

    return (
            <div className={eventClasses}
                 onClick={this.props.onClick.bind(...sharedArguments)}
                 onMouseOut={this.props.onMouseOut.bind(...sharedArguments)}
                 onMouseOver={this.props.onMouseOver.bind(...sharedArguments)}
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

CalendarEvent.defaultProps = {
  onClick: () => {},
  onMouseOut: () => {},
  onMouseOver: () => {},
}

export default CalendarEvent;
