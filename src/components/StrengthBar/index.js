import React from 'react';
import './strengthBar.scss';

class StrengthBar extends React.Component {
    constructor(props) {
        super(props);

        this.level = this.props.level;
    }

    render() {
        return (
            <div className={"strength-bar-component level-" + this.level}>
                <div className="strength-overlay"></div>
            </div>
        );
    }
}

export default StrengthBar;