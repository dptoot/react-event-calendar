jest.unmock('../src/components/CalendarTitle');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CalendarTitle from '../src/components/CalendarTitle';

describe('CalendarTitle', () => {

    let component;
    let node; 

    beforeEach(() => {
        component = TestUtils.renderIntoDocument(<div><CalendarTitle title="Sunday"/></div>);
        node = ReactDOM.findDOMNode(component);
    });

    it('displays a title supplied', () => {

        // Verify that its textContent is "Sunday"
        expect(node.querySelector('div').textContent).toBe('Sunday');

    })

})