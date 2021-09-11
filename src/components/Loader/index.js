import React from 'react';
import { ExoContext } from '../../context';

import './loader.scss';

class Loader extends React.Component {

    render() {
        let visibility = this.context.isLoading ? 'visible' : '';
        return (
            <div className={'loader-component isVisible ' + this.props.size + ' ' + visibility}>
                <div className="loader">
                </div>
            </div>
        );
    }
}

Loader.contextType = ExoContext;

export default Loader;