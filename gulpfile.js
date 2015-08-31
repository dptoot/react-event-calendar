var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');

/**
 * Tasks are added by the react-component-gulp-tasks package
 * 
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 * 
 * You can also add your own additional gulp tasks if you like.
 */

var taskConfig = {

	component: {
		name: 'ReactEventCalendar',
		dependencies: [
			'classnames',
			'react',
			'react/addons',
			'calendar-base',
		],
		lib: 'lib',
		less: {
            path: 'less',
            entry: 'react-event-calendar.less',
        },
	},

	example: {
		src: 'example/src',
		dist: 'example/dist',
		files: [
			'index.html',
			'.gitignore',
		],
		scripts: [
			'example.js',
		],
		less: [
			'example.less',
		],
	},

};

initGulpTasks(gulp, taskConfig);
