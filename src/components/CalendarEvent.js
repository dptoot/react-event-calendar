import React from 'react';
import classnames from 'classnames';


class CalendarEvent extends React.Component {

    constructor(props) {
        super(props);

        this.sharedArguments = [null, this, this.props.eventData, this.props.day];
        // Bind methods
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick(...this.sharedArguments.slice(1));
        e.stopPropagation();
    }

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


        return (
            <div className={eventClasses}
                onClick={this.handleClick}
                onMouseOut={this.props.onMouseOut.bind(...this.sharedArguments)}
                onMouseOver={this.props.onMouseOver.bind(...this.sharedArguments)}
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
    wrapTitle: React.PropTypes.bool,
};

CalendarEvent.defaultProps = {
    onClick: () => {},
    onMouseOut: () => {},
    onMouseOver: () => {},
}

export default CalendarEvent;
