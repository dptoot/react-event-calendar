[![npm version](https://badge.fury.io/js/react-event-calendar.svg)](https://badge.fury.io/js/react-event-calendar)

# react-event-calendar
A Calendar component that will display supplied events in a given month. 

## Demo & Examples

Live demo: [dptoot.github.io/react-event-calendar](http://dptoot.github.io/react-event-calendar/)

To build the examples locally, run:

```js
npm install
npm start
```

Then open [`localhost:8080`](http://localhost:8080) in a browser.


## Installation

The easiest way to use react-event-calendar is to install it from NPM



```js
npm install react-event-calendar --save
```
You can also use the standalone build by including `dist/react-event-calendar.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.


## Usage

Use this component to display a month view of a calendar with supplied event duration indicators.

```js
const EventCalendar = require('react-event-calendar');

const events = [
    {
        start: '2015-07-20',
        end: '2015-07-02',
        eventClasses: 'optionalEvent'
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];

<EventCalendar 
    month={7}
    year={2015}
    events={events} 
    onEventClick={(target, eventData, day) => console.log(eventData) 
    />
```

### Properties

| property |type | default | description |
| -------- | ---- | ----------- | ----- |
| events | array |   |Array of event objects to be represented on the calendar (see below for options)|
| month | int |   | (Required) Selected Month to display |
| year | int |   | (Required) Selected Year to display |
| wrapTitle | boolean | true | Redisplay an event's title if it's duration wraps to the next week
| maxEventSlots | int | 10 | Maximum number of events to display per calendar day 
| onDayClick | func(target, day) |   | Callback for user click on any day (but not an event node) |
| onEventClick | func(target, eventData, day) |   | Callback for user click on any event node |
| onEventMouseOver | func(target, eventData, day) |   | Callback for user mouse over on any event node |
| onEventMouseOut | func(target, eventData, day) |   | Callback for user mouse out on any event node |

### Events object 
The event object can contain any data you wish that may come in use to you later via the supplied Event Callbacks.  There are hoever some required fields that must be populated.  There are also optional data points that can be added to enhance each event.

| Key | Type | Required | Description |
| -------- | ---- | ----------- | --------|
| start | string | true | Date of event start (Format: YYYY-MM-DD)|
| end | string | true | Date of event end (Format: YYYY-MM-DD) |
| eventClasses | string | false | CSS classes you wish applied to the event (space delimited) |


### Note
At this time any event indexed past the threshold supplied by maxEventSlots will never display.  Given the purpose of the component is to show the start and end of event streams I am still trying to decide the best way to address "hidden" events.  All ideas are welcome! :D

## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) 2015 James Lewis.
