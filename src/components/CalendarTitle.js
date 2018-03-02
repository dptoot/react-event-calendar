import React from 'react';
import PropTypes from 'prop-types';

const CalendarTitle = ({title}) => {
    return (
    <div className="flexColumn">
        {title}
    </div>
    )
}

CalendarTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CalendarTitle;
