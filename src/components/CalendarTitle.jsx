import React from 'react';

const CalendarTitle = ({title}) => {
    return (
    <div className="flexColumn">
        {title}
    </div>
    )
}

CalendarTitle.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default CalendarTitle;
