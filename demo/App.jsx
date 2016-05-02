import React from 'react';
import Fork from 'react-ghfork';
import pkgInfo from '../package.json';
import CalendarDemo from './CalendarDemo.jsx';
// import ReactEventCalendar from  '../src/index';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Fork className="right" project={pkgInfo.user + '/' + pkgInfo.name} />
        <CalendarDemo />
      </div>
    );
  }
}
