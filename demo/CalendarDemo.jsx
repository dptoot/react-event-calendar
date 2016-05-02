import React from 'react';
import ReactDOM from 'react-dom';
import EventCalendar from '../src/index.jsx';
import moment from 'moment';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Popover from 'react-bootstrap/lib/PopOver';
import Overlay from 'react-bootstrap/lib/Overlay';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ];

const events = [
    {
        start: '2015-01-15',
        end: '2015-01-20',
        title: 'Jan Event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-06-20',
        end: '2015-07-02',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-04',
        end: '2015-07-05',
        title: 'Short Event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-07',
        end: '2015-07-13',
        title: '2 week event with a nice long title ',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-06-15',
        end: '2015-08-15',
        title: 'This is a multi-month event ',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-7',
        end: '2015-07-10',
        title: '3rd Event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-10',
        end: '2015-07-12',
        title: '4th Event',
        description: 'This is a test description of an event',
    },
];

class CalendarDemo extends React.Component {

    constructor() {
        super();

        this.getState = this.getState.bind(this);
        this.getHumanDate = this.getHumanDate.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
        this.handleToday = this.handleToday.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handleEventMouseOver = this.handleEventMouseOver.bind(this);
        this.handleEventMouseOut = this.handleEventMouseOut.bind(this);

        this.state = {
            moment: moment('2015-07-01'),
            showPopover: false,
            popoverTitle: null,
            popoverContent: null,
            popoverTarget: null,
        };
    }

    handleNextMonth() {
        this.setState({
            moment: this.state.moment.add(1, 'M'),
        });
    }

    handlePreviousMonth() {
        this.setState({
            moment: this.state.moment.subtract(1, 'M'),
        });
    }

    handleToday() {
        this.setState({
            moment: moment(),
        });
    }

    handleEventMouseOver(target, eventData, day) {
        this.setState({
            showPopover: true,
            popoverTarget: () => ReactDOM.findDOMNode(target),
            popoverTitle: eventData.title,
            popoverContent: eventData.description,
        });
    }

     handleEventMouseOut(target, eventData, day) {
        this.setState({
            showPopover: false,
        });
     }

    handleEventClick(target, eventData, day) {
        
    }

    getState(now) {
        return {
            moment: now,
        };
    }

    getHumanDate() {
        return [moment.months('MM', this.state.moment.month()), this.state.moment.year(), ].join(' ');
    }

	render() {

        const styles = {
            position: 'relative',
        };

		return (
            <div style={styles}>
            <Overlay
                show={this.state.showPopover}
                rootClose
                onHide = {()=>this.setState({showPopover: false, })}
                placement="top"
                container={this}
                target={this.state.popoverTarget}>
              <Popover id="event" title={this.state.popoverTitle}>{this.state.popoverContent}</Popover>
            </Overlay>
            
            <Grid>
                <Row>
                    <Col xs={6}>
                        <ButtonToolbar>
                            <Button onClick={this.handlePreviousMonth}>&lt;</Button>
                            <Button onClick={this.handleNextMonth}>&gt;</Button>
                            <Button onClick={this.handleToday}>Today</Button>
                        </ButtonToolbar>
                    </Col>
                     <Col xs={6}>
                        <div className="pull-right h2">{this.getHumanDate()}</div>
                     </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={12}>
                        <EventCalendar
                            month={this.state.moment.month()}
                            year={this.state.moment.year()}
                            events={events}
                            onEventClick={this.handleEventClick}
                            onEventMouseOver={this.handleEventMouseOver}
                            onEventMouseOut={this.handleEventMouseOut}
                            />
                    </Col>
                </Row>
            </Grid>
            
            </div>
		);
	}
}

export default CalendarDemo;

