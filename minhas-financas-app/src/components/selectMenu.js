import React from 'react';

export default (props) => {

    const options = props.lista.map( op => {
        return (
            <option key={op.index} value={op.value}>{op.label}</option>
        )
    })

    return (
        <select {...props}>
            {options}
        </select>
    )
}