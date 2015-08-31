var React = require('react');
var EventCalendar = require('react-event-calendar');

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

var App = React.createClass({
	render () {
		return (
			<div>
				<EventCalendar
                    month={7}
                    year={2015}
                    events={events}
                    onEventClick={()=>console.log('click')}
                    onEventMouseOver={()=>console.log('hover')}
                    />
			</div>
		);
	}
});

React.render(<App />, document.getElementById('app'));
