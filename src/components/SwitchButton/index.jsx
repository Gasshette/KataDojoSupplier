import React, { Fragment } from 'react';
import './switchButton.scss';

const SwitchButton = (props) => (
    <Fragment>
        <label className="switch">
            <input type="checkbox" onClick={props.onClick} />
            <span className="slider round" />
        </label>
    </Fragment>
);

export default SwitchButton;