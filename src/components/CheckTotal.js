import React from 'react'

export default function CheckTotals({value}) {
    const{dayTotal} = value;
    return (
        <React.Fragment>
            <div className="text-title title">
                            <span>Total : </span>
                            <strong>{dayTotal} tg</strong>
            </div>
        </React.Fragment>

    )
}
