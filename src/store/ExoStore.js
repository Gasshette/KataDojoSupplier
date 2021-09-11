import React from 'react';
import { contextWrapper, ExoContext } from '../context';
import exoReducer from '../reducers/exoReducer.js';
import { getExercices, startLoading, stopLoading } from '../actions/exoActions';

class ExoStore extends React.Component {
    constructor() {
        super();

        this.state = {
            dispatch: action => {
                this.setState(state => exoReducer(state, action));
            },
            isExercicesFilled: false,
            exercices: [],
            snackbarProps: {
                isOpen: false,
            },
            isLoading: false,
        };
    }

    componentDidMount() {
        if (!this.state.isExercicesFilled) {
            startLoading().then(startLoadingAction => {
                this.state.dispatch(startLoadingAction);
                getExercices().then(exoAction => {
                    this.state.dispatch(exoAction);
                    stopLoading().then(stopLoadingAction => this.state.dispatch(stopLoadingAction));
                });
            });

            this.setState({...this.state, isExercicesFilled: true});
        }
    }

    render() {
        return (
            <ExoContext.Provider value={this.state}>
                {this.props.children}
            </ExoContext.Provider>
        )
    }
};

export default contextWrapper(ExoStore);

