var React = require('react');
var EventCalendar = require('react-event-calendar');

import moment from 'moment';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December', ];

const events = [
    {
        start: '2015-01-15',
        end: '2015-01-20',
        title: 'Invalid Event',
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
        title: '2 weeks',
    },
    {
        start: '2015-06-15',
        end: '2015-08-15',
        title: 'multi-month ',
    },
    {
        start: '2015-07-10',
        end: '2015-07-12',
        title: '3 events',
    },
];

class App extends React.Component {

    constructor() {
        super();

        this.getState = this.getState.bind(this);
        this.getHumanDate = this.getHumanDate.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
        this.handleToday = this.handleToday.bind(this);

        this.state = this.getState(moment());
    }

    handleNextMonth() {
        this.setState(this.getState(this.state.moment.add(1, 'M')));
    }

    handlePreviousMonth() {
        this.setState(this.getState(this.state.moment.subtract(1, 'M')));
    }

    handleToday() {
        this.setState(this.getState(moment()));
    }

    getState(now) {
        return {
            moment: now,
            month: now.month(),
            year: now.year(),
        };
    }

    getHumanDate() {
        return [moment.months('MM', this.state.moment.month()), this.state.moment.year(), ].join(' ');
    }

	render() {
		return (
            <div>
                <Row>
                    <Col xs={6}>
                        <ButtonToolbar>
                            <Button onClick={this.handlePreviousMonth}>&lt;</Button>
                            <Button onClick={this.handleNextMonth}>&gt;</Button>
                            <Button onClick={this.handleToday}>Today</Button>
                        </ButtonToolbar>
                    </Col>
                     <Col xs={6}>
                        <div className='pull-right h2'>{this.getHumanDate()}</div>
                     </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={12}>
                        <EventCalendar
                            month={this.state.moment.month()}
                            year={this.state.moment.year()}
                            events={events}
                            onEventClick={()=>console.log('click')}
                            onEventMouseOver={()=>console.log('hover')}
                            />
                    </Col>
                </Row>
            </div>
		);
	}
}

export default App;

React.render(<App />, document.getElementById('app'));
