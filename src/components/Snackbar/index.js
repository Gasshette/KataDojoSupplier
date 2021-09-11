import React from 'react';
import { Alert } from 'reactstrap';
import { ExoContext } from '../../context';
import { hideSnackbar } from '../../actions/exoActions';

import './snackBar.scss';

class SnackBar extends React.Component {
    constructor() {
        super();

        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidUpdate() {
        if (this.context.snackbarProps.isOpen) {
            setTimeout(() => this.onDismiss(), 5000);
        }
    }

    onDismiss() {
        hideSnackbar({ isOpen: false }).then(action => this.context.dispatch(action));
    }

    render() {
        const context = this.context.snackbarProps;
        return (
            <div className="snackbar-component" ref={this.snackbarRef}>
                <Alert color={context.color} toggle={this.onDismiss} isOpen={context.isOpen}>{context.message}</Alert>
            </div>
        );
    }
}
SnackBar.contextType = ExoContext;

export default SnackBar;