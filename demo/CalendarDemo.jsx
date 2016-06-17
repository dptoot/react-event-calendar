import React from 'react';
import ReactDOM from 'react-dom';
import EventCalendar from '../src/index.js';
import moment from 'moment';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Popover from 'react-bootstrap/lib/PopOver';
import Overlay from 'react-bootstrap/lib/Overlay';
import Modal from 'react-bootstrap/lib/Modal';
import TestData from './TestData.js';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ];

class CalendarDemo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            moment: moment(),
            showPopover: false,
            showModal: false,
            overlayTitle: null,
            overlayContent: null,
            popoverTarget: null,
        };

        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
        this.handleToday = this.handleToday.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handleEventMouseOver = this.handleEventMouseOver.bind(this);
        this.handleEventMouseOut = this.handleEventMouseOut.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
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
                overlayTitle: eventData.title,
                overlayContent: eventData.description,
        });
    }

    handleEventMouseOut(target, eventData, day) {
        this.setState({
            showPopover: false,
        });
    }

    handleEventClick(target, eventData, day) {
        this.setState({
            showPopover: false,
            showModal: true,
            overlayTitle: eventData.title,
            overlayContent: eventData.description,
        });
    }

    handleDayClick(target, day) {
        this.setState({
            showPopover: false,
            showModal: true,
            overlayTitle: this.getMomentFromDay(day).format('Do of MMMM YYYY'),
            overlayContent: 'User clicked day (but not event node).',
        });
    }

    getMomentFromDay(day) {
        return moment().set({
            'year': day.year,
            'month': (day.month + 0) % 12,
            'date': day.day
        });
    }

    handleModalClose() {
        this.setState({
            showModal: false,
        })
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
                    <Popover id="event">{this.state.overlayTitle}</Popover>
                </Overlay>

                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.overlayTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.overlayContent}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleModalClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

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
                                events={TestData.getEvents()}
                                onEventClick={this.handleEventClick}
                                onEventMouseOver={this.handleEventMouseOver}
                                onEventMouseOut={this.handleEventMouseOut}
                                onDayClick={this.handleDayClick}
                                maxEventSlots={10}
                            />
                        </Col>
                    </Row>
                </Grid> 

            </div>
        );
    }
}

export default CalendarDemo;

