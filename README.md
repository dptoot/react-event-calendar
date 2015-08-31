# react-event-calendar

__COMPONENT DESCRIPTION GOES HERE__


## Demo & Examples

Live demo: [dptoot.github.io/react-event-calendar](http://dptoot.github.io/react-event-calendar/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-event-calendar is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-event-calendar.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-event-calendar --save
```


## Usage

Use this component to display a month view of a calendar with supplied event duration indicators.

```
const ReactEventCalendar = require('react-event-calendar');

const events = [
    {
        start: '2015-07-20',
        end: '2015-07-02',
        title: 'test event',
        description: 'This is a test description of an event',
    },
];

<ReactEventCalendar 
    events={events}
    month={7}
    year={2015}
    events={events} />
```

### Properties

* ```events```:```Array``` Array of event objects to be represented on the calendar
* ```month```: ```Integer``` Selected Month to display
* ```year```: ```Integer``` Selected Year to display

### Notes

Requires Array.prototype.find and Arra.prototype.some.  Please include ES6 Array polyfill for unsupported browsers.


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

__PUT LICENSE HERE__

Copyright (c) 2015 James Lewis.
