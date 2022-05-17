import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default function Date({value}) {
    const{startDate,setStartDate} = value;

    return (
        <React.Fragment>
            <div className="mt-3">
            <DatePicker 
                placeholderText="Click to select a date"
                dateFormat="dd.MM.yyyy"
                selected={startDate}
                onChange={date => setStartDate(date)}
                isClearable
                withPortal
                />
            </div>

        </React.Fragment>

    )
}
