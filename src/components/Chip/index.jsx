import React from 'react';
import './chip.scss';

const Chip = props => {
    if(props.level === 'undefined'){
        props.level = 'default';
    }
    return (
        <span className={'chip ' + props.className + ' level-' + props.color}>
            {props.text}
        </span>
    )
}

export default Chip;